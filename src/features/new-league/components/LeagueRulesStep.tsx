import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { GridOptionCard } from "@/shared/components/ui/GridOptionCard";
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
        <h4 className='text-xs font-semibold text-zinc-700'>
          Are there Single games or Home & Away?
        </h4>
        <div className='flex gap-3 w-full'>
          <GridOptionCard
            icon={<span>↪</span>}
            title='Single Game'
            isSelected={currentGameFormat === "single"}
            onClick={() => setFormat("single")}
          />
          <GridOptionCard
            icon={<span>🔄</span>}
            title='Home And Away'
            isSelected={currentGameFormat === "homeAway"}
            onClick={() => setFormat("homeAway")}
          />
        </div>
      </div>

      {/* Parameter Block 2: Tie-Breaker Priorities */}
      <div className='space-y-3'>
        <h4 className='text-xs font-semibold text-zinc-700'>
          What is the priority of the champions?
        </h4>
        <div className='flex gap-3 w-full'>
          <GridOptionCard
            icon={<span>⁜</span>}
            title='Goal Difference'
            isSelected={currentPriorityMethod === "goalDifference"}
            onClick={() => setPriority("goalDifference")}
          />
          <GridOptionCard
            icon={<span>⊜</span>}
            title='Face To Face Games'
            isSelected={currentPriorityMethod === "faceToFace"}
            onClick={() => setPriority("faceToFace")}
          />
        </div>
      </div>

      {/* Descriptive Disclaimer Box matching copy criteria exactly */}
      <div className='flex items-start gap-3.5 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl'>
        <span className='text-zinc-400 text-lg leading-none mt-0.5'>ℹ️</span>
        <p className='text-[11px] text-zinc-500 leading-relaxed font-medium'>
          If everything gets tied in the champions method, most goals for, least
          against goals, goals for in away games, goals against in away games
          will be considered to determine the champion.
        </p>
      </div>
    </form>
  );
}
