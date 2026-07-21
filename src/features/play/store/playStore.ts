import { create } from "zustand";
import type { PlayMode, PlayState } from "../types";
export type { PlayMode };

export const usePlayStore = create<PlayState>((set) => ({
  currentStep: 1,
  selectedMode: null,

  setStep: (step) => set({ currentStep: step }),
  setMode: (mode) => set({ selectedMode: mode }),
  resetPlayFlow: () => set({ currentStep: 1, selectedMode: null }),
}));
