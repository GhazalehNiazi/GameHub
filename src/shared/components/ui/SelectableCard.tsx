import type { SelectableCardProps } from "@/shared/types";

export function SelectableCard({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}: SelectableCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 bg-surface border border-edge-subtle rounded-2xl text-left flex items-start gap-4 shadow-sm transition-all duration-150 ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:border-edge-strong hover:shadow active:scale-[0.99] cursor-pointer"
      }`}
    >
      {/* Centered Icon Container Box */}
      <div className='w-10 h-10 bg-surface-subtle border border-edge-subtle rounded-xl flex items-center justify-center text-content-secondary flex-shrink-0'>
        {icon}
      </div>

      {/* Text Container Block */}
      <div className='flex-1 space-y-1'>
        <h3 className='font-semibold text-sm text-content tracking-tight'>
          {title}
        </h3>
        {description && (
          <p className='text-xs text-content-muted leading-normal font-medium'>
            {description}
          </p>
        )}
      </div>
    </button>
  );
}
