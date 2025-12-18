"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  PARTIDO_LOGOS,
  RESPONSIVE_LOGO_CONFIG,
  ANIMATION_CONFIG,
  BREAKPOINTS,
  type PartidoLogo,
  type Breakpoint,
  type ResponsiveConfig,
} from "./LogoLoop.constants";

type AnimationState = "idle" | "animating-out" | "animating-in";

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "default";
};

const createLogoPages = (
  logos: readonly PartidoLogo[],
  perPage: number
): PartidoLogo[][] => {
  const pages: PartidoLogo[][] = [];
  for (let i = 0; i < logos.length; i += perPage) {
    pages.push(logos.slice(i, i + perPage) as PartidoLogo[]);
  }
  return pages;
};

// Custom hook for window width using useSyncExternalStore
const subscribeToResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getWindowWidth = () =>
  typeof window !== "undefined" ? window.innerWidth : 0;

const getServerWidth = () => 0;

const useWindowWidth = () => {
  return useSyncExternalStore(
    subscribeToResize,
    getWindowWidth,
    getServerWidth
  );
};

export const useLogoLoop = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationState, setAnimationState] =
    useState<AnimationState>("animating-in");

  // Use useSyncExternalStore for window width (SSR safe)
  const windowWidth = useWindowWidth();
  const breakpoint = getBreakpoint(windowWidth);
  const isClient = windowWidth > 0;

  // Track previous breakpoint to detect changes
  const prevBreakpointRef = useRef<Breakpoint>(breakpoint);

  // Get current responsive config
  const responsiveConfig: ResponsiveConfig = RESPONSIVE_LOGO_CONFIG[breakpoint];

  const logoPages = useMemo(
    () => createLogoPages(PARTIDO_LOGOS, responsiveConfig.LOGOS_PER_PAGE),
    [responsiveConfig.LOGOS_PER_PAGE]
  );

  const totalPages = logoPages.length;
  const animationOutDuration =
    responsiveConfig.LOGOS_PER_PAGE * ANIMATION_CONFIG.TRANSITION_DELAY_MS +
    300;

  const nextPage = useCallback(() => {
    setAnimationState("animating-out");

    const timeoutId = setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setAnimationState("animating-in");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("idle");
        });
      });
    }, animationOutDuration);

    return () => clearTimeout(timeoutId);
  }, [totalPages, animationOutDuration]);

  // Reset page when breakpoint changes - using ref comparison
  useEffect(() => {
    if (prevBreakpointRef.current !== breakpoint) {
      prevBreakpointRef.current = breakpoint;

      // Use requestAnimationFrame to batch state updates
      requestAnimationFrame(() => {
        setCurrentPage(0);
        setAnimationState("animating-in");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimationState("idle");
          });
        });
      });
    }
  }, [breakpoint]);

  // Initial animation
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimationState("idle");
      });
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Page rotation interval
  useEffect(() => {
    const interval = setInterval(nextPage, ANIMATION_CONFIG.PAGE_DISPLAY_MS);
    return () => clearInterval(interval);
  }, [nextPage]);

  // Safe access to current logos
  const currentLogos = logoPages[currentPage] || logoPages[0] || [];
  const isScaledDown = animationState !== "idle";

  return {
    currentPage,
    currentLogos,
    isScaledDown,
    responsiveConfig,
    animationConfig: ANIMATION_CONFIG,
    breakpoint,
    isClient,
  };
};
