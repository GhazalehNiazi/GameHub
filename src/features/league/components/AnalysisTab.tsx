import type { AnalysisTabProps } from "../types";
import { Avatar } from "@/shared/components/ui/Avatar";

export function AnalysisTab({ data }: AnalysisTabProps) {
  /* --- STATE 1: EMPTY STATE CALLOUT (Android Large - 260) --- */
  if (!data || !data.hasData) {
    return (
      <div className='flex items-start gap-3.5 pt-6 px-1 text-left animate-fade-in'>
        <div className='w-6 h-6 rounded-full bg-[#27272a] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 shadow-2xs'>
          i
        </div>
        <p className='text-xs text-content-secondary leading-relaxed font-normal'>
          As you play games in the league, we provide you with analysis of the
          league. Key updates highlight the important changes and Title race
          analysis will predict the winner based on the player's form and
          previous encounters with other players in previous leagues.
        </p>
      </div>
    );
  }

  /* --- STATE 2: POPULATED DASHBOARD (Android Large - 261) --- */
  return (
    <div className='space-y-6 animate-fade-in text-left pb-6'>
      {/* 1. KEY UPDATES SEGMENT */}
      <div className='space-y-3.5'>
        <h3 className='text-sm font-bold text-content tracking-tight'>
          Key Updates
        </h3>

        {/* Featured Match Card */}
        {data.lastFeaturedMatch && (
          <div className='p-4 bg-surface border border-edge rounded-2xl flex items-center justify-between text-xs shadow-2xs'>
            <div className='space-y-3'>
              <div className='flex items-center gap-2.5'>
                <Avatar
                  name={data.lastFeaturedMatch.homePlayer}
                  avatar={data.lastFeaturedMatch.homeAvatar}
                  size='xs'
                />
                <span className='font-medium text-content'>
                  {data.lastFeaturedMatch.homePlayer}{" "}
                  <span className='text-[10px] text-content-subtle font-normal'>
                    (Home)
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-2.5'>
                <Avatar
                  name={data.lastFeaturedMatch.awayPlayer}
                  avatar={data.lastFeaturedMatch.awayAvatar}
                  size='xs'
                />
                <span className='font-medium text-content'>
                  {data.lastFeaturedMatch.awayPlayer}{" "}
                  <span className='text-[10px] text-content-subtle font-normal'>
                    (Away)
                  </span>
                </span>
              </div>
            </div>

            <div className='space-y-3 font-bold text-right pr-2 text-content'>
              <div>{data.lastFeaturedMatch.homeScore}</div>
              <div>{data.lastFeaturedMatch.awayScore}</div>
            </div>
          </div>
        )}

        {/* Dynamic Bullet Points with Network / Branch Icon */}
        <div className='space-y-3 pl-0.5 pt-1'>
          {data.keyUpdates?.map((update, idx) => (
            <div
              key={idx}
              className='flex items-start gap-2.5 text-xs text-content-muted leading-relaxed'
            >
              <svg
                className='w-3.5 h-3.5 text-content-subtle shrink-0 mt-0.5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='18' cy='5' r='3' />
                <circle cx='6' cy='12' r='3' />
                <circle cx='18' cy='19' r='3' />
                <line x1='8.59' y1='13.51' x2='15.42' y2='17.49' />
                <line x1='15.41' y1='6.51' x2='8.59' y2='10.49' />
              </svg>
              <p>{update}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TITLE RACE ANALYSIS SEGMENT */}
      <div className='space-y-3.5'>
        <h3 className='text-sm font-bold text-content tracking-tight'>
          Title Race Analysis
        </h3>

        {/* Standings Predictive Probability List Loop */}
        <div className='space-y-4'>
          {data.titleRace?.map((player, idx) => (
            <div
              key={idx}
              className='p-4 bg-surface border border-edge rounded-2xl space-y-3.5 shadow-2xs animate-fade-in'
            >
              {/* Header Info Row */}
              <div className='flex items-center justify-between pb-1'>
                <div className='flex items-center gap-2.5'>
                  <Avatar name={player.username} avatar={player.avatar} size='sm' />
                  <span className='text-xs font-bold text-content'>
                    {player.username}
                  </span>
                </div>
                <div className='flex items-center gap-1.5 text-xs font-semibold text-content-secondary'>
                  <svg
                    className='w-3.5 h-3.5 text-content-subtle'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.75'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
                    <path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
                    <path d='M4 22h16' />
                    <path d='M10 14.66V17c0 .55-.45 1-1 1H7' />
                    <path d='M14 14.66V17c0 .55.45 1 1 1h2' />
                    <path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
                  </svg>
                  <span>{player.probability}</span>
                </div>
              </div>

              {/* Insights */}
              <div className='space-y-2.5 text-xs font-normal leading-relaxed text-content-secondary'>
                <div>
                  <div className='flex items-center gap-1.5 font-bold text-content mb-0.5'>
                    <svg
                      className='w-3 h-3 text-content-subtle'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <line x1='7' y1='17' x2='17' y2='7' />
                      <polyline points='7 7 17 7 17 17' />
                    </svg>
                    <span>Path</span>
                  </div>
                  <p className='text-content-muted leading-relaxed pl-4'>
                    {player.path}
                  </p>
                </div>

                {player.historicalEdge && (
                  <div>
                    <div className='flex items-center gap-1.5 font-bold text-content mb-0.5'>
                      <svg
                        className='w-3 h-3 text-content-subtle'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
                        <path d='M3 3v5h5' />
                      </svg>
                      <span>Historical edge</span>
                    </div>
                    <p className='text-content-muted leading-relaxed pl-4'>
                      {player.historicalEdge}
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
