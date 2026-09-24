import type { SettingsTabProps } from "../types";

export function SettingsTab({
  attendees,
  onTerminateLeague,
}: SettingsTabProps) {
  const filteredPlayers = attendees.filter((a) => a.resolvedName);

  return (
    <div className='space-y-6 animate-fade-in text-left pb-4'>
      {/* 1. LEAGUE STATE SECTION (FOR ADMIN) */}
      <div className='space-y-3'>
        <h3 className='text-xs font-bold text-content flex items-center gap-1.5'>
          ✓ League State (for Admin)
        </h3>

        {/* Terminate Action Card Trigger Button */}
        <button
          type='button'
          onClick={onTerminateLeague}
          className='w-full p-4 bg-surface border border-edge hover:border-danger rounded-2xl flex items-center gap-4 shadow-sm transition-all text-left group cursor-pointer active:scale-[0.99]'
        >
          <div className='w-10 h-10 rounded-xl bg-surface-subtle group-hover:bg-danger-subtle text-content-secondary group-hover:text-danger-text flex items-center justify-center text-lg transition-colors'>
            🗑️
          </div>
          <div>
            <h4 className='text-xs font-bold text-content group-hover:text-danger-text transition-colors'>
              Terminate League
            </h4>
            <p className='text-[10px] text-content-subtle font-medium mt-0.5'>
              Delete all the data of the league.
            </p>
          </div>
        </button>

        {/* Explicit Warning Info Box */}
        <div className='flex items-start gap-3 p-3 bg-surface-subtle border border-edge-subtle rounded-xl'>
          <span className='text-content-subtle text-xs mt-0.5'>ℹ️</span>
          <p className='text-[10px] text-content-muted font-medium leading-normal'>
            In order to do so, you need confirmation of all attendees.
          </p>
        </div>
      </div>

      {/* 2. ATTENDEES TRACKER STATUS SECTION */}
      <div className='space-y-3.5 pt-2 border-t border-edge-subtle'>
        <h3 className='text-xs font-bold text-content flex items-center gap-1.5'>
          🔄 Attendees
        </h3>

        <div className='space-y-4'>
          {/* Admin Row Entry */}
          <div className='flex items-center justify-between py-0.5 text-xs'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-surface-inverse flex items-center justify-center text-sm shadow-sm'>
                🐱
              </div>
              <span className='font-semibold text-content'>
                Farshad64920{" "}
                <span className='text-[10px] text-content-subtle font-normal ml-0.5'>
                  (Admin)
                </span>
              </span>
            </div>
            <span className='font-semibold text-success flex items-center gap-1'>
              ⊙ Joined
            </span>
          </div>

          {/* Dynamic Attendees Mapping Loop */}
          {filteredPlayers.map((player, idx) => {
            // Emulate layout: let the last resolved player be the pending one to match mockup
            const isPending = idx === filteredPlayers.length - 1;

            return (
              <div
                key={idx}
                className='flex items-center justify-between py-0.5 text-xs animate-fade-in'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-sm border border-edge-subtle shadow-sm'>
                    {player.avatar || "👤"}
                  </div>
                  <span className='font-semibold text-content'>
                    {player.resolvedName}
                  </span>
                </div>

                {isPending ? (
                  <span className='font-semibold text-warning flex items-center gap-1'>
                    ▤ Pend Confirmation
                  </span>
                ) : (
                  <span className='font-semibold text-success flex items-center gap-1'>
                    ⊙ Joined
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Historical Visibility Alert Disclaimer Callout Box */}
        <div className='flex items-start gap-3.5 p-4 bg-surface-subtle border border-edge-subtle rounded-2xl'>
          <span className='text-content-subtle text-base leading-none mt-0.5'>
            ℹ️
          </span>
          <p className='text-[11px] text-content-muted leading-relaxed font-medium'>
            You can continue to the league and enter the results, but unless all
            members agree, the data won't be shown in the history section.
          </p>
        </div>
      </div>
    </div>
  );
}
