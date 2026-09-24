import { forwardRef } from "react";
import type { InputProps } from "@/shared/types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className = "", ...props }, ref) => {
    return (
      <div className='w-full space-y-1.5 text-left'>
        {label && (
          <label htmlFor={id} className='block text-xs font-medium text-content-secondary'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-3 bg-surface-subtle border ${
            error
              ? "border-danger focus:border-danger"
              : "border-edge focus:border-brand"
          } rounded-xl text-sm text-content placeholder:text-content-subtle focus:outline-none focus:bg-surface transition-all ${className}`}
          {...props}
        />
        {error && <p className='text-[10px] text-danger pl-1'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
