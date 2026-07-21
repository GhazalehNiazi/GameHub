import { forwardRef } from "react";
import type { InputProps } from "@/shared/types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className = "", ...props }, ref) => {
    return (
      <div className='w-full space-y-1.5 text-left'>
        {label && (
          <label htmlFor={id} className='block text-xs font-medium text-zinc-700'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-3 bg-zinc-50 border ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-200/80 focus:border-zinc-400"
          } rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white transition-all ${className}`}
          {...props}
        />
        {error && <p className='text-[10px] text-red-500 pl-1'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
