import { useNavigate } from "react-router";
import { useRegisterStore } from "@/store/registerStore";
import { AppScreenLayout } from "@/components/shared/AppScreenLayout";
import { StepProgressBar } from "./components/StepProgressBar";
import { ProfileDetailsStep } from "./components/ProfileDetailsStep";
import { GameSelectionStep } from "./components/GameSelectionStep";
import { SecurityPasswordStep } from "./components/SecurityPasswordStep";
import backArrowIcon from "@/../public/assets/icons/back-arrow.svg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { step, setStep } = useRegisterStore();

  const handleBack = () => {
    if (step === 1) navigate("/login");
    else if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  // Bind the external footer button to trigger the active step's HTML Form
  const footerAction = (
    <div className='flex items-center gap-3 w-full'>
      {step > 1 && (
        <button
          onClick={handleBack}
          className='flex-1 py-3.5 border border-zinc-200 text-zinc-700 font-semibold text-sm rounded-xl active:scale-[0.99] transition-all cursor-pointer text-center'
        >
          Previous Step
        </button>
      )}
      <button
        type='submit'
        form={`step-form-${step}`}
        className='py-3.5 bg-zinc-800 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5'
        style={{ flex: step === 1 ? "1 1 0%" : "1.3 1 0%" }}
      >
        Continue {step === 2 && "›"}
      </button>
    </div>
  );

  return (
    <main className='page-content safe-top safe-bottom bg-white'>
      <AppScreenLayout stickyFooter={footerAction}>
        <div className=' absolute top-5 left-5 h-6 w-full flex items-center mb-2 z-10'>
          <button
            onClick={handleBack}
            className='p-1 -ml-2 text-zinc-600 hover:text-zinc-900 active:scale-90 transition-transform cursor-pointer'
          >
            <img src={backArrowIcon} />
          </button>
        </div>

        <h1 className='text-lg font-bold text-zinc-900 tracking-tight text-center'>
          Creating Account
        </h1>
        <StepProgressBar currentStep={step} />

        <div className='mt-6'>
          {step === 1 && <ProfileDetailsStep />}
          {step === 2 && <GameSelectionStep />}
          {step === 3 && <SecurityPasswordStep />}
        </div>
      </AppScreenLayout>
    </main>
  );
}
