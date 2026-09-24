import React, { useEffect, useRef, useState } from "react";
import type { OtpVerificationStepProps } from "../types";

const DEFAULT_TIMER_SECONDS = 120; // 02:00 minutes

export function OtpVerificationStep({
  otp,
  onChange,
  onBlur,
  onResendOtp,
  isResending = false,
  disabled = false,
  error,
  phone,
  initialTimerSeconds = DEFAULT_TIMER_SECONDS,
}: OtpVerificationStepProps) {
  const [targetTime, setTargetTime] = useState<number>(() => Date.now() + initialTimerSeconds * 1000);
  const [timeLeft, setTimeLeft] = useState<number>(initialTimerSeconds);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const otpRefs = useRef<HTMLInputElement[]>([]);
  const isAutoAdvancing = useRef(false);

  // Auto-focus first empty input on mount
  useEffect(() => {
    const firstEmptyIndex = otp.findIndex((d) => !d);
    const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    const timerId = setTimeout(() => {
      otpRefs.current[targetIndex]?.focus();
    }, 100);
    return () => clearTimeout(timerId);
  }, []);

  // Real-time drift protected countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, timeLeft]);

  // Clear resend success alert after 4 seconds
  useEffect(() => {
    if (!resendSuccess) return;
    const t = setTimeout(() => setResendSuccess(null), 4000);
    return () => clearTimeout(t);
  }, [resendSuccess]);

  const resetTimer = () => {
    const newTarget = Date.now() + initialTimerSeconds * 1000;
    setTargetTime(newTarget);
    setTimeLeft(initialTimerSeconds);
  };

  const handleResend = async () => {
    if (isResending || timeLeft > 0 || !onResendOtp) return;

    try {
      await onResendOtp();
      resetTimer();
      setResendSuccess("A new code has been texted to your number.");
      // Clear OTP inputs and focus the first box
      onChange(Array(5).fill(""));
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 50);
    } catch {
      // Error handled by parent component error state
    }
  };

  const formatTimer = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only accept numeric digits
    const clean = value.replace(/\D/g, "");
    if (!clean && value !== "") return;

    const char = clean.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    onChange(newOtp);

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
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        isAutoAdvancing.current = true;
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        onChange(newOtp);
        otpRefs.current[index - 1]?.focus();
        setTimeout(() => {
          isAutoAdvancing.current = false;
        }, 50);
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        onChange(newOtp);
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
    onChange(newOtp);

    const nextIndex = Math.min(digits.length, 4);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isAutoAdvancing.current) return;
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    onBlur?.();
  };

  return (
    <div className='space-y-5 animate-fade-in text-center w-full'>
      <p className='text-xs text-[#212121] text-left leading-relaxed'>
        A 5 number code has been texted to {phone ? <span className='font-medium text-zinc-900'>{phone}</span> : "your number"}, please enter it below
      </p>

      {resendSuccess && (
        <div className='p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 text-center animate-fade-in'>
          {resendSuccess}
        </div>
      )}

      <div
        className='flex justify-center gap-2 w-full'
        onBlur={handleBlur}
      >
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
            className={`flex-1 max-w-[58px] min-w-0 h-14 bg-white border ${
              error ? "border-red-500" : "border-[#E0E0E0]"
            } text-zinc-900 text-lg font-bold rounded-xl text-center focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-50 disabled:bg-zinc-50`}
          />
        ))}
      </div>

      {error && <p className='text-[10px] text-red-500 text-center'>{error}</p>}

      {timeLeft > 0 ? (
        <div className='flex items-center justify-center gap-5 text-xs text-zinc-800 px-1 pt-1'>
          <span>Code Accountability</span>
          <span className='font-mono font-medium'>{formatTimer()}</span>
        </div>
      ) : (
        <div className='flex items-center justify-center px-1 pt-1'>
          <button
            type='button'
            onClick={handleResend}
            disabled={isResending}
            className='text-xs font-semibold text-zinc-800 hover:text-zinc-950 underline underline-offset-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5'
          >
            {isResending ? (
              <>
                <span className='inline-block w-3 h-3 border-2 border-zinc-400 border-t-zinc-800 rounded-full animate-spin' />
                <span>Sending code...</span>
              </>
            ) : (
              <span>Send again code</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
