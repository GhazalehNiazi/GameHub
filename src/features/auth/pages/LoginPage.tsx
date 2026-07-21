import { useState } from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { PhoneFormStep } from "../components/PhoneFormStep";
import { OtpVerificationStep } from "../components/OtpVerificationStep";
import authimg from "@/../public/assets/images/auth.png";
import backArrowIcon from "@/../public/assets/icons/back-arrow.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));

  const isExistingUser = phone === "000" || phone.slice(-3) === "000";
  const isOtpComplete = otp.join("").length === 5;

  const handleContinue = () => {
    if (step === 1) {
      if (phone.trim()) setStep(2);
    } else {
      if (isOtpComplete) {
        navigate(isExistingUser ? "/dashboard" : "/register");
      }
    }
  };

  const footerAction = (
    <button
      onClick={handleContinue}
      disabled={step === 1 ? !phone : !isOtpComplete}
      className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center'
    >
      Continue
    </button>
  );

  return (
    <main className='page-content  safe-bottom bg-white'>
      <AppScreenLayout
        stickyFooter={footerAction}
        className='flex flex-col justify-between'
      >
        {/* Navigation Header Zone */}
        {step === 2 && (
          <div className=' absolute top-5 left-5 h-6 w-full flex items-center mb-2 z-10'>
            <button
              onClick={() => setStep(1)}
              className='p-1 -ml-2 text-zinc-600 hover:text-zinc-900 active:scale-90 transition-transform cursor-pointer'
            >
              <img src={backArrowIcon} />
            </button>
          </div>
        )}

        {/* Unified Graphic Header */}
        <div className='flex flex-col items-center justify-end text-center '>
          <div className='absolute top-0 left-0 w-full h-[360px] max-h-[360px] rounded-[32px] '>
            <img src={authimg} className='h-[360px] max-h-[360px] w-full ' />
          </div>
          <h1 className='text-xl font-bold text-zinc-900 tracking-tight mt-[380px]'>
            Welcome
          </h1>
        </div>

        {/* Render Step Views */}
        <div className='mt-12'>
          {step === 1 ? (
            <PhoneFormStep phone={phone} onChange={setPhone} prefix='' />
          ) : (
            <OtpVerificationStep otp={otp} onChange={setOtp} />
          )}
        </div>
      </AppScreenLayout>
    </main>
  );
}
