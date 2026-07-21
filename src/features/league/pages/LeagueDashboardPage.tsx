import { useState } from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { TabSegmentControl } from "../components/TabSegmentControl";
import { FixturesTab } from "../components/FixturesTab";
import { AnalysisTab } from "../components/AnalysisTab";
import { SettingsTab } from "../components/SettingsTab"; // Added
import { ScoreEntryModal } from "../components/ScoreEntryModal";
import type { LeagueTab, MatchData } from "../types";

const INITIAL_MOCK_ATTENDEES = [
  { id: "1", resolvedName: "Mamrez420", avatar: "🐵" },
  { id: "2", resolvedName: "Matrixforlife", avatar: "🐐" },
  { id: "3", resolvedName: "Ilialeftie", avatar: "🦥" },
];

export default function LeagueDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LeagueTab>("fixtures");
  const [fixtures, setFixtures] = useState<MatchData[]>([]);
  const [activeModalMatch, setActiveModalMatch] = useState<MatchData | null>(
    null,
  );

  const handleTerminateAction = () => {
    if (
      window.confirm(
        "Are you absolutely sure you want to terminate this league?",
      )
    ) {
      navigate("/play"); // Clear contextual boundaries and exit
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
            Name of the league
          </h1>
          <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-base border'>
            🐵
          </div>
        </div>

        <TabSegmentControl activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Selection Portal Matrix */}
        <div className='mt-5'>
          {activeTab === "fixtures" && (
            <FixturesTab
              matches={fixtures}
              onSelectMatch={setActiveModalMatch}
            />
          )}
          {activeTab === "analysis" && (
            <AnalysisTab data={{ hasData: false }} />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              attendees={INITIAL_MOCK_ATTENDEES}
              onTerminateLeague={handleTerminateAction}
            />
          )}
          {activeTab === "table" && (
            <div className='text-xs text-zinc-400 text-center py-8'>
              Table coming soon...
            </div>
          )}
        </div>
      </AppScreenLayout>

      <ScoreEntryModal
        match={activeModalMatch}
        onClose={() => setActiveModalMatch(null)}
        onSave={(id, h, a) => {
          setFixtures((p) =>
            p.map((m) =>
              m.id === id ? { ...m, homeScore: h, awayScore: a } : m,
            ),
          );
          setActiveModalMatch(null);
        }}
      />
    </main>
  );
}
