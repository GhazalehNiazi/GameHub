import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormValues } from "../schemas/authSchemas";
import type { OtpVerificationStepProps } from "../types";
import { useOtpTimer } from "../hooks/useOtpTimer";

const DEFAULT_TIMER_SECONDS = 120; // 02:00 minutes

export function OtpVerificationStep({
  phone,
  onSubmit,
  onResendOtp,
  isResending = false,
  disabled = false,
  timeLeft: externalTimeLeft,
  formattedTime: externalFormattedTime,
  resendSuccessMessage,
  initialTimerSeconds = DEFAULT_TIMER_SECONDS,
}: OtpVerificationStepProps) {
  const internalTimer = useOtpTimer(initialTimerSeconds);
  const timeLeft =
    externalTimeLeft !== undefined ? externalTimeLeft : internalTimer.timeLeft;
  const formattedTime =
    externalFormattedTime !== undefined
      ? externalFormattedTime
      : internalTimer.formattedTime;

  const [localResendSuccess, setLocalResendSuccess] = useState<string | null>(null);
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const isAutoAdvancing = useRef(false);

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: Array(5).fill("") },
  });

  const otp = watch("otp");
  const displaySuccessMessage = resendSuccessMessage || localResendSuccess;

  // Auto-focus first empty input on mount
  useEffect(() => {
    const firstEmptyIndex = otp.findIndex((d) => !d);
    const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    const timerId = setTimeout(() => {
      otpRefs.current[targetIndex]?.focus();
    }, 100);
    return () => clearTimeout(timerId);
  }, []);

  // Clear local resend success banner after 4 seconds
  useEffect(() => {
    if (!localResendSuccess) return;
    const t = setTimeout(() => setLocalResendSuccess(null), 4000);
    return () => clearTimeout(t);
  }, [localResendSuccess]);

  const handleResend = async () => {
    if (isResending || timeLeft > 0 || !onResendOtp) return;

    try {
      await onResendOtp();
      internalTimer.resetTimer();
      setLocalResendSuccess("A new code has been texted to your number.");
      reset({ otp: Array(5).fill("") });
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 50);
    } catch {
      // Handled by parent
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const clean = value.replace(/\D/g, "");
    if (!clean && value !== "") return;

    const char = clean.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setValue("otp", newOtp, { shouldValidate: true });

    if (char && index < 4) {
      isAutoAdvancing.current = true;
      otpRefs.current[index + 1]?.focus();
      setTimeout(() => {
        isAutoAdvancing.current = false;
      }, 50);
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
      return;
    }

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        isAutoAdvancing.current = true;
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setValue("otp", newOtp);
        otpRefs.current[index - 1]?.focus();
        setTimeout(() => {
          isAutoAdvancing.current = false;
        }, 50);
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setValue("otp", newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      e.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, 5).split("");
    if (digits.length === 0) return;

    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setValue("otp", newOtp, { shouldValidate: true });

    const nextIndex = Math.min(digits.length, 4);
    otpRefs.current[nextIndex]?.focus();
  };

  return (
    <form
      id='login-otp-form'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 animate-fade-in text-center w-full'
    >
      <p className='text-xs text-content text-left leading-relaxed'>
        A 5 number code has been texted to {phone ? <span className='font-medium text-content'>{phone}</span> : "your number"}, please enter it below
      </p>

      {displaySuccessMessage && (
        <div className='p-2.5 bg-success-subtle border border-success-border rounded-xl text-xs text-success-text text-center animate-fade-in'>
          {displaySuccessMessage}
        </div>
      )}

      <div className='flex justify-center gap-2 w-full'>
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              if (el) otpRefs.current[idx] = el;
            }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            autoComplete={idx === 0 ? "one-time-code" : "off"}
            disabled={disabled || isResending}
            value={digit}
            onFocus={(e) => e.target.select()}
            onChange={(e) => handleOtpChange(e.target.value, idx)}
            onKeyDown={(e) => handleOtpKeyDown(e, idx)}
            onPaste={handlePaste}
            className={`flex-1 max-w-[58px] min-w-0 h-14 bg-surface border ${
              errors.otp ? "border-danger" : "border-edge"
            } text-content text-lg font-bold rounded-xl text-center focus:outline-none focus:border-brand transition-colors disabled:opacity-50 disabled:bg-surface-subtle`}
          />
        ))}
      </div>

      {errors.otp && (
        <p className='text-[10px] text-danger text-center'>
          {errors.otp.message}
        </p>
      )}

      {timeLeft > 0 ? (
        <div className='flex items-center justify-center gap-5 text-xs text-content-secondary px-1 pt-1'>
          <span>Code Accountability</span>
          <span className='font-mono font-medium'>{formattedTime}</span>
        </div>
      ) : (
        <div className='flex items-center justify-center px-1 pt-1'>
          <button
            type='button'
            onClick={handleResend}
            disabled={isResending}
            className='text-xs font-semibold text-content-secondary hover:text-content underline underline-offset-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5'
          >
            {isResending ? (
              <>
                <span className='inline-block w-3 h-3 border-2 border-content-subtle border-t-content rounded-full animate-spin' />
                <span>Sending code...</span>
              </>
            ) : (
              <span>Send again code</span>
            )}
          </button>
        </div>
      )}

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
