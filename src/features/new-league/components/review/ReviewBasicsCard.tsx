import React from "react";

interface ReviewBasicsCardProps {
  leagueName: string;
  fifaVersion: string;
  onEdit: () => void;
}

export function ReviewBasicsCard({
  leagueName,
  fifaVersion,
  onEdit,
}: ReviewBasicsCardProps) {
  // Compute current date matching the formatting visible in your design mockup
  const currentDateString = new Date()
    .toLocaleDateString("zh-Hans-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/");

  return (
    <div className='space-y-2 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold text-zinc-900 flex items-center gap-2'>
          ✓ Basics
        </h3>
        <button
          type='button'
          onClick={onEdit}
          className='w-7 h-7 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-100 active:scale-90 transition-transform cursor-pointer text-xs'
        >
          ✏️
        </button>
      </div>

      <div className='bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4 grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs'>
        <div>
          <span className='block text-zinc-400 font-medium mb-1'>
            Name of the league
          </span>
          <span className='font-semibold text-zinc-700 flex items-center gap-1.5 truncate'>
            🖋️ {leagueName || "Calciopoli"}
          </span>
        </div>
        <div>
          <span className='block text-zinc-400 font-medium mb-1'>
            Fifa Version
          </span>
          <span className='font-semibold text-zinc-700 flex items-center gap-1.5 uppercase'>
            🎮 {fifaVersion || "FC 25"}
          </span>
        </div>
        <div>
          <span className='block text-zinc-400 font-medium mb-1'>
            Type of the league
          </span>
          <span className='font-semibold text-zinc-700 flex items-center gap-1.5'>
            👤 Normal
          </span>
        </div>
        <div>
          <span className='block text-zinc-400 font-medium mb-1'>
            Creation Date
          </span>
          <span className='font-semibold text-zinc-700 flex items-center gap-1.5 font-mono'>
            📅 {currentDateString}
          </span>
        </div>
      </div>
    </div>
  );
}
