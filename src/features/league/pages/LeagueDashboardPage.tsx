import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { TabSegmentControl } from "../components/TabSegmentControl";
import { FixturesTab } from "../components/FixturesTab";
import { AnalysisTab } from "../components/AnalysisTab";
import { SettingsTab } from "../components/SettingsTab";
import { ScoreEntryModal } from "../components/ScoreEntryModal";
import { leagueService, type LeagueItem } from "@/services/api";
import type { LeagueTab, MatchData } from "../types";

export default function LeagueDashboardPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<LeagueTab>("fixtures");
  const [leagueData, setLeagueData] = useState<LeagueItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModalMatch, setActiveModalMatch] = useState<MatchData | null>(null);

  const leagueId = id || "calciopoli-2026";

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    leagueService
      .getLeagueById(leagueId)
      .then((res) => {
        if (isMounted) setLeagueData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load league details:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [leagueId]);

  const handleScoreSave = async (matchId: string, homeScore: number, awayScore: number) => {
    try {
      const res = await leagueService.updateMatchScore({
        leagueId,
        matchId,
        homeScore,
        awayScore,
      });

      setLeagueData((prev) => {
        if (!prev) return prev;
        const updatedFixtures = prev.fixtures.map((m) =>
          m.id === matchId ? { ...m, homeScore, awayScore } : m
        );
        return {
          ...prev,
          fixtures: updatedFixtures,
          analysisData: {
            hasData: true,
            lastFeaturedMatch: {
              homePlayer: res.data.homePlayer,
              homeAvatar: res.data.homeAvatar,
              homeScore,
              awayPlayer: res.data.awayPlayer,
              awayAvatar: res.data.awayAvatar,
              awayScore,
            },
          },
        };
      });
    } catch (err) {
      console.error("Failed to save score:", err);
    } finally {
      setActiveModalMatch(null);
    }
  };

  const handleTerminateAction = async () => {
    if (
      window.confirm(
        "Are you absolutely sure you want to terminate this league?"
      )
    ) {
      try {
        await leagueService.terminateLeague(leagueId);
      } catch (err) {
        console.error("Failed to terminate league:", err);
      } finally {
        navigate("/play");
      }
    }
  };

  return (
    <main className='page-content safe-top safe-bottom bg-white relative'>
      <AppScreenLayout showNavigation>
        {/* Header Block */}
        <div className='flex items-center justify-between w-full border-b border-zinc-50 pb-3 mb-4'>
          <button
            onClick={() => navigate("/play")}
            className='p-1 -ml-1 text-zinc-600 hover:text-zinc-900 cursor-pointer'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <h1 className='text-base font-bold text-zinc-900 tracking-tight'>
            {leagueData?.name || "League Dashboard"}
          </h1>
          <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-base border'>
            🐵
          </div>
        </div>

        <TabSegmentControl activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Loading Indicator or Content */}
        {isLoading ? (
          <div className='flex justify-center items-center py-16 text-zinc-400 text-xs animate-pulse'>
            Loading league data...
          </div>
        ) : (
          <div className='mt-5'>
            {activeTab === "fixtures" && (
              <FixturesTab
                matches={leagueData?.fixtures || []}
                onSelectMatch={setActiveModalMatch}
                overviewData={leagueData?.overviewData}
              />
            )}
            {activeTab === "analysis" && (
              <AnalysisTab data={leagueData?.analysisData || { hasData: false }} />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                attendees={leagueData?.attendees || []}
                onTerminateLeague={handleTerminateAction}
              />
            )}
            {activeTab === "table" && (
              <div className='text-xs text-zinc-400 text-center py-8'>
                Table coming soon...
              </div>
            )}
          </div>
        )}
      </AppScreenLayout>

      <ScoreEntryModal
        match={activeModalMatch}
        onClose={() => setActiveModalMatch(null)}
        onSave={handleScoreSave}
      />
    </main>
  );
}
