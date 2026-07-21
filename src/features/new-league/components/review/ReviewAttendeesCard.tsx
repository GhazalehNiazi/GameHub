import React, { useState } from "react";

interface Attendee {
  id: string;
  resolvedName?: string;
  avatar?: string;
}

interface ReviewAttendeesCardProps {
  attendees: Attendee[];
  onEdit: () => void;
}

export function ReviewAttendeesCard({
  attendees,
  onEdit,
}: ReviewAttendeesCardProps) {
  const [friendships, setFriendships] = useState<Record<string, boolean>>({});

  return (
    <div className='space-y-2.5 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold text-zinc-900 flex items-center gap-2'>
          ✓ Attendies
        </h3>
        <button
          type='button'
          onClick={onEdit}
          className='w-7 h-7 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-100 active:scale-90 transition-transform cursor-pointer text-xs'
        >
          ✏️
        </button>
      </div>

      <div className='space-y-3'>
        {/* Fixed Admin Context Item Slot */}
        <div className='flex items-center justify-between py-1'>
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
                  <div className='w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-base border border-zinc-200/40'>
                    {player.avatar || "👤"}
                  </div>
                  <span className='text-xs font-semibold text-zinc-800'>
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
                      ? "bg-zinc-100 text-zinc-500 border-zinc-200"
                      : "bg-white text-zinc-700 border-zinc-200 shadow-sm hover:border-zinc-300"
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
