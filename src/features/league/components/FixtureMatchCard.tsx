import type { FixtureMatchCardProps } from "../types";

export function FixtureMatchCard({
  match,
  onEnterResults,
}: FixtureMatchCardProps) {
  const isPlayed = match.homeScore !== null && match.awayScore !== null;

  // Determine winning states if the game is completed
  const homeWins = isPlayed && match.homeScore! > match.awayScore!;
  const awayWins = isPlayed && match.awayScore! > match.homeScore!;

  return (
    <div
      className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
        isPlayed
          ? "bg-zinc-50/70 border-zinc-100/80 shadow-none" // Matches completed card background in screenshot
          : "bg-white border-zinc-100 shadow-sm"
      }`}
    >
      {/* Competitors List Stack */}
      <div className='space-y-3 flex-1 pr-4'>
        {/* Home Competitor Row */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm border border-zinc-100 shadow-sm'>
            {match.homeAvatar}
          </div>
          <div className='text-xs'>
            <p
              className={`font-bold text-zinc-800 ${homeWins ? "text-zinc-950 font-black" : ""}`}
            >
              {match.homePlayer}
            </p>
            <p className='text-[10px] text-zinc-400 font-medium'>Home</p>
          </div>
        </div>

        {/* Away Competitor Row */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm border border-zinc-100 shadow-sm'>
            {match.awayAvatar}
          </div>
          <div className='text-xs'>
            <p
              className={`font-bold text-zinc-800 ${awayWins ? "text-zinc-950 font-black" : ""}`}
            >
              {match.awayPlayer}
            </p>
            <p className='text-[10px] text-zinc-400 font-medium'>Away</p>
          </div>
        </div>
      </div>

      {/* Score Dashboard Display / Action Trigger Button */}
      <div>
        {isPlayed ? (
          <div className='space-y-3 pr-2 text-right'>
            {/* Home Score */}
            <div
              className={`h-7 flex items-center justify-end text-zinc-900 transition-all ${
                homeWins
                  ? "text-xl font-black scale-105 text-zinc-950" // Winner font enhancement
                  : awayWins
                    ? "text-sm font-medium text-zinc-400" // Loser styling reduction
                    : "text-base font-bold" // Draw state uniform size
              }`}
            >
              {match.homeScore}
            </div>

            {/* Away Score */}
            <div
              className={`h-7 flex items-center justify-end text-zinc-900 transition-all ${
                awayWins
                  ? "text-xl font-black scale-105 text-zinc-950" // Winner font enhancement
                  : homeWins
                    ? "text-sm font-medium text-zinc-400" // Loser styling reduction
                    : "text-base font-bold" // Draw state uniform size
              }`}
            >
              {match.awayScore}
            </div>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => onEnterResults(match)}
            className='px-4 py-5 bg-white border border-zinc-200/80 hover:border-zinc-300 text-[11px] font-bold text-zinc-600 hover:text-zinc-900 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer text-center whitespace-pre-line leading-tight'
          >
            Enter
            <br />
            Results
          </button>
        )}
      </div>
    </div>
  );
}
