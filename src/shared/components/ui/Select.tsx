import { forwardRef } from "react";
import type { SelectProps } from "@/shared/types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      subLabel,
      id,
      options,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full space-y-1.5 text-left relative'>
        {label && (
          <label htmlFor={id} className='block text-xs font-medium text-zinc-700'>
            {label}
          </label>
        )}
        <div className='relative flex items-center'>
          {subLabel && (
            <span className='absolute left-4 top-2 text-[10px] text-zinc-400 font-medium pointer-events-none'>
              {subLabel}
            </span>
          )}
          <select
            ref={ref}
            id={id}
            className={`w-full pl-4 pr-10 pb-2.5 rounded-xl border ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-200 focus:border-zinc-400"
            } bg-zinc-50 text-sm text-zinc-900 focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer ${
              subLabel ? "pt-5" : "pt-2.5"
            } ${className}`}
            {...props}
          >
            {props.placeholder && (
              <option value='' disabled hidden>
                {props.placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Customized SVG Chevron Indicator Down arrow */}
          <div className='absolute right-4 pointer-events-none text-zinc-500'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </div>
        </div>
        {error && <p className='text-[10px] text-red-500 pl-1'>{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
