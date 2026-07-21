import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppScreenLayout } from "@/shared/components/layout/AppScreenLayout";
import { PhoneFormStep } from "../components/PhoneFormStep";
import { OtpVerificationStep } from "../components/OtpVerificationStep";
import { useSendOtp, useVerifyOtp } from "@/services/hooks";
import {
  phoneSchema,
  otpSchema,
  type PhoneFormValues,
  type OtpFormValues,
} from "../schemas/authSchemas";
import authimg from "@/../public/assets/images/auth.png";
import backArrowIcon from "@/../public/assets/icons/back-arrow.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: Array(5).fill("") },
  });

  const phoneValue = phoneForm.watch("phone");
  const otpValue = otpForm.watch("otp");

  const isPending = sendOtpMutation.isPending || verifyOtpMutation.isPending;
  const apiErrorMsg =
    sendOtpMutation.error?.message || verifyOtpMutation.error?.message || "";

  const onSendOtpSubmit = (data: PhoneFormValues) => {
    sendOtpMutation.mutate(
      { phone: data.phone },
      {
        onSuccess: () => setStep(2),
      }
    );
  };

  const onVerifyOtpSubmit = (data: OtpFormValues) => {
    verifyOtpMutation.mutate(
      { phone: phoneForm.getValues("phone"), otp: data.otp.join("") },
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

  const footerAction = (
    <button
      type='submit'
      form={step === 1 ? "login-phone-form" : "login-otp-form"}
      disabled={isPending}
      className='w-full py-3.5 bg-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white font-semibold text-sm rounded-xl transition-all duration-150 active:scale-[0.99] shadow-sm cursor-pointer text-center flex items-center justify-center gap-2'
    >
      {isPending ? (
        <span className='animate-pulse'>Processing...</span>
      ) : (
        "Continue"
      )}
    </button>
  );

  return (
    <main className='page-content safe-bottom bg-white'>
      <AppScreenLayout
        stickyFooter={footerAction}
        className='flex flex-col justify-between'
      >
        {/* Navigation Header Zone */}
        {step === 2 && (
          <div className='absolute top-5 left-5 h-6 w-full flex items-center mb-2 z-10'>
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
          {apiErrorMsg && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center'>
              {apiErrorMsg}
            </div>
          )}
          {step === 1 ? (
            <form
              id='login-phone-form'
              onSubmit={phoneForm.handleSubmit(onSendOtpSubmit)}
            >
              <PhoneFormStep
                phone={phoneValue}
                onChange={(val) =>
                  phoneForm.setValue("phone", val, { shouldValidate: true })
                }
                error={phoneForm.formState.errors.phone?.message}
              />
            </form>
          ) : (
            <form
              id='login-otp-form'
              onSubmit={otpForm.handleSubmit(onVerifyOtpSubmit)}
            >
              <OtpVerificationStep
                otp={otpValue}
                onChange={(val) =>
                  otpForm.setValue("otp", val, { shouldValidate: true })
                }
                error={otpForm.formState.errors.otp?.message}
              />
            </form>
          )}
        </div>
      </AppScreenLayout>
    </main>
  );
}
