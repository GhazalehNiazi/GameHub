import type { Attendee } from "@/shared/types";

export type GameFormat = "single" | "homeAway";
export type PriorityMethod = "goalDifference" | "faceToFace";

export interface NewLeagueState {
  step: number;
  leagueName: string;
  fifaVersion: string;
  attendees: Attendee[];
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

export interface AttendeesFormInputs {
  list: Attendee[];
}

export interface SetupInputs {
  leagueName: string;
  fifaVersion: string;
}

export interface LeagueWaitingStepProps {
  onStart: () => void;
}

export interface ReviewAttendeesCardProps {
  attendees: Attendee[];
  onEdit: () => void;
}

export interface ReviewBasicsCardProps {
  leagueName: string;
  fifaVersion: string;
  onEdit: () => void;
}

export interface ReviewRulesCardProps {
  gameFormat: GameFormat;
  priorityMethod: PriorityMethod;
  onEdit: () => void;
}
