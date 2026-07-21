import { create } from "zustand";
import type { RegisterState } from "../types";

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
