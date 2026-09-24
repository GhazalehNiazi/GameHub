import { useState } from "react";
import type { ReviewAttendeesCardProps } from "../../types";
import { CheckIcon } from "@/shared/components/icons/LeagueIcons";
import { Avatar } from "@/shared/components/ui/Avatar";

const DEFAULT_MOCK_ATTENDEES = [
  { name: "Mohammad Reza", avatar: "monster" },
  { name: "Matrixforlife", avatar: "dog" },
  { name: "Ilialeftie", avatar: "sloth" },
];

export function ReviewAttendeesCard({
  attendees,
  onEdit,
}: ReviewAttendeesCardProps) {
  const [friendships, setFriendships] = useState<Record<string, boolean>>({});

  // Filter valid resolved attendees from the store
  const resolvedList = attendees.filter((a) => a.resolvedName?.trim());

  // If the user has resolved attendees, use them; otherwise display the mockup's roster
  const displayAttendees =
    resolvedList.length > 0
      ? resolvedList.map((a) => ({
          name: a.resolvedName!,
          avatar: a.avatar || a.resolvedName!,
        }))
      : DEFAULT_MOCK_ATTENDEES;

  const toggleFriend = (name: string) => {
    setFriendships((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className='space-y-3 animate-fade-in'>
      {/* Step Title Header with Checkmark */}
      <div
        onClick={onEdit}
        className='flex items-center gap-2 cursor-pointer'
      >
        <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
        <h3 className='text-sm font-bold text-content tracking-tight'>
          Attendies
        </h3>
      </div>

      {/* Attendees Roster List */}
      <div className='space-y-2.5'>
        {/* Host / Current User (Farshad69420) */}
        <div className='flex items-center justify-between py-1'>
          <div className='flex items-center gap-3'>
            <Avatar name='Farshad69420' avatar='cat' size='md' />
            <span className='text-xs font-semibold text-content'>
              Farshad69420
            </span>
          </div>
        </div>

        {/* Invited Members */}
        {displayAttendees.map((player, idx) => {
          const isFriend = !!friendships[player.name];

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

              <button
                type='button'
                onClick={() => toggleFriend(player.name)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                  isFriend
                    ? "bg-surface-muted text-content-muted border-edge"
                    : "bg-surface text-content-secondary border-edge hover:border-edge-strong hover:text-content shadow-2xs"
                }`}
              >
                <span className='text-xs leading-none font-medium'>
                  {isFriend ? "✓" : "＋"}
                </span>
                <span>{isFriend ? "Friend" : "Add as a friend"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
