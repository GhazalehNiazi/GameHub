import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/components/shared/AppScreenLayout";
import { PhoneFormStep } from "./components/PhoneFormStep";
import { OtpVerificationStep } from "./components/OtpVerificationStep";

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
    <main className='page-content safe-top safe-bottom bg-white'>
      <AppScreenLayout stickyFooter={footerAction}>
        {/* Navigation Header Zone */}
        <div className='h-6 w-full flex items-center mb-2'>
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className='p-1 -ml-2 text-zinc-600 hover:text-zinc-900 active:scale-90 transition-transform cursor-pointer'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </button>
          )}
        </div>

        {/* Unified Graphic Header */}
        <div className='flex flex-col items-center text-center'>
          <div className='w-full aspect-[4/3] max-h-48 bg-zinc-100 rounded-3xl overflow-hidden relative border border-zinc-100 shadow-sm'>
            <div className='absolute inset-0 bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-400 opacity-60'>
              <svg
                className='w-full h-full text-zinc-400/30'
                viewBox='0 0 100 100'
                preserveAspectRatio='none'
              >
                <path d='M0,100 C30,40 70,20 100,100 Z' fill='currentColor' />
              </svg>
            </div>
          </div>
          <h1 className='text-xl font-bold text-zinc-900 tracking-tight mt-6'>
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
