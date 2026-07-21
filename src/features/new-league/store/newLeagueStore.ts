import { create } from "zustand";
import type { GameFormat, PriorityMethod, NewLeagueState } from "../types";
export type { GameFormat, PriorityMethod };

export const useNewLeagueStore = create<NewLeagueState>((set) => ({
  step: 1,
  leagueName: "",
  fifaVersion: "",
  attendees: [{ id: "" }, { id: "" }, { id: "" }],
  gameFormat: "single", // Default selection matching UI highlights
  priorityMethod: "goalDifference",

  setStep: (step) => set({ step }),
  updateFields: (fields) => set((state) => ({ ...state, ...fields })),
  resetStore: () =>
    set({
      step: 1,
      leagueName: "",
      fifaVersion: "",
      attendees: [{ id: "" }, { id: "" }, { id: "" }],
      gameFormat: "single",
      priorityMethod: "goalDifference",
    }),
}));
