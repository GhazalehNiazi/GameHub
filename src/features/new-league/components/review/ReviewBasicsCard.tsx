import type { ReviewBasicsCardProps } from "../../types";
import { PenIcon, GamepadIcon, CheckIcon } from "@/shared/components/icons/LeagueIcons";

export function ReviewBasicsCard({
  leagueName,
  fifaVersion,
  onEdit,
}: ReviewBasicsCardProps) {
  // Format FIFA version to display e.g. "FC 25"
  const formattedFifaVersion = (() => {
    if (!fifaVersion) return "FC 25";
    const clean = fifaVersion.toLowerCase();
    if (clean.includes("25")) return "FC 25";
    if (clean.includes("24")) return "FC 24";
    if (clean.includes("23")) return "FIFA 23";
    if (clean.includes("22")) return "FIFA 22";
    return fifaVersion.toUpperCase();
  })();

  return (
    <div className='space-y-2.5 animate-fade-in'>
      {/* Step Title Header with Checkmark */}
      <div className='flex items-center gap-2'>
        <CheckIcon className='w-4 h-4 text-content stroke-[2.5]' />
        <h3 className='text-sm font-bold text-content tracking-tight'>
          Basics
        </h3>
      </div>

      {/* Basics Info Card */}
      <div
        onClick={onEdit}
        className='bg-surface border border-edge rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs shadow-2xs transition-colors hover:border-edge-strong cursor-pointer'
      >
        <div>
          <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
            Name of the league
          </span>
          <div className='flex items-center gap-2 font-medium text-content'>
            <PenIcon className='w-3.5 h-3.5 text-content-secondary shrink-0' />
            <span className='truncate'>{leagueName || "Name of the league"}</span>
          </div>
        </div>

        <div>
          <span className='block text-[11px] font-medium text-content-subtle mb-1.5'>
            Fifa Version
          </span>
          <div className='flex items-center gap-2 font-medium text-content'>
            <GamepadIcon className='w-4 h-4 text-content-secondary shrink-0' />
            <span className='uppercase'>{formattedFifaVersion}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
