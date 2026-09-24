import { useState } from "react";
import type { ReviewAttendeesCardProps } from "../../types";

export function ReviewAttendeesCard({
  attendees,
  onEdit,
}: ReviewAttendeesCardProps) {
  const [friendships, setFriendships] = useState<Record<string, boolean>>({});

  return (
    <div className='space-y-2.5 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold text-content flex items-center gap-2'>
          ✓ Attendies
        </h3>
        <button
          type='button'
          onClick={onEdit}
          className='w-7 h-7 bg-badge-pink-bg text-badge-pink-text rounded-full flex items-center justify-center hover:bg-badge-pink-hover active:scale-90 transition-transform cursor-pointer text-xs'
        >
          ✏️
        </button>
      </div>

      <div className='space-y-3'>
        {/* Fixed Admin Context Item Slot */}
        <div className='flex items-center justify-between py-1'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-surface-inverse flex items-center justify-center text-base'>
              🐱
            </div>
            <span className='text-xs font-semibold text-content'>
              Farshad64920{" "}
              <span className='text-[10px] text-content-subtle font-normal ml-0.5'>
                (Admin)
              </span>
            </span>
          </div>
        </div>

        {/* Dynamic List Roster */}
        {attendees
          .filter((a) => a.resolvedName)
          .map((player, idx) => {
            const name = player.resolvedName!;
            const isFriend = friendships[name];

            return (
              <div key={idx} className='flex items-center justify-between py-1'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-base border border-edge'>
                    {player.avatar || "👤"}
                  </div>
                  <span className='text-xs font-semibold text-content'>
                    {name}
                  </span>
                </div>

                <button
                  type='button'
                  onClick={() =>
                    setFriendships((p) => ({ ...p, [name]: !p[name] }))
                  }
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    isFriend
                      ? "bg-surface-muted text-content-muted border-edge"
                      : "bg-surface text-content-secondary border-edge shadow-sm hover:border-edge-strong"
                  }`}
                >
                  {isFriend ? "✓ Friend" : "＋ Add as a friend"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
