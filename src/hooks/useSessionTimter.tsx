import { useState, useEffect } from "react";

export const useSessionTimer = () => {
  const [sessionTimer, setSessionTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = (): void => {
    setIsTimerRunning(true);
  };

  const stopTimer = (): void => {
    setIsTimerRunning(false);
  };

  const resetTimer = (): void => {
    setSessionTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    sessionTimer,
    isTimerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime,
  };
};
