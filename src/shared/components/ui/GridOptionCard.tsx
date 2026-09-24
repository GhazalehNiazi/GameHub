import type { GridOptionCardProps } from "@/shared/types";

export function GridOptionCard({
  icon,
  title,
  isSelected,
  onClick,
}: GridOptionCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex-1 p-4 bg-surface border rounded-2xl flex items-center gap-2.5 shadow-sm text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${
        isSelected
          ? "border-brand bg-brand-subtle ring-1 ring-brand"
          : "border-edge hover:border-edge-strong"
      }`}
    >
      <div
        className={`text-content-secondary font-medium ${isSelected ? "text-brand" : ""}`}
      >
        {icon}
      </div>
      <span className='text-xs font-semibold text-content tracking-tight leading-snug'>
        {title}
      </span>
    </button>
  );
}
