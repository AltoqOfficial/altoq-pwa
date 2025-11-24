import { useEffect, useState } from "react";

import { getCountdown, type Countdown } from "@/lib/utils";

/**
 * Custom hook for countdown timer
 * Updates every second until target date is reached
 */
export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = getCountdown(targetDate);
      setCountdown(newCountdown);

      // Clear interval when countdown reaches zero
      if (newCountdown.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
