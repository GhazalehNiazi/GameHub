import { create } from "zustand";

export type GameFormat = "single" | "homeAway";
export type PriorityMethod = "goalDifference" | "faceToFace";

interface NewLeagueState {
  step: number;
  leagueName: string;
  fifaVersion: string;
  attendees: { id: string; resolvedName?: string; avatar?: string }[];
  gameFormat: GameFormat;
  priorityMethod: PriorityMethod;
  setStep: (step: number) => void;
  updateFields: (
    fields: Partial<
      Omit<NewLeagueState, "setStep" | "updateFields" | "resetStore">
    >,
  ) => void;
  resetStore: () => void;
}

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
