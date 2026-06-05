import React from "react";

interface SelectableCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

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
      className={`w-full p-4 bg-white border border-zinc-100 rounded-2xl text-left flex items-start gap-4 shadow-sm transition-all duration-150 ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:border-zinc-300 hover:shadow active:scale-[0.99] cursor-pointer"
      }`}
    >
      {/* Centered Icon Container Box */}
      <div className='w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-700 flex-shrink-0'>
        {icon}
      </div>

      {/* Text Container Block */}
      <div className='flex-1 space-y-1'>
        <h3 className='font-semibold text-sm text-zinc-900 tracking-tight'>
          {title}
        </h3>
        {description && (
          <p className='text-xs text-zinc-500 leading-normal font-medium'>
            {description}
          </p>
        )}
      </div>
    </button>
  );
}
