import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { GridOptionCard } from "@/shared/components/ui/GridOptionCard";
import {
  SyncArrowsIcon,
  MathPriorityIcon,
} from "@/shared/components/icons/LeagueIcons";
import {
  leagueRulesSchema,
  type LeagueRulesFormValues,
} from "../schemas/leagueSchemas";

export function LeagueRulesStep() {
  const { gameFormat, priorityMethod, updateFields, setStep } =
    useNewLeagueStore();

  const { handleSubmit, setValue, watch } = useForm<LeagueRulesFormValues>({
    resolver: zodResolver(leagueRulesSchema),
    defaultValues: { gameFormat, priorityMethod },
  });

  const currentGameFormat = watch("gameFormat");
  const currentPriorityMethod = watch("priorityMethod");

  const onSubmit = (data: LeagueRulesFormValues) => {
    updateFields(data);
    setStep(4);
  };

  const setFormat = (fmt: "single" | "homeAway") => {
    setValue("gameFormat", fmt);
    updateFields({ gameFormat: fmt });
  };

  const setPriority = (prio: "goalDifference" | "faceToFace") => {
    setValue("priorityMethod", prio);
    updateFields({ priorityMethod: prio });
  };

  return (
    <form
      id='new-league-form-3'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 animate-fade-in text-left'
    >
      {/* Parameter Block 1: Format */}
      <div className='space-y-3'>
        <h4 className='text-xs font-semibold text-content-secondary'>
          Are there Single games or Home & Away?
        </h4>
        <div className='flex gap-3 w-full'>
          <GridOptionCard
            icon={
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round'>
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            }
            title='Single Game'
            isSelected={currentGameFormat === "single"}
            onClick={() => setFormat("single")}
          />
          <GridOptionCard
            icon={<SyncArrowsIcon className='w-4 h-4' />}
            title='Home and Away'
            isSelected={currentGameFormat === "homeAway"}
            onClick={() => setFormat("homeAway")}
          />
        </div>
      </div>

      {/* Parameter Block 2: Tie-Breaker Priorities */}
      <div className='space-y-3'>
        <h4 className='text-xs font-semibold text-content-secondary'>
          What is the priority of the champions?
        </h4>
        <div className='flex gap-3 w-full'>
          <GridOptionCard
            icon={<MathPriorityIcon className='w-4 h-4' />}
            title='Goal Difference'
            isSelected={currentPriorityMethod === "goalDifference"}
            onClick={() => setPriority("goalDifference")}
          />
          <GridOptionCard
            icon={
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5' />
              </svg>
            }
            title='Face To Face Games'
            isSelected={currentPriorityMethod === "faceToFace"}
            onClick={() => setPriority("faceToFace")}
          />
        </div>
      </div>

      {/* Descriptive Disclaimer Box */}
      <div className='flex items-start gap-3.5 p-4 bg-surface-subtle border border-edge-subtle rounded-2xl'>
        <span className='text-content-subtle text-base leading-none mt-0.5'>ℹ️</span>
        <p className='text-[11px] text-content-muted leading-relaxed font-medium'>
          If everything gets tied in the champions method, most goals for, least
          against goals, goals for in away games, goals against in away games
          will be considered to determine the champion.
        </p>
      </div>
    </form>
  );
}
