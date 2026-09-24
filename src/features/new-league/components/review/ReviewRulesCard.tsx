import type { ReviewRulesCardProps } from "../../types";

export function ReviewRulesCard({
  gameFormat,
  priorityMethod,
  onEdit,
}: ReviewRulesCardProps) {
  return (
    <div className='space-y-2 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-bold text-content flex items-center gap-2'>
          ✓ Rules
        </h3>
        <button
          type='button'
          onClick={onEdit}
          className='w-7 h-7 bg-badge-pink-bg text-badge-pink-text rounded-full flex items-center justify-center hover:bg-badge-pink-hover active:scale-90 transition-transform cursor-pointer text-xs'
        >
          ✏️
        </button>
      </div>

      <div className='bg-surface-subtle/50 border border-edge-subtle rounded-2xl p-4 flex justify-between text-xs gap-4'>
        <div className='flex-1'>
          <span className='block text-content-muted font-medium mb-1'>
            Game type
          </span>
          <span className='font-semibold text-content-secondary truncate block'>
            {gameFormat === "single" ? "Single Game" : "Home And Away"}
          </span>
        </div>
        <div className='flex-1'>
          <span className='block text-content-muted font-medium mb-1'>
            Champion Priority
          </span>
          <span className='font-semibold text-content-secondary truncate block'>
            {priorityMethod === "goalDifference"
              ? "Goal Difference"
              : "Face To Face"}
          </span>
        </div>
      </div>
    </div>
  );
}
