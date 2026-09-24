import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gameSchema, type GameFormValues } from "../schemas/authSchemas";
import type { GameSelectionStepProps } from "../types";

const FIFA_GAMES = [
  "FC 25",
  "FC 24",
  "FIFA 23",
  "FIFA 22",
  "FIFA 21",
  "FIFA 19",
  "FIFA 18",
];

export function GameSelectionStep({
  initialGame = "FC 25",
  onSubmit,
  disabled = false,
}: GameSelectionStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: { game: initialGame },
  });

  const currentGame = watch("game");

  const handleSelectGame = (g: string) => {
    setValue("game", g, { shouldValidate: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent, g: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelectGame(g);
      handleSubmit(onSubmit)();
    } else if (e.key === " ") {
      e.preventDefault();
      handleSelectGame(g);
    }
  };

  return (
    <form
      id='game-form'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 animate-fade-in text-left focus:outline-none'
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target === e.currentTarget) {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }}
      tabIndex={0}
    >
      <input type='hidden' {...register("game")} />
      <p className='text-xs text-zinc-600'>
        What was the first Fifa game you remember playing from?
      </p>

      {errors.game && (
        <p className='text-[10px] text-red-500 pl-1'>{errors.game.message}</p>
      )}

      <div className='space-y-2 max-h-[300px] overflow-y-auto pr-1' role='radiogroup'>
        {FIFA_GAMES.map((g) => {
          const isSelected = currentGame === g;
          return (
            <div
              key={g}
              role='radio'
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => !disabled && handleSelectGame(g)}
              onKeyDown={(e) => !disabled && handleKeyDown(e, g)}
              className={`flex items-center justify-between p-3 bg-white border rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                isSelected
                  ? "border-teal-500 bg-teal-50/10"
                  : "border-zinc-200/80 hover:border-zinc-300"
              } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? "border-teal-500 bg-teal-500" : "border-zinc-300"
                  }`}
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
            </div>
          );
        })}
      </div>

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
