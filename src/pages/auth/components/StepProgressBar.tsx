import React from "react";

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    <div className='flex items-center justify-between gap-2.5 w-full my-4'>
      {[1, 2, 3].map((step) => {
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div
            key={step}
            className={`h-2.5 flex-1 rounded-full border transition-all duration-300 ${
              isCompleted
                ? "bg-teal-500 border-teal-500 flex items-center justify-center"
                : isActive
                  ? "bg-teal-500 border-teal-500"
                  : "bg-white border-zinc-300"
            }`}
          >
            {isCompleted && (
              <svg
                className='w-2 h-2 text-white'
                fill='none'
                stroke='currentColor'
                strokeWidth='4'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 12.75l6 6 9-13.5'
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
