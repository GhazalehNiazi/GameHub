import { useNewLeagueStore } from "../store/newLeagueStore";
import type { LeagueWaitingStepProps } from "../types";

export function LeagueWaitingStep({ onStart }: LeagueWaitingStepProps) {
  const { attendees } = useNewLeagueStore();

  // For visual accuracy matching Screenshot 2026-06-05 at 8.49.51 PM.png:
  // Hardcode or mock statuses for illustration purposes.
  // We'll treat the last attendee as the pending one.
  const filteredPlayers = attendees.filter((a) => a.resolvedName);

  return (
    <div className='space-y-6 animate-fade-in text-left pb-4'>
      {/* Informational Header Section */}
      <div className='space-y-2'>
        <h2 className='text-sm font-bold text-zinc-900 flex items-center gap-2'>
          🔄 Pending Requests
        </h2>
        <p className='text-xs text-zinc-500 leading-relaxed font-medium'>
          All the members present in the league, must confirm the invitation
          from their notification page.
        </p>
      </div>

      {/* Roster Badges Status Stack */}
      <div className='space-y-4'>
        {/* Fixed Admin/Host Card */}
        <div className='flex items-center justify-between py-0.5'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-base'>
              🐱
            </div>
            <span className='text-xs font-semibold text-zinc-800'>
              Farshad64920{" "}
              <span className='text-[10px] text-zinc-400 font-normal ml-0.5'>
                (Admin)
              </span>
            </span>
          </div>
          <span className='text-xs font-semibold text-emerald-600 flex items-center gap-1'>
            ⊙ Joined
          </span>
        </div>

        {/* Dynamic Attendees Map List */}
        {filteredPlayers.map((player, idx) => {
          // Emulate layout rule: let the last resolved player be the unconfirmed one
          const isPending = idx === filteredPlayers.length - 1;

          return (
            <div
              key={idx}
              className='flex items-center justify-between py-0.5 animate-fade-in'
            >
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-base border'>
                  {player.avatar || "👤"}
                </div>
                <span className='text-xs font-semibold text-zinc-800'>
                  {player.resolvedName}
                </span>
              </div>

              {isPending ? (
                <span className='text-xs font-semibold text-amber-600/90 flex items-center gap-1'>
                  ▤ Pend Confirmation
                </span>
              ) : (
                <span className='text-xs font-semibold text-emerald-600 flex items-center gap-1'>
                  ⊙ Joined
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Warning Callout Box Card */}
      <div className='flex items-start gap-3.5 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl'>
        <span className='text-zinc-500 text-lg leading-none mt-0.5'>ℹ️</span>
        <p className='text-[11px] text-zinc-500 leading-relaxed font-medium'>
          You can continue to the league and enter the results, but unless all
          members agree, the data won't be shown in the history section.
        </p>
      </div>

      {/* Invisible execution form bridge to link directly up into parent footer trigger systems */}
      <form
        id='new-league-form-5'
        onSubmit={(e) => {
          e.preventDefault();
          onStart();
        }}
        className='hidden'
      />
    </div>
  );
}
