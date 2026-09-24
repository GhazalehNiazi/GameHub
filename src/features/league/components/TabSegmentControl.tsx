import type { LeagueTab, TabSegmentControlProps } from "../types";
import {
  DocumentIcon,
  TableGridIcon,
  SparklesIcon,
} from "@/shared/components/icons/LeagueIcons";

export function TabSegmentControl({
  activeTab,
  onTabChange,
}: TabSegmentControlProps) {
  const tabs: {
    id: LeagueTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "fixtures",
      label: "Fixtures",
      icon: <DocumentIcon className='w-3.5 h-3.5' />,
    },
    {
      id: "table",
      label: "Table",
      icon: <TableGridIcon className='w-3.5 h-3.5' />,
    },
    {
      id: "analysis",
      label: "Analysis",
      icon: <SparklesIcon className='w-3.5 h-3.5' />,
    },
    {
      id: "settings",
      label: "Rules",
      icon: (
        <svg
          className='w-3.5 h-3.5'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='3' />
          <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
        </svg>
      ),
    },
  ];

  return (
    <div className='flex items-center gap-2 w-full overflow-x-auto pb-1 pt-0.5 no-scrollbar'>
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            type='button'
            onClick={() => onTabChange(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              isActive
                ? "bg-[#27272a] dark:bg-surface-inverse text-white dark:text-content-inverse shadow-sm"
                : "bg-surface text-content-secondary border border-edge hover:border-edge-strong hover:text-content"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
