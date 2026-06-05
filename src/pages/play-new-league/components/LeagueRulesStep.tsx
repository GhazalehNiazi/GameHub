import React from "react";
import {
  useNewLeagueStore,
  GameFormat,
  PriorityMethod,
} from "@/store/newLeagueStore";
import { GridOptionCard } from "@/components/ui/GridOptionCard";

export function LeagueRulesStep() {
  const { gameFormat, priorityMethod, updateFields, setStep } =
    useNewLeagueStore();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Transition forward smoothly to the League Review Summary screen
  };

  return (
    <form
      id='new-league-form-3'
      onSubmit={onSubmit}
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
            isSelected={gameFormat === "single"}
            onClick={() => updateFields({ gameFormat: "single" })}
          />
          <GridOptionCard
            icon={<span>🔄</span>}
            title='Home And Away'
            isSelected={gameFormat === "homeAway"}
            onClick={() => updateFields({ gameFormat: "homeAway" })}
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
            isSelected={priorityMethod === "goalDifference"}
            onClick={() => updateFields({ priorityMethod: "goalDifference" })}
          />
          <GridOptionCard
            icon={<span>⊜</span>}
            title='Face To Face Games'
            isSelected={priorityMethod === "faceToFace"}
            onClick={() => updateFields({ priorityMethod: "faceToFace" })}
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
