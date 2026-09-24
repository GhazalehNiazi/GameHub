import { useState } from "react";
import { useNavigate } from "react-router";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { PhoneFormStep } from "../components/PhoneFormStep";
import { OtpVerificationStep } from "../components/OtpVerificationStep";
import { useSendOtp, useVerifyOtp } from "@/services/hooks";
import { useOtpTimer } from "../hooks/useOtpTimer";
import type { PhoneFormValues, OtpFormValues } from "../schemas/authSchemas";
import authimg from "@/../public/assets/images/auth.png";
import backArrowIcon from "@/../public/assets/icons/back-arrow.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const timer = useOtpTimer(120);

  const isPending = sendOtpMutation.isPending || verifyOtpMutation.isPending;
  const apiErrorMsg =
    sendOtpMutation.error?.message || verifyOtpMutation.error?.message || "";

  const onSendPhone = (data: PhoneFormValues) => {
    sendOtpMutation.mutate(
      { phone: data.phone },
      {
        onSuccess: () => {
          setPhone(data.phone);
          setStep(2);
          timer.resetTimer();
        },
      }
    );
  };

  const onVerifyOtp = (data: OtpFormValues) => {
    verifyOtpMutation.mutate(
      { phone, otp: data.otp.join("") },
      {
        onSuccess: (res) => {
          if (res.data.isExistingUser) {
            navigate("/dashboard");
          } else {
            navigate("/register");
          }
        },
      }
    );
  };

  const onResendOtp = () => {
    if (sendOtpMutation.isPending || !timer.isExpired) return;

    sendOtpMutation.reset();
    verifyOtpMutation.reset();

    sendOtpMutation.mutate(
      { phone },
      {
        onSuccess: () => {
          timer.resetTimer();
          setResendSuccess("A new code has been texted to your number.");
        },
      }
    );
  };

  const handleBack = () => {
    if (step === 2) {
      sendOtpMutation.reset();
      verifyOtpMutation.reset();
      setStep(1);
    } else {
      navigate("/");
    }
  };

  const currentFormId = step === 1 ? "login-phone-form" : "login-otp-form";

  const footerAction = (
    <button
      type='submit'
      form={currentFormId}
      disabled={isPending}
      className='w-full py-3.5 bg-action-primary hover:bg-action-primary-hover disabled:opacity-40 disabled:hover:bg-action-primary text-action-primary-fg font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-2'
    >
      {isPending ? (
        <span className='animate-pulse'>Processing...</span>
      ) : (
        "Continue"
      )}
    </button>
  );

  return (
    <main className='page-content safe-bottom bg-surface'>
      <AppScreenLayout
        stickyFooter={footerAction}
        className='flex flex-col justify-between'
      >
        {step === 2 && (
          <div className='absolute top-5 left-5 h-6 w-full flex items-center mb-2 z-10'>
            <button
              type='button'
              onClick={handleBack}
              className='p-1 -ml-2 text-content-secondary hover:text-content active:scale-90 transition-transform cursor-pointer'
            >
              <img src={backArrowIcon} alt='Back' />
            </button>
          </div>
        )}

        <div className='flex flex-col items-center justify-end text-center'>
          <div className='absolute top-0 left-0 w-full h-[360px] max-h-[360px] rounded-[32px]'>
            <img src={authimg} alt='Auth visual' className='h-[360px] max-h-[360px] w-full' />
          </div>
          <h1 className='text-xl font-bold text-content tracking-tight mt-[380px]'>
            {step === 1 ? "Welcome" : "Signing Up"}
          </h1>
        </div>

        <div className='mt-12'>
          {apiErrorMsg && (
            <div className='mb-4 p-3 bg-danger-subtle border border-danger-border rounded-xl text-xs text-danger-text font-medium text-center'>
              {apiErrorMsg}
            </div>
          )}

          {step === 1 ? (
            <PhoneFormStep
              initialPhone={phone}
              onSubmit={onSendPhone}
              disabled={isPending}
            />
          ) : (
            <OtpVerificationStep
              phone={phone}
              onSubmit={onVerifyOtp}
              onResendOtp={onResendOtp}
              isResending={sendOtpMutation.isPending}
              disabled={isPending}
              timeLeft={timer.timeLeft}
              formattedTime={timer.formattedTime}
              resendSuccessMessage={resendSuccess}
            />
          )}
        </div>
      </AppScreenLayout>
    </main>
  );
}
