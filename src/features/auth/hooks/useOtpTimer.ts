import { useState, useEffect, useCallback, useMemo } from "react";

export interface UseOtpTimerReturn {
  timeLeft: number;
  formattedTime: string;
  isExpired: boolean;
  resetTimer: () => void;
}

/**
 * Resilient OTP countdown timer hook.
 * Uses target timestamp comparison to prevent clock drift on mobile backgrounding.
 */
export function useOtpTimer(initialSeconds: number = 120): UseOtpTimerReturn {
  const [targetTime, setTargetTime] = useState<number>(() => Date.now() + initialSeconds * 1000);
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, timeLeft]);

  const resetTimer = useCallback(() => {
    setTargetTime(Date.now() + initialSeconds * 1000);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  return {
    timeLeft,
    formattedTime,
    isExpired: timeLeft <= 0,
    resetTimer,
  };
}
