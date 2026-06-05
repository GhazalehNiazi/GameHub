interface LeagueOverviewHeaderProps {
  overview: {
    winnerName: string;
    winnerAvatar: string;
    leagueName: string;
    podium: { username: string; avatar: string; placement: number }[];
    tieBreakerText: string;
    highlights: {
      topScorer: string;
      topScorerStats: string;
      bestDefence: string;
      bestDefenceStats: string;
      mostGoalsMatch: string;
    };
    insights: string[];
  };
}

export function LeagueOverviewHeader({ overview }: LeagueOverviewHeaderProps) {
  const medalIcons = ["🥇", "🥈", "🥉"];

  return (
    <div className='space-y-6 animate-fade-in text-left border-b border-zinc-100 pb-6 mb-4'>
      {/* 1. LEAGUE OVERVIEW SECTION */}
      <div className='space-y-3.5'>
        <h3 className='text-xs font-bold text-zinc-900 flex items-center gap-1.5'>
          ✓ League Overview
        </h3>

        {/* Dynamic Podium List */}
        <div className='space-y-2.5 pl-0.5'>
          {overview.podium.map((player, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between text-xs'
            >
              <div className='flex items-center gap-2.5'>
                <span className='text-sm'>
                  {medalIcons[player.placement - 1] || "🏅"}
                </span>
                <span className='text-base'>{player.avatar}</span>
                <div>
                  <p className='font-bold text-zinc-800'>{player.username}</p>
                  {player.placement === 1 && (
                    <p className='text-[10px] text-zinc-400 font-medium'>
                      Winner of "{overview.leagueName}" league
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tie-Breaker Text Blocks */}
        <p className='text-xs text-zinc-600 leading-relaxed font-medium pl-0.5'>
          {overview.tieBreakerText}
        </p>
      </div>

      {/* 2. LEAGUE HIGHLIGHTS SECTION */}
      <div className='space-y-3 pl-0.5'>
        <h3 className='text-xs font-bold text-zinc-900 flex items-center gap-1.5'>
          ✓ League highlights
        </h3>

        <div className='space-y-2.5 text-xs'>
          <div>
            <h4 className='font-bold text-zinc-700 text-[11px]'>Top Scorer</h4>
            <p className='text-zinc-400 text-[11px] font-medium mt-0.5'>
              {overview.highlights.topScorer} —{" "}
              <span className='text-zinc-500'>
                {overview.highlights.topScorerStats}
              </span>
            </p>
          </div>
          <div>
            <h4 className='font-bold text-zinc-700 text-[11px]'>
              Best Defence
            </h4>
            <p className='text-zinc-400 text-[11px] font-medium mt-0.5'>
              {overview.highlights.bestDefence} —{" "}
              <span className='text-zinc-500'>
                {overview.highlights.bestDefenceStats}
              </span>
            </p>
          </div>
          <div>
            <h4 className='font-bold text-zinc-700 text-[11px]'>
              Most Goals in a match
            </h4>
            <p className='text-zinc-400 text-[11px] font-medium mt-0.5'>
              {overview.highlights.mostGoalsMatch}
            </p>
          </div>
        </div>
      </div>

      {/* 3. LEAGUE INSIGHTS SECTION */}
      <div className='space-y-3 pl-0.5'>
        <h3 className='text-xs font-bold text-zinc-900 flex items-center gap-1.5'>
          ✓ League Insights
        </h3>

        <div className='space-y-3'>
          {overview.insights.map((insight, idx) => (
            <div
              key={idx}
              className='flex items-start gap-2.5 text-[11px] text-zinc-500 font-medium leading-relaxed'
            >
              <span className='text-zinc-400 text-xs mt-0.5 flex-shrink-0'>
                ✨
              </span>
              <p dangerouslySetInnerHTML={{ __html: insight }} />
            </div>
          ))}
        </div>
      </div>

      {/* 4. SEPARATOR TEXT LABEL FOR MATCHES */}
      <div className='pt-2 border-t border-zinc-50'>
        <h3 className='text-xs font-bold text-zinc-900 flex items-center gap-1.5'>
          ✓ Played Games
        </h3>
      </div>
    </div>
  );
}
