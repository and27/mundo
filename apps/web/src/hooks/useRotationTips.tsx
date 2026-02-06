import { useState, useEffect } from "react";

export const useRotatingTips = (
  tips: string[],
  intervalTime: number = 8000
) => {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  useEffect(() => {
    if (tips?.length && tips.length > 0 && intervalTime > 0) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [tips, intervalTime]);
  return tips[currentTipIndex];
};
