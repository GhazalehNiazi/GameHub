import type { MemberStatusRowProps } from "../types";

export function MemberStatusRow({ member }: MemberStatusRowProps) {
  const isJoined = member.status === "joined";

  return (
    <div className='flex items-center justify-between py-1.5 animate-fade-in'>
      {/* Left Profile Segment */}
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-base border border-edge shadow-sm'>
          {member.avatar}
        </div>
        <span className='text-xs font-semibold text-content'>
          {member.name}
          {member.isAdmin && (
            <span className='text-[10px] text-content-subtle font-normal ml-1'>
              (Admin)
            </span>
          )}
        </span>
      </div>

      {/* Right Status Badge Segment matching layout visual criteria */}
      <div className='flex items-center gap-1.5 font-medium text-[11px]'>
        {isJoined ? (
          <span className='text-success flex items-center gap-1'>
            <span className='text-xs'>⊙</span> Joined
          </span>
        ) : (
          <span className='text-warning flex items-center gap-1'>
            <span className='text-xs'>⊘</span> Pend Confirmation
          </span>
        )}
      </div>
    </div>
  );
}
