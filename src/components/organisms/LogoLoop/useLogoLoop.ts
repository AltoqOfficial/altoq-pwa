"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  PARTIDO_LOGOS,
  LOGO_CONFIG,
  type PartidoLogo,
} from "./LogoLoop.constants";

type AnimationState = "idle" | "animating-out" | "animating-in";

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

export const useLogoLoop = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationState, setAnimationState] =
    useState<AnimationState>("animating-in");

  const logoPages = useMemo(
    () => createLogoPages(PARTIDO_LOGOS, LOGO_CONFIG.LOGOS_PER_PAGE),
    []
  );

  const totalPages = logoPages.length;
  const animationOutDuration =
    LOGO_CONFIG.LOGOS_PER_PAGE * LOGO_CONFIG.TRANSITION_DELAY_MS + 300;

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
    const interval = setInterval(nextPage, LOGO_CONFIG.PAGE_DISPLAY_MS);
    return () => clearInterval(interval);
  }, [nextPage]);

  const currentLogos = logoPages[currentPage];
  const isScaledDown = animationState !== "idle";

  return {
    currentPage,
    currentLogos,
    isScaledDown,
    config: LOGO_CONFIG,
  };
};
