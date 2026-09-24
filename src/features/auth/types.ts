import type {
  PhoneFormValues,
  OtpFormValues,
  ProfileFormValues,
  GameFormValues,
  PasswordFormValues,
} from "./schemas/authSchemas";

export interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export interface PhoneFormStepProps {
  initialPhone?: string;
  onSubmit: (data: PhoneFormValues) => void;
  disabled?: boolean;
}

export interface OtpVerificationStepProps {
  phone?: string;
  onSubmit: (data: OtpFormValues) => void;
  onResendOtp?: () => void | Promise<void>;
  isResending?: boolean;
  disabled?: boolean;
  timeLeft?: number;
  formattedTime?: string;
  resendSuccessMessage?: string | null;
  initialTimerSeconds?: number;
}

export interface ProfileDetailsStepProps {
  initialValues?: Partial<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => void;
  disabled?: boolean;
}

export interface GameSelectionStepProps {
  initialGame?: string;
  onSubmit: (data: GameFormValues) => void;
  disabled?: boolean;
}

export interface SecurityPasswordStepProps {
  onSubmit: (data: PasswordFormValues) => void;
  disabled?: boolean;
}

export interface RegisterState {
  step: 1 | 2 | 3;
  name: string;
  username: string;
  avatar: string;
  game: string;
  setStep: (step: 1 | 2 | 3) => void;
  updateFields: (
    fields: Partial<
      Omit<RegisterState, "setStep" | "updateFields" | "resetStore">
    >,
  ) => void;
  resetStore: () => void;
}
