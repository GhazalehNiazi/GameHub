import React from "react";
import { useRegisterStore } from "../store/registerStore";

const FIFA_GAMES = [
  "FC 25",
  "FC 24",
  "FIFA 23",
  "FIFA 22",
  "FIFA 21",
  "FIFA 19",
  "FIFA 18",
];

export function GameSelectionStep() {
  const { game, updateFields, setStep } = useRegisterStore();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <form
      id='step-form-2'
      onSubmit={handleNext}
      className='space-y-4 animate-fade-in text-left'
    >
      <p className='text-xs text-zinc-600'>
        What was the first Fifa game you remember playing from?
      </p>

      <div className='space-y-2 max-h-[300px] overflow-y-auto pr-1'>
        {FIFA_GAMES.map((g) => {
          const isSelected = game === g;
          return (
            <label
              key={g}
              onClick={() => updateFields({ game: g })}
              className={`flex items-center justify-between p-3 bg-white border rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? "border-teal-500 bg-teal-50/10"
                  : "border-zinc-200/80"
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-teal-500 bg-teal-500" : "border-zinc-300"}`}
                >
                  {isSelected && (
                    <div className='w-1.5 h-1.5 rounded-full bg-white' />
                  )}
                </div>
                <span className='text-xs font-semibold text-zinc-800'>{g}</span>
              </div>
              <span className='text-[10px] font-black italic opacity-40 uppercase bg-zinc-100 px-1.5 py-0.5 rounded border'>
                {g.startsWith("FC") ? "EA FC" : "FIFA"}
              </span>
            </label>
          );
        })}
      </div>
    </form>
  );
}
