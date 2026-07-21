import { useState } from "react";

export interface UpdateToastProps {
  needRefresh: boolean;
  onUpdate: () => void;
  onDismiss?: () => void;
}

export function UpdateToast({
  needRefresh,
  onUpdate,
  onDismiss,
}: UpdateToastProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!needRefresh || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm p-4 bg-indigo-950 text-white border border-indigo-700/80 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-bounce-short flex items-center justify-between gap-3'>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-inner'>
          <svg
            className='w-5 h-5 text-white animate-spin-slow'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
        </div>
        <div>
          <h5 className='text-xs font-bold text-white tracking-wide uppercase'>
            Update Available
          </h5>
          <p className='text-xs text-indigo-200 mt-0.5'>
            A new version of GameHub is ready.
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 shrink-0'>
        <button
          onClick={onUpdate}
          className='px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer'
        >
          Update
        </button>
        <button
          onClick={handleDismiss}
          className='p-1 text-indigo-300 hover:text-white transition-colors text-sm'
          aria-label='Dismiss update'
        >
          ✕
        </button>
      </div>
    </div>
  );
}
