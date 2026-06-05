import { create } from "zustand";

export interface RegisterState {
  step: 1 | 2 | 3;
  name: string;
  username: string;
  avatar: string;
  game: string;
  // Form submission orchestrators
  setStep: (step: 1 | 2 | 3) => void;
  updateFields: (
    fields: Partial<
      Omit<RegisterState, "setStep" | "updateFields" | "resetStore">
    >,
  ) => void;
  resetStore: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  name: "",
  username: "",
  avatar: "cat",
  game: "FC 25",

  setStep: (step) => set({ step }),
  updateFields: (fields) => set((state) => ({ ...state, ...fields })),
  resetStore: () =>
    set({ step: 1, name: "", username: "", avatar: "cat", game: "FC 25" }),
}));
