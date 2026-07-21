import type { InputProps } from "@/shared/types";

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className='w-full space-y-1.5 text-left'>
      {label && (
        <label htmlFor={id} className='block text-xs font-medium text-zinc-700'>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
