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

export interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export interface PhoneFormStepProps {
  phone: string;
  onChange: (value: string) => void;
  prefix?: string;
}

export interface OtpVerificationStepProps {
  otp: string[];
  onChange: (otp: string[]) => void;
}

export interface ProfileFormInputs {
  name: string;
  username: string;
}

export interface SecurityPasswordInputs {
  password: "";
  confirmPassword: "";
}
