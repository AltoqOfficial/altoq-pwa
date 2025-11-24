"use client";

import { useEffect, useState } from "react";

import { Typography } from "@/components/atoms/Typography";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/**
 * CountdownTimer Component (Molecule)
 * Displays a countdown timer to a target date
 * Optimized to avoid setState in useEffect warning
 */
export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  // Initialize state with lazy initializer to avoid hydration issues
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    // Return zero values during SSR
    if (typeof window === "undefined") {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    // Calculate actual time only on client
    return calculateTimeLeft(targetDate);
  });

  useEffect(() => {
    // ✅ Don't call setState immediately - just set up the interval
    // The interval callback will handle updates
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className="flex items-center justify-center gap-4 md:gap-8"
      role="timer"
      aria-live="polite"
    >
      <TimeUnit label="Días" value={timeLeft.days} />
      <TimeUnit label="Horas" value={timeLeft.hours} />
      <TimeUnit label="Minutos" value={timeLeft.minutes} />
      <TimeUnit label="Segundos" value={timeLeft.seconds} />
    </div>
  );
}

interface TimeUnitProps {
  label: string;
  value: number;
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center" suppressHydrationWarning>
      <Typography
        variant="h2"
        weight="bold"
        className="text-primary-600 tabular-nums"
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography
        variant="small"
        className="text-neutral-600 uppercase tracking-wider"
      >
        {label}
      </Typography>
    </div>
  );
}
