"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTextProps {
  words: string[];
  className?: string;
  changeDelay?: number;
  restartDelay?: number;
  hoverCycles?: number;
}

/**
 * AnimatedText Component (Atom)
 * Cycles through an array of words with smooth vertical slide animation
 * Plays once on mount, then activates on hover
 *
 * @param words - Array of words to cycle through
 * @param className - Additional CSS classes
 * @param changeDelay - Delay between word changes in ms (default: 2000)
 * @param restartDelay - Delay before restarting the cycle in ms (default: 3000)
 * @param hoverCycles - Number of complete cycles to run on hover (default: 2)
 */
export function AnimatedText({
  words,
  className,
  changeDelay = 2000,
  restartDelay = 3000,
  hoverCycles = 2,
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isActive, setIsActive] = useState(true); // Start active for initial animation
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);
  const cycleCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!isActive) return;

    const isLastWord = currentIndex === words.length - 1;
    const delay = isLastWord ? restartDelay : changeDelay;

    timerRef.current = setTimeout(() => {
      setIsAnimating(true);

      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setIsAnimating(false);

        // Check if we completed a full cycle
        if (nextIndex === 0) {
          cycleCountRef.current += 1;

          // Stop after initial play or after hover cycles
          if (!hasPlayedInitial) {
            setHasPlayedInitial(true);
            setIsActive(false);
            cycleCountRef.current = 0;
          } else if (cycleCountRef.current >= hoverCycles) {
            setIsActive(false);
            cycleCountRef.current = 0;
          }
        }
      }, 300); // Animation duration
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    currentIndex,
    words.length,
    changeDelay,
    restartDelay,
    isActive,
    hasPlayedInitial,
    hoverCycles,
  ]);

  const handleMouseEnter = () => {
    if (hasPlayedInitial && !isActive) {
      setIsActive(true);
      cycleCountRef.current = 0;
    }
  };

  return (
    <div
      className="relative inline-grid overflow-hidden text-right"
      onMouseEnter={handleMouseEnter}
    >
      {/* Hidden words to reserve horizontal space for the longest word */}
      {words.map((word, index) => (
        <span
          key={index}
          className={cn("invisible col-start-1 row-start-1", className)}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}

      {/* Visible animated word */}
      <span
        className={cn(
          "col-start-1 row-start-1 inline-block transition-all duration-300 ease-in-out",
          isAnimating
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
          className
        )}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
}
