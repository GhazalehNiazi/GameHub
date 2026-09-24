export function PenIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 20h9' />
      <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
    </svg>
  );
}

export function GamepadIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='2' y='6' width='20' height='12' rx='6' />
      <line x1='6' y1='12' x2='10' y2='12' />
      <line x1='8' y1='10' x2='8' y2='14' />
      <circle cx='15' cy='11' r='1' fill='currentColor' />
      <circle cx='18' cy='13' r='1' fill='currentColor' />
    </svg>
  );
}

export function SyncArrowsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
    </svg>
  );
}

export function MathPriorityIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='5' y1='5' x2='5' y2='11' />
      <line x1='2' y1='8' x2='8' y2='8' />
      <line x1='2' y1='16' x2='8' y2='16' />
      <line x1='13' y1='12' x2='21' y2='12' />
      <circle cx='17' cy='7' r='1.2' fill='currentColor' />
      <circle cx='17' cy='17' r='1.2' fill='currentColor' />
    </svg>
  );
}

export function BlocksIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
      <rect x='3' y='3' width='7.5' height='7.5' rx='2.5' />
      <rect x='13.5' y='3' width='7.5' height='7.5' rx='2.5' />
      <rect x='3' y='13.5' width='7.5' height='7.5' rx='2.5' />
      <rect x='13.5' y='13.5' width='7.5' height='7.5' rx='2.5' />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export function BellIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
      />
    </svg>
  );
}

export function DocumentIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='16' y1='13' x2='8' y2='13' />
      <line x1='16' y1='17' x2='8' y2='17' />
      <line x1='10' y1='9' x2='8' y2='9' />
    </svg>
  );
}

export function TableGridIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='3' y='3' width='18' height='18' rx='2.5' />
      <path d='M3 9h18M3 15h18M9 3v18M15 3v18' />
    </svg>
  );
}

export function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z' />
    </svg>
  );
}
