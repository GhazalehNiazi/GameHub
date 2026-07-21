import React, { useState } from "react";
import type { MatchData, ScoreEntryModalProps } from "../types";

export function ScoreEntryModal({
  match,
  onClose,
  onSave,
}: ScoreEntryModalProps) {
  if (!match) return null;

  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);

  return (
    <div className='absolute inset-0 z-50 flex flex-col justify-end bg-black/30 animate-fade-in'>
      {/* Backdrop click dismiss escape hatch */}
      <div className='flex-1' onClick={onClose} />

      {/* Sheet Frame Container */}
      <div className='bg-white rounded-t-[28px] p-6 space-y-6 shadow-2xl border-t border-zinc-100 animate-slide-up flex-shrink-0'>
        {/* Sheet Pull Bar Top Accent */}
        <div className='w-12 h-1.5 bg-zinc-200 rounded-full mx-auto -mt-2 mb-2' />

        <div className='flex items-center gap-2 text-sm font-bold text-zinc-900'>
          <span>🎮</span> Entering Fixtures
        </div>

        {/* Input Interactive Dashboard */}
        <div className='bg-zinc-50 rounded-2xl p-4 grid grid-cols-2 gap-4 border border-zinc-100'>
          {/* Home Node */}
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-sm'>
                {match.homeAvatar}
              </div>
              <span className='text-xs font-bold text-zinc-800'>
                {match.homePlayer}
              </span>
            </div>
            <button
              type='button'
              onClick={() => setHome((h) => h + 1)}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500'
            >
              ▲
            </button>
            <div className='w-full bg-white border border-zinc-200 py-3 rounded-xl text-base font-black text-zinc-800 text-center shadow-inner'>
              {home}
            </div>
            <button
              type='button'
              onClick={() => setHome((h) => Math.max(0, h - 1))}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500'
            >
              ▼
            </button>
          </div>

          {/* Away Node */}
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-sm'>
                {match.awayAvatar}
              </div>
              <span className='text-xs font-bold text-zinc-800'>
                {match.awayPlayer}
              </span>
            </div>
            <button
              type='button'
              onClick={() => setAway((a) => a + 1)}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500'
            >
              ▲
            </button>
            <div className='w-full bg-white border border-zinc-200 py-3 rounded-xl text-base font-black text-zinc-800 text-center shadow-inner'>
              {away}
            </div>
            <button
              type='button'
              onClick={() => setAway((a) => Math.max(0, a - 1))}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500'
            >
              ▼
            </button>
          </div>
        </div>

        {/* Locked Save Handle Trigger CTA */}
        <button
          type='button'
          onClick={() => onSave(match.id, home, away)}
          className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-1.5 cursor-pointer'
        >
          ✓ Confirm Results
        </button>
      </div>
    </div>
  );
}
