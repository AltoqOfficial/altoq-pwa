"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Easing function: Exponential ease-out for a premium feel
export const easingExp = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const SmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      // CONFIGURATION: Adjust this value to change the "intertia"
      // 1.2 = Very smooth (presentation style)
      // 0.5 = Fast and subtle (App-like feel, similar to Antigravity)
      duration: 0.5,
      easing: easingExp,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      // @ts-expect-error: smoothTouch is missing in types but supported in core
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Validated technique: Expose Lenis to window for global control
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    let animationFrameId: number;

    // Optimized animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    // Cleanup function to prevent memory leaks and zombie loops
    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
};
