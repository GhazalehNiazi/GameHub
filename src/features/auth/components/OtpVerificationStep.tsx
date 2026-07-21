import React, { useEffect, useRef, useState } from "react";
import type { OtpVerificationStepProps } from "../types";

export function OtpVerificationStep({
  otp,
  onChange,
  error,
}: OtpVerificationStepProps) {
  const [timer, setTimer] = useState(120); // 02:00 minutes
  const otpRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    onChange(newOtp);

    if (value && index < 4) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='space-y-5 animate-fade-in text-center w-full'>
      <p className='text-xs text-zinc-600 text-left leading-relaxed'>
        A 5 number code has been texted to your number, please enter it below
      </p>

      <div className='flex justify-between gap-2 max-w-[320px] w-full '>
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
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, idx)}
            onKeyDown={(e) => handleOtpKeyDown(e, idx)}
            className={`flex-1 min-w-0 h-14 bg-white border ${
              error ? "border-red-500" : "border-zinc-400"
            } text-zinc-900 text-lg font-bold rounded-xl text-center focus:outline-none focus:border-zinc-900 transition-colors`}
          />
        ))}
      </div>

      {error && <p className='text-[10px] text-red-500 text-center'>{error}</p>}

      <div className='flex items-center justify-center gap-5 text-xs text-zinc-800  px-1 pt-1'>
        <span>Code Accountability</span>
        <span className=' '>{formatTimer()}</span>
      </div>
    </div>
  );
}
