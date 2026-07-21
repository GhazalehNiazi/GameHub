export type PlayMode = "1v1" | "league" | "tournament" | null;

export interface PlayState {
  currentStep: 1 | 2;
  selectedMode: PlayMode;
  setStep: (step: 1 | 2) => void;
  setMode: (mode: PlayMode) => void;
  resetPlayFlow: () => void;
}
