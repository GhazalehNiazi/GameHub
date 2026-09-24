import type { ReviewRulesCardProps } from "../../types";
import {
  SyncArrowsIcon,
  MathPriorityIcon,
  CheckIcon,
} from "@/shared/components/icons/LeagueIcons";

export function ReviewRulesCard({
  gameFormat,
  priorityMethod,
  onEdit,
}: ReviewRulesCardProps) {
  const formatLabel =
    gameFormat === "single" ? "Single Game" : "Home and Away";

  const priorityLabel =
    priorityMethod === "faceToFace" ? "Face To Face" : "Goal Difference";

  return (
    <div className='space-y-2.5 animate-fade-in'>
      {/* Step Title Header with Checkmark */}
      <div className='flex items-center gap-2'>
        <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
        <h3 className='text-sm font-bold text-content tracking-tight'>Rules</h3>
      </div>

      {/* Rules Info Card */}
      <div
        onClick={onEdit}
        className='bg-surface border border-edge rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs shadow-2xs transition-colors hover:border-edge-strong cursor-pointer'
      >
        <div>
          <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
            Game type
          </span>
          <div className='flex items-center gap-2 font-medium text-content'>
            <SyncArrowsIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
            <span className='truncate'>{formatLabel}</span>
          </div>
        </div>

        <div>
          <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
            Champion Priority
          </span>
          <div className='flex items-center gap-2 font-medium text-content'>
            <MathPriorityIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
            <span className='truncate'>{priorityLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
