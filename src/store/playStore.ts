import { create } from "zustand";

export type PlayMode = "1v1" | "league" | "tournament" | null;

interface PlayState {
  currentStep: 1 | 2;
  selectedMode: PlayMode;
  setStep: (step: 1 | 2) => void;
  setMode: (mode: PlayMode) => void;
  resetPlayFlow: () => void;
}

export const usePlayStore = create<PlayState>((set) => ({
  currentStep: 1,
  selectedMode: null,

  setStep: (step) => set({ currentStep: step }),
  setMode: (mode) => set({ selectedMode: mode }),
  resetPlayFlow: () => set({ currentStep: 1, selectedMode: null }),
}));
