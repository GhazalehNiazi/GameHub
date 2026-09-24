
interface AvatarProps {
  name?: string;
  avatar?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  xs: "w-6 h-6 text-xs",
  sm: "w-7 h-7 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
  xl: "w-12 h-12 text-lg",
};

export function Avatar({
  name = "",
  avatar,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;
  const key = (avatar || name || "").toLowerCase();

  // 1. Black Cat Avatar (Farshad69420 / cat)
  if (key.includes("cat") || key.includes("farshad")) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden flex-shrink-0 bg-[#1e2025] flex items-center justify-center ${className}`}
      >
        <svg viewBox='0 0 36 36' className='w-full h-full' fill='none'>
          {/* Background circle */}
          <circle cx='18' cy='18' r='18' fill='#1b1c20' />
          {/* Ears */}
          <polygon points='8,14 13,6 17,13' fill='#2b2d35' />
          <polygon points='9,13 13,8 16,13' fill='#f472b6' opacity='0.7' />
          <polygon points='28,14 23,6 19,13' fill='#2b2d35' />
          <polygon points='27,13 23,8 20,13' fill='#f472b6' opacity='0.7' />
          {/* Head */}
          <ellipse cx='18' cy='21' rx='12' ry='10' fill='#2b2d35' />
          {/* Eyes */}
          <ellipse cx='14' cy='19' rx='2.2' ry='2.6' fill='#facc15' />
          <ellipse cx='14' cy='19' rx='1' ry='2.2' fill='#111827' />
          <ellipse cx='22' cy='19' rx='2.2' ry='2.6' fill='#facc15' />
          <ellipse cx='22' cy='19' rx='1' ry='2.2' fill='#111827' />
          {/* Nose & Mouth */}
          <polygon points='18,22 17,23.5 19,23.5' fill='#f472b6' />
          <path
            d='M16 24.5 Q18 26 20 24.5'
            stroke='#9ca3af'
            strokeWidth='0.8'
            fill='none'
          />
          {/* Whiskers */}
          <line x1='12' y1='22' x2='7' y2='21' stroke='#9ca3af' strokeWidth='0.7' />
          <line x1='12' y1='24' x2='7' y2='25' stroke='#9ca3af' strokeWidth='0.7' />
          <line x1='24' y1='22' x2='29' y2='21' stroke='#9ca3af' strokeWidth='0.7' />
          <line x1='24' y1='24' x2='29' y2='25' stroke='#9ca3af' strokeWidth='0.7' />
        </svg>
      </div>
    );
  }

  // 2. Purple Goblin/Monster Avatar (Mohammad Reza / Mamzi / monster)
  if (
    key.includes("monster") ||
    key.includes("mohammad") ||
    key.includes("reza") ||
    key.includes("mamzi")
  ) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden flex-shrink-0 bg-[#6d28d9] flex items-center justify-center ${className}`}
      >
        <svg viewBox='0 0 36 36' className='w-full h-full' fill='none'>
          {/* Background */}
          <circle cx='18' cy='18' r='18' fill='#5b21b6' />
          {/* Pointy ears */}
          <polygon points='5,18 2,11 11,14' fill='#7c3aed' />
          <polygon points='31,18 34,11 25,14' fill='#7c3aed' />
          <polygon points='6,17 4,12 10,14' fill='#c084fc' opacity='0.7' />
          <polygon points='30,17 32,12 26,14' fill='#c084fc' opacity='0.7' />
          {/* Face */}
          <circle cx='18' cy='19' r='11' fill='#7c3aed' />
          {/* Brow ridges */}
          <path d='M11 14 Q14 17 17 15' stroke='#4c1d95' strokeWidth='1.5' fill='none' />
          <path d='M25 14 Q22 17 19 15' stroke='#4c1d95' strokeWidth='1.5' fill='none' />
          {/* Yellow wild eyes */}
          <circle cx='14' cy='17' r='2.8' fill='#fef08a' />
          <circle cx='14' cy='17' r='1.2' fill='#1e1b4b' />
          <circle cx='22' cy='17' r='2.8' fill='#fef08a' />
          <circle cx='22' cy='17' r='1.2' fill='#1e1b4b' />
          {/* Wide maniacal grin */}
          <path
            d='M12 21 Q18 29 24 21 Z'
            fill='#1e1b4b'
            stroke='#4c1d95'
            strokeWidth='0.8'
          />
          {/* Teeth */}
          <polygon points='13,21 14.5,23.5 16,21' fill='#ffffff' />
          <polygon points='16.5,21 18,23.8 19.5,21' fill='#ffffff' />
          <polygon points='20,21 21.5,23.5 23,21' fill='#ffffff' />
          <polygon points='14.5,25 16,23 17.5,25' fill='#ffffff' />
          <polygon points='18.5,25 20,23 21.5,25' fill='#ffffff' />
        </svg>
      </div>
    );
  }

  // 3. Bulldog/Dog Avatar (Matrixforlife / dog)
  if (key.includes("dog") || key.includes("matrix") || key.includes("pup")) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden flex-shrink-0 bg-[#fed7aa] flex items-center justify-center ${className}`}
      >
        <svg viewBox='0 0 36 36' className='w-full h-full' fill='none'>
          <circle cx='18' cy='18' r='18' fill='#ffedd5' />
          {/* Floppy ears */}
          <ellipse cx='8' cy='17' rx='4' ry='7' fill='#c2410c' />
          <ellipse cx='28' cy='17' rx='4' ry='7' fill='#c2410c' />
          {/* Head */}
          <circle cx='18' cy='18' r='11' fill='#ea580c' />
          {/* Snout */}
          <ellipse cx='18' cy='22' rx='6' ry='4.5' fill='#fed7aa' />
          <ellipse cx='18' cy='20' rx='2.5' ry='1.8' fill='#431407' />
          <path d='M18 21.8 L18 24' stroke='#431407' strokeWidth='1' />
          <path d='M16 23.5 Q18 25 20 23.5' stroke='#431407' strokeWidth='1' fill='none' />
          {/* Eyes with patches */}
          <circle cx='13' cy='16' r='3.5' fill='#c2410c' />
          <circle cx='13' cy='16' r='1.6' fill='#ffffff' />
          <circle cx='13' cy='16' r='0.9' fill='#18181b' />
          <circle cx='23' cy='16' r='1.6' fill='#ffffff' />
          <circle cx='23' cy='16' r='0.9' fill='#18181b' />
        </svg>
      </div>
    );
  }

  // 4. Sloth Avatar (Ilialeftie / sloth)
  if (key.includes("sloth") || key.includes("leftie") || key.includes("ilia")) {
    return (
      <div
        className={`${sizeClasses} rounded-full overflow-hidden flex-shrink-0 bg-[#d97706] flex items-center justify-center ${className}`}
      >
        <svg viewBox='0 0 36 36' className='w-full h-full' fill='none'>
          <circle cx='18' cy='18' r='18' fill='#b45309' />
          {/* Face mask */}
          <circle cx='18' cy='18' r='11' fill='#fef3c7' />
          {/* Eye stripe patches */}
          <ellipse cx='13' cy='17' rx='4' ry='2.5' fill='#78350f' transform='rotate(-15 13 17)' />
          <ellipse cx='23' cy='17' rx='4' ry='2.5' fill='#78350f' transform='rotate(15 23 17)' />
          {/* Eyes */}
          <circle cx='13' cy='17' r='1.4' fill='#1e1b4b' />
          <circle cx='13.4' cy='16.6' r='0.4' fill='#ffffff' />
          <circle cx='23' cy='17' r='1.4' fill='#1e1b4b' />
          <circle cx='23.4' cy='16.6' r='0.4' fill='#ffffff' />
          {/* Nose & Smile */}
          <ellipse cx='18' cy='20.5' rx='2.2' ry='1.4' fill='#451a03' />
          <path d='M15 22.5 Q18 24.5 21 22.5' stroke='#451a03' strokeWidth='1' fill='none' />
        </svg>
      </div>
    );
  }

  // Default fallback
  return (
    <div
      className={`${sizeClasses} rounded-full bg-surface-muted text-content-secondary border border-edge flex items-center justify-center font-bold uppercase shrink-0 ${className}`}
    >
      {avatar && avatar.length <= 2 ? (
        <span>{avatar}</span>
      ) : (
        <span>{(name || "U")[0]}</span>
      )}
    </div>
  );
}
