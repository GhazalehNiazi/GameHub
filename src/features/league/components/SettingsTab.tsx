import type { SettingsTabProps } from "../types";
import {
  BlocksIcon,
  CheckIcon,
  PenIcon,
  GamepadIcon,
  SyncArrowsIcon,
  MathPriorityIcon,
} from "@/shared/components/icons/LeagueIcons";
import { Avatar } from "@/shared/components/ui/Avatar";

export function SettingsTab({
  attendees,
  onTerminateLeague,
}: SettingsTabProps) {
  const filteredPlayers = attendees.filter((a) => a.resolvedName);

  const displayAttendees =
    filteredPlayers.length > 0
      ? filteredPlayers.map((a) => ({
          name: a.resolvedName!,
          avatar: a.avatar || a.resolvedName!,
        }))
      : [
          { name: "Farshad69420", avatar: "cat" },
          { name: "Mohammad Reza", avatar: "monster" },
          { name: "Matrixforlife", avatar: "dog" },
          { name: "Ilialeftie", avatar: "sloth" },
        ];

  return (
    <div className='space-y-6 animate-fade-in text-left pb-6'>
      {/* 1. BASICS SECTION (Android Large - 262) */}
      <div className='space-y-2.5'>
        <div className='flex items-center gap-2'>
          <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
          <h3 className='text-sm font-bold text-content tracking-tight'>
            Basics
          </h3>
        </div>

        <div className='bg-surface border border-edge rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs shadow-2xs'>
          <div>
            <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
              Name of the league
            </span>
            <div className='flex items-center gap-2 font-medium text-content'>
              <PenIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
              <span className='truncate'>Name of the league</span>
            </div>
          </div>
          <div>
            <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
              Fifa Version
            </span>
            <div className='flex items-center gap-2 font-medium text-content'>
              <GamepadIcon className='w-4 h-4 text-content-secondary shrink-0' />
              <span className='uppercase'>FC 25</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ATTENDEES SECTION (Android Large - 262) */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2'>
          <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
          <h3 className='text-sm font-bold text-content tracking-tight'>
            Attendies
          </h3>
        </div>

        <div className='space-y-2.5'>
          {displayAttendees.map((player, idx) => {
            const isCurrentUser = idx === 0 || player.name.includes("Farshad");

            return (
              <div
                key={idx}
                className='flex items-center justify-between py-1 animate-fade-in'
              >
                <div className='flex items-center gap-3'>
                  <Avatar name={player.name} avatar={player.avatar} size='md' />
                  <span className='text-xs font-semibold text-content'>
                    {player.name}
                  </span>
                </div>

                {!isCurrentUser && (
                  <button
                    type='button'
                    className='px-3 py-1.5 text-[11px] font-medium rounded-full border border-edge bg-surface text-content-secondary hover:text-content hover:border-edge-strong transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs'
                  >
                    <span className='text-xs leading-none font-medium'>＋</span>
                    <span>Add as a friend</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RULES SECTION (Android Large - 262) */}
      <div className='space-y-2.5'>
        <div className='flex items-center gap-2'>
          <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
          <h3 className='text-sm font-bold text-content tracking-tight'>
            Rules
          </h3>
        </div>

        <div className='bg-surface border border-edge rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs shadow-2xs'>
          <div>
            <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
              Game type
            </span>
            <div className='flex items-center gap-2 font-medium text-content'>
              <SyncArrowsIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
              <span>Home and Away</span>
            </div>
          </div>
          <div>
            <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
              Champion Priority
            </span>
            <div className='flex items-center gap-2 font-medium text-content'>
              <MathPriorityIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
              <span>Goal Difference</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. LEAGUE STATE SECTION (Android Large - 263) */}
      <div className='space-y-3 pt-2'>
        <div className='flex items-center gap-2'>
          <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
          <h3 className='text-sm font-bold text-content tracking-tight'>
            League State
          </h3>
        </div>

        {/* Option 1: End league and terminate the fixtures */}
        <button
          type='button'
          onClick={onTerminateLeague}
          className='w-full p-4 bg-surface border border-edge rounded-2xl flex items-start gap-3.5 shadow-2xs hover:border-edge-strong transition-all text-left cursor-pointer active:scale-[0.99] group'
        >
          <div className='text-content-secondary group-hover:text-content transition-colors mt-0.5 shrink-0'>
            <BlocksIcon className='w-5 h-5' />
          </div>
          <div className='space-y-1'>
            <h4 className='text-xs font-bold text-content leading-snug'>
              End league and terminate the fixtures
            </h4>
            <p className='text-[11px] text-content-muted leading-relaxed font-normal'>
              If you want to start a completely new league and provide the results
              a you go on.
            </p>
          </div>
        </button>

        {/* Option 2: End league and set remaining fixtures to 0-0 draws */}
        <button
          type='button'
          onClick={onTerminateLeague}
          className='w-full p-4 bg-surface border border-edge rounded-2xl flex items-start gap-3.5 shadow-2xs hover:border-edge-strong transition-all text-left cursor-pointer active:scale-[0.99] group'
        >
          <div className='text-content-secondary group-hover:text-content transition-colors mt-0.5 shrink-0'>
            <BlocksIcon className='w-5 h-5' />
          </div>
          <div className='space-y-1'>
            <h4 className='text-xs font-bold text-content leading-snug'>
              End league and set the remaining fixtures to 0 - 0 draws
            </h4>
            <p className='text-[11px] text-content-muted leading-relaxed font-normal'>
              If you want to start a completely new league and provide the results
              a you go on.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
