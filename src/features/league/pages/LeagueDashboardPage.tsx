import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { TabSegmentControl } from "../components/TabSegmentControl";
import { FixturesTab } from "../components/FixturesTab";
import { TableTab } from "../components/TableTab";
import { AnalysisTab } from "../components/AnalysisTab";
import { SettingsTab } from "../components/SettingsTab";
import { ScoreEntryModal } from "../components/ScoreEntryModal";
import { BellIcon } from "@/shared/components/icons/LeagueIcons";
import { Avatar } from "@/shared/components/ui/Avatar";
import {
  useLeagueDetail,
  useUpdateMatchScore,
  useTerminateLeague,
} from "@/services/hooks";
import type { LeagueTab, MatchData } from "../types";

export default function LeagueDashboardPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<LeagueTab>("fixtures");
  const [activeModalMatch, setActiveModalMatch] = useState<MatchData | null>(null);

  const leagueId = id || "calciopoli-2026";

  const { data: leagueData, isLoading } = useLeagueDetail(leagueId);
  const updateScoreMutation = useUpdateMatchScore();
  const terminateLeagueMutation = useTerminateLeague();

  const handleScoreSave = (matchId: string, homeScore: number, awayScore: number) => {
    updateScoreMutation.mutate(
      {
        leagueId,
        matchId,
        homeScore,
        awayScore,
      },
      {
        onSettled: () => {
          setActiveModalMatch(null);
        },
      }
    );
  };

  const handleTerminateAction = () => {
    if (
      window.confirm(
        "Are you absolutely sure you want to terminate this league?"
      )
    ) {
      terminateLeagueMutation.mutate(leagueId, {
        onSuccess: () => {
          navigate("/play");
        },
      });
    }
  };

  return (
    <main className='page-content safe-top safe-bottom bg-surface relative'>
      <AppScreenLayout showNavigation>
        {/* Top Header Row with Back Button, Avatar and Bell (Mockup Header) */}
        <div className='flex items-center justify-between w-full pt-1 pb-1'>
          <button
            type='button'
            onClick={() => navigate("/play")}
            className='p-1 -ml-1 text-content hover:opacity-75 active:scale-90 transition-transform cursor-pointer'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <div className='flex items-center gap-2'>
            <Avatar name='monster' avatar='monster' size='sm' />
            <div className='w-7 h-7 rounded-full border border-edge flex items-center justify-center text-content-secondary hover:text-content hover:border-edge-strong transition-colors cursor-pointer'>
              <BellIcon className='w-3.5 h-3.5' />
            </div>
          </div>
        </div>

        {/* Centered League Title */}
        <h1 className='text-xl font-bold text-center text-content my-3 tracking-tight'>
          {leagueData?.name || "Name of the league"}
        </h1>

        {/* Segment Tabs Control */}
        <TabSegmentControl activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {isLoading ? (
          <div className='flex justify-center items-center py-16 text-content-subtle text-xs animate-pulse'>
            Loading league data...
          </div>
        ) : (
          <div className='mt-4'>
            {activeTab === "fixtures" && (
              <FixturesTab
                matches={leagueData?.fixtures || []}
                onSelectMatch={setActiveModalMatch}
                overviewData={leagueData?.overviewData}
              />
            )}
            {activeTab === "table" && <TableTab />}
            {activeTab === "analysis" && (
              <AnalysisTab data={leagueData?.analysisData || { hasData: false }} />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                attendees={leagueData?.attendees || []}
                onTerminateLeague={handleTerminateAction}
              />
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
