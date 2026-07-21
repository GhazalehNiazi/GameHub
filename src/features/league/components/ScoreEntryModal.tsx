import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ScoreEntryModalProps } from "../types";
import {
  scoreEntrySchema,
  type ScoreEntryFormValues,
} from "@/features/new-league/schemas/leagueSchemas";

export function ScoreEntryModal({
  match,
  onClose,
  onSave,
}: ScoreEntryModalProps) {
  if (!match) return null;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ScoreEntryFormValues>({
    resolver: zodResolver(scoreEntrySchema),
    defaultValues: { homeScore: 0, awayScore: 0 },
  });

  const homeScore = watch("homeScore");
  const awayScore = watch("awayScore");

  const onSubmit = (data: ScoreEntryFormValues) => {
    onSave(match.id, data.homeScore, data.awayScore);
  };

  return (
    <div className='absolute inset-0 z-50 flex flex-col justify-end bg-black/30 animate-fade-in'>
      {/* Backdrop click dismiss escape hatch */}
      <div className='flex-1' onClick={onClose} />

      {/* Sheet Frame Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white rounded-t-[28px] p-6 space-y-6 shadow-2xl border-t border-zinc-100 animate-slide-up flex-shrink-0 text-left'
      >
        {/* Sheet Pull Bar Top Accent */}
        <div className='w-12 h-1.5 bg-zinc-200 rounded-full mx-auto -mt-2 mb-2' />

        <div className='flex items-center gap-2 text-sm font-bold text-zinc-900'>
          <span>🎮</span> Entering Fixtures
        </div>

        {(errors.homeScore || errors.awayScore) && (
          <p className='text-[10px] text-red-500 text-center'>
            {errors.homeScore?.message || errors.awayScore?.message}
          </p>
        )}

        {/* Input Interactive Dashboard */}
        <div className='bg-zinc-50 rounded-2xl p-4 grid grid-cols-2 gap-4 border border-zinc-100'>
          {/* Home Node */}
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-sm'>
                {match.homeAvatar}
              </div>
              <span className='text-xs font-bold text-zinc-800'>
                {match.homePlayer}
              </span>
            </div>
            <button
              type='button'
              onClick={() => setValue("homeScore", homeScore + 1, { shouldValidate: true })}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500 cursor-pointer'
            >
              ▲
            </button>
            <div className='w-full bg-white border border-zinc-200 py-3 rounded-xl text-base font-black text-zinc-800 text-center shadow-inner'>
              {homeScore}
            </div>
            <button
              type='button'
              onClick={() => setValue("homeScore", Math.max(0, homeScore - 1), { shouldValidate: true })}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500 cursor-pointer'
            >
              ▼
            </button>
          </div>

          {/* Away Node */}
          <div className='flex flex-col items-center space-y-3'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-sm'>
                {match.awayAvatar}
              </div>
              <span className='text-xs font-bold text-zinc-800'>
                {match.awayPlayer}
              </span>
            </div>
            <button
              type='button'
              onClick={() => setValue("awayScore", awayScore + 1, { shouldValidate: true })}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500 cursor-pointer'
            >
              ▲
            </button>
            <div className='w-full bg-white border border-zinc-200 py-3 rounded-xl text-base font-black text-zinc-800 text-center shadow-inner'>
              {awayScore}
            </div>
            <button
              type='button'
              onClick={() => setValue("awayScore", Math.max(0, awayScore - 1), { shouldValidate: true })}
              className='w-8 h-8 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center active:scale-90 text-zinc-500 cursor-pointer'
            >
              ▼
            </button>
          </div>
        </div>

        {/* Locked Save Handle Trigger CTA */}
        <button
          type='submit'
          className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.99] shadow-md flex items-center justify-center gap-1.5 cursor-pointer'
        >
          ✓ Confirm Results
        </button>
      </form>
    </div>
  );
}
