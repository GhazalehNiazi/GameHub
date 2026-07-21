import React, { useState } from "react";
import { FixtureMatchCard } from "./FixtureMatchCard";
import { LeagueOverviewHeader } from "./LeagueOverviewHeader";
import type { MatchData, FixturesTabProps } from "../types";

export function FixturesTab({
  matches,
  onSelectMatch,
  overviewData,
}: FixturesTabProps) {
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const matchdays = Array.from(new Set(matches.map((m) => m.matchday)));

  return (
    <div className='space-y-5 animate-fade-in'>
      {/* 1. Conditional AI Overview Summary Panel Injection */}
      {overviewData && <LeagueOverviewHeader overview={overviewData} />}

      {/* 2. Toggle Upcoming Switch Filter */}
      <label className='flex items-center gap-3 py-1 cursor-pointer select-none'>
        <input
          type='checkbox'
          checked={showUpcomingOnly}
          onChange={(e) => setShowUpcomingOnly(e.target.checked)}
          className='sr-only peer'
        />
        <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-800 relative" />
        <span className='text-xs font-medium text-zinc-600'>
          Show upcoming games first
        </span>
      </label>

      {/* 3. Matchdays Grid Roster Stack */}
      <div className='space-y-6'>
        {matchdays.map((day) => {
          let dayMatches = matches.filter((m) => m.matchday === day);
          if (showUpcomingOnly)
            dayMatches = dayMatches.filter((m) => m.homeScore === null);
          if (dayMatches.length === 0) return null;

          return (
            <div key={day} className='space-y-3'>
              <h3 className='text-xs font-bold text-zinc-800 tracking-tight'>
                Matchday {day}
              </h3>
              <div className='space-y-3'>
                {dayMatches.map((match) => (
                  <FixtureMatchCard
                    key={match.id}
                    match={match}
                    onEnterResults={onSelectMatch}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
