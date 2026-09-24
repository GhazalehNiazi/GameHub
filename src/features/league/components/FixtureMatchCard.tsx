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
          ? "bg-surface-subtle border-edge-subtle shadow-none"
          : "bg-surface border-edge shadow-sm"
      }`}
    >
      {/* Competitors List Stack */}
      <div className='space-y-3 flex-1 pr-4'>
        {/* Home Competitor Row */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-full bg-surface flex items-center justify-center text-sm border border-edge-subtle shadow-sm'>
            {match.homeAvatar}
          </div>
          <div className='text-xs'>
            <p
              className={`font-bold text-content-secondary ${homeWins ? "text-content font-black" : ""}`}
            >
              {match.homePlayer}
            </p>
            <p className='text-[10px] text-content-subtle font-medium'>Home</p>
          </div>
        </div>

        {/* Away Competitor Row */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-full bg-surface flex items-center justify-center text-sm border border-edge-subtle shadow-sm'>
            {match.awayAvatar}
          </div>
          <div className='text-xs'>
            <p
              className={`font-bold text-content-secondary ${awayWins ? "text-content font-black" : ""}`}
            >
              {match.awayPlayer}
            </p>
            <p className='text-[10px] text-content-subtle font-medium'>Away</p>
          </div>
        </div>
      </div>

      {/* Score Dashboard Display / Action Trigger Button */}
      <div>
        {isPlayed ? (
          <div className='space-y-3 pr-2 text-right'>
            {/* Home Score */}
            <div
              className={`h-7 flex items-center justify-end text-content transition-all ${
                homeWins
                  ? "text-xl font-black scale-105 text-content" // Winner font enhancement
                  : awayWins
                    ? "text-sm font-medium text-content-subtle" // Loser styling reduction
                    : "text-base font-bold" // Draw state uniform size
              }`}
            >
              {match.homeScore}
            </div>

            {/* Away Score */}
            <div
              className={`h-7 flex items-center justify-end text-content transition-all ${
                awayWins
                  ? "text-xl font-black scale-105 text-content" // Winner font enhancement
                  : homeWins
                    ? "text-sm font-medium text-content-subtle" // Loser styling reduction
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
            className='px-4 py-5 bg-surface border border-edge hover:border-edge-strong text-[11px] font-bold text-content-secondary hover:text-content rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer text-center whitespace-pre-line leading-tight'
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
