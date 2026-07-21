import React from "react";
import { usePlayStore } from "../store/playStore";
import type { PlayMode } from "../types";
import { SelectableCard } from "@/shared/components/ui/SelectableCard";

export function ModeSelectionStep() {
  const { setMode, setStep } = usePlayStore();

  const handleModeSelect = (mode: PlayMode) => {
    setMode(mode);
    if (mode === "league") {
      setStep(2); // Proceed immediately to League Branch
    } else {
      // Placeholder warning rule or logic when UI teams deliver 1v1 / Tournament designs
      console.log(`Selected ${mode}. Step 2 views for this mode are pending.`);
    }
  };

  return (
    <div className='space-y-5 animate-fade-in text-left'>
      <p className='text-xs text-zinc-500 font-medium'>
        Select the play mode you want to play.
      </p>

      <div className='space-y-3'>
        <SelectableCard
          icon='👥'
          title='1 V 1'
          onClick={() => handleModeSelect("1v1")}
        />
        <SelectableCard
          icon='🏆'
          title='League'
          onClick={() => handleModeSelect("league")}
        />
        <SelectableCard
          icon='🌿'
          title='Tournament'
          onClick={() => handleModeSelect("tournament")}
        />
      </div>
    </div>
  );
}
