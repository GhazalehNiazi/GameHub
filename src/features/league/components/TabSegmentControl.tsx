import React from "react";
import type { LeagueTab, TabSegmentControlProps } from "../types";

export function TabSegmentControl({
  activeTab,
  onTabChange,
}: TabSegmentControlProps) {
  const tabs: { id: LeagueTab; label: string; icon: string }[] = [
    { id: "fixtures", label: "Fixtures", icon: "📋" },
    { id: "table", label: "Table", icon: "📊" },
    { id: "analysis", label: "Analysis", icon: "✨" },
    { id: "settings", label: "Settings", icon: "⚙️" }, // Registered link tab pill
  ];

  return (
    <div className='bg-zinc-50 border border-zinc-100 p-1 rounded-2xl flex gap-1 w-full shadow-inner'>
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            type='button'
            onClick={() => onTabChange(t.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isActive
                ? "bg-zinc-800 text-white shadow-md scale-[1.01]"
                : "text-zinc-500 hover:text-zinc-800 bg-transparent"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
