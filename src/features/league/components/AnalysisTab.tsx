import type { AnalysisTabProps } from "../types";

export function AnalysisTab({ data }: AnalysisTabProps) {
  /* --- STATE 1: EMPTY STATE CALLOUT (Screenshot 279) --- */
  if (!data || !data.hasData) {
    return (
      <div className='flex items-start gap-4 p-5 bg-surface-subtle border border-edge-subtle rounded-3xl text-left animate-fade-in mt-2'>
        <span className='text-content-secondary text-xl mt-0.5 bg-surface-muted w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0'>
          ℹ️
        </span>
        <p className='text-xs text-content-secondary leading-relaxed font-medium'>
          As you play games in the league, we provide you with analysis of the
          league. Key updates highlight the important changes and Title race
          analysis will predict the winner based on the player's form and
          previous encounters with other players in previous leagues.
        </p>
      </div>
    );
  }

  /* --- STATE 2: API DATA LIVE DASHBOARD (Screenshot 280) --- */
  return (
    <div className='space-y-6 animate-fade-in text-left pb-4'>
      {/* 1. KEY UPDATES SEGMENT */}
      <div className='space-y-3.5'>
        <h3 className='text-xs font-bold text-content tracking-tight flex items-center gap-1.5'>
          ✓ Key Updates
        </h3>

        {/* Latest Featured Match Scorecard */}
        {data.lastFeaturedMatch && (
          <div className='p-4 bg-surface-subtle border border-edge-subtle rounded-2xl flex items-center justify-between text-xs font-bold text-content'>
            <div className='space-y-3'>
              <div className='flex items-center gap-2.5'>
                <span>{data.lastFeaturedMatch.homeAvatar}</span>
                <span>
                  {data.lastFeaturedMatch.homePlayer}{" "}
                  <span className='text-[10px] text-content-subtle font-normal'>
                    (Home)
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-2.5'>
                <span>{data.lastFeaturedMatch.awayAvatar}</span>
                <span>
                  {data.lastFeaturedMatch.awayPlayer}{" "}
                  <span className='text-[10px] text-content-subtle font-normal'>
                    (Away)
                  </span>
                </span>
              </div>
            </div>
            <div className='space-y-3 font-black text-right pr-1'>
              <div>{data.lastFeaturedMatch.homeScore}</div>
              <div>{data.lastFeaturedMatch.awayScore}</div>
            </div>
          </div>
        )}

        {/* Dynamic Bullet Points List */}
        <div className='space-y-3 pl-1'>
          {data.keyUpdates?.map((update, idx) => (
            <div
              key={idx}
              className='flex items-start gap-2.5 text-[11px] text-content-muted font-medium leading-relaxed'
            >
              <span className='text-content-subtle text-xs mt-0.5 flex-shrink-0'>
                ⛓
              </span>
              <p>{update}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TITLE RACE ANALYSIS SEGMENT */}
      <div className='space-y-3.5'>
        <h3 className='text-xs font-bold text-content tracking-tight flex items-center gap-1.5'>
          ✓ Title Race Analysis
        </h3>

        {/* Standings Predictive Probability List Loop */}
        <div className='space-y-4'>
          {data.titleRace?.map((player, idx) => (
            <div
              key={idx}
              className='p-4 bg-surface border border-edge-subtle shadow-sm rounded-2xl space-y-3.5 animate-fade-in'
            >
              {/* Header Info Row */}
              <div className='flex items-center justify-between border-b border-edge-subtle pb-2'>
                <div className='flex items-center gap-2.5'>
                  <span className='text-base'>{player.avatar}</span>
                  <span className='text-xs font-bold text-content'>
                    {player.username}
                  </span>
                </div>
                <div className='flex items-center gap-1 text-[11px] font-bold text-content-secondary bg-surface-subtle px-2 py-0.5 rounded-lg border border-edge-subtle'>
                  <span>🏆</span> {player.probability}
                </div>
              </div>

              {/* Dynamic Inner Insight Metadata Stack */}
              <div className='space-y-2.5 text-[11px] font-medium leading-relaxed text-content-secondary pl-0.5'>
                <div>
                  <span className='text-content-subtle text-xs mr-1.5 inline-block'>
                    📈
                  </span>
                  <span className='font-bold text-content block mt-0.5'>
                    Path
                  </span>
                  <p className='mt-0.5 text-content-muted'>{player.path}</p>
                </div>

                {player.historicalEdge && (
                  <div className='pt-0.5'>
                    <span className='text-content-subtle text-xs mr-1.5 inline-block'>
                      🔄
                    </span>
                    <span className='font-bold text-content block mt-0.5'>
                      Historical edge
                    </span>
                    <p className='mt-0.5 text-content-muted'>
                      {player.historicalEdge}
                    </p>
                  </div>
                )}

                {player.role && (
                  <div className='pt-0.5'>
                    <span className='text-content-subtle text-xs mr-1.5 inline-block'>
                      ⚆
                    </span>
                    <span className='font-bold text-content block mt-0.5'>
                      Role
                    </span>
                    <p className='mt-0.5 text-content-muted'>{player.role}</p>
                  </div>
                )}

                {player.mathematicallyEliminated && (
                  <div className='pt-0.5 border-t border-dashed border-danger-border mt-2 text-danger bg-danger-subtle p-2.5 rounded-xl'>
                    <span className='font-bold block text-danger-text'>
                      🔀 Mathematically Eliminated
                    </span>
                    <p className='mt-0.5 text-danger font-normal'>
                      {player.mathematicallyEliminated}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
