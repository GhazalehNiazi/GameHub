import type { StepProgressBarProps } from "../types";

export function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    <div className='flex items-center justify-between gap-3 w-full my-4'>
      {[1, 2, 3].map((step) => {
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div
            key={step}
            style={{ flex: isActive ? "2.8 1 0%" : "1 1 0%" }}
            className={`h-7 rounded-full border-2 border-brand transition-all duration-300 ease-in-out flex items-center justify-center ${
              isCompleted || isActive ? "bg-brand" : "bg-surface"
            }`}
          >
            {isCompleted && (
              <svg
                className='w-4 h-4 text-brand-fg'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
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

