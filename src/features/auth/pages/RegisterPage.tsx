import { useState } from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { StepProgressBar } from "../components/StepProgressBar";
import { ProfileDetailsStep } from "../components/ProfileDetailsStep";
import { GameSelectionStep } from "../components/GameSelectionStep";
import { SecurityPasswordStep } from "../components/SecurityPasswordStep";
import { useRegisterUser } from "@/services/hooks";
import type {
  ProfileFormValues,
  GameFormValues,
  PasswordFormValues,
} from "../schemas/authSchemas";
import backArrowIcon from "@/../public/assets/icons/back-arrow.svg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const registerMutation = useRegisterUser();

  const [profileData, setProfileData] = useState<ProfileFormValues>({
    name: "",
    username: "",
    avatar: "cat",
  });
  const [gameData, setGameData] = useState<GameFormValues>({
    game: "FC 25",
  });

  const handleProfileSubmit = (data: ProfileFormValues) => {
    setProfileData(data);
    setStep(2);
  };

  const handleGameSubmit = (data: GameFormValues) => {
    setGameData(data);
    setStep(3);
  };

  const handlePasswordSubmit = (passwordData: PasswordFormValues) => {
    registerMutation.mutate(
      {
        name: profileData.name,
        username: profileData.username,
        avatar: profileData.avatar,
        game: gameData.game,
        password: passwordData.password,
      },
      {
        onSuccess: () => navigate("/dashboard"),
      }
    );
  };

  const handleBack = () => {
    if (step === 1) navigate("/login");
    else if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const isPending = registerMutation.isPending;
  const currentFormId =
    step === 1 ? "profile-form" : step === 2 ? "game-form" : "password-form";

  const footerAction = (
    <div className='flex items-center gap-3 w-full'>
      {step > 1 && (
        <button
          type='button'
          onClick={handleBack}
          disabled={isPending}
          className='flex-1 py-3.5 border border-zinc-200 text-zinc-700 font-semibold text-sm rounded-xl active:scale-[0.99] transition-all cursor-pointer text-center disabled:opacity-50'
        >
          Previous Step
        </button>
      )}
      <button
        type='submit'
        form={currentFormId}
        disabled={isPending}
        className='py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5'
        style={{ flex: step === 1 ? "1 1 0%" : "1.3 1 0%" }}
      >
        {isPending ? "Creating..." : `Continue ${step === 2 ? "›" : ""}`}
      </button>
    </div>
  );

  return (
    <main className='page-content safe-top safe-bottom bg-white'>
      <AppScreenLayout stickyFooter={footerAction}>
        <div className='absolute top-5 left-5 h-6 w-full flex items-center mb-2 z-10'>
          <button
            type='button'
            onClick={handleBack}
            className='p-1 -ml-2 text-zinc-600 hover:text-zinc-900 active:scale-90 transition-transform cursor-pointer'
          >
            <img src={backArrowIcon} alt='Back' />
          </button>
        </div>

        <h1 className='text-lg font-bold text-zinc-900 tracking-tight text-center'>
          Creating Account
        </h1>
        <StepProgressBar currentStep={step} />

        {registerMutation.error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center'>
            {registerMutation.error.message}
          </div>
        )}

        <div className='mt-6'>
          {step === 1 && (
            <ProfileDetailsStep
              initialValues={profileData}
              onSubmit={handleProfileSubmit}
              disabled={isPending}
            />
          )}
          {step === 2 && (
            <GameSelectionStep
              initialGame={gameData.game}
              onSubmit={handleGameSubmit}
              disabled={isPending}
            />
          )}
          {step === 3 && (
            <SecurityPasswordStep
              onSubmit={handlePasswordSubmit}
              disabled={isPending}
            />
          )}
        </div>
      </AppScreenLayout>
    </main>
  );
}
