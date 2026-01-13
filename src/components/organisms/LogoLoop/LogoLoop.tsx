"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { useLogoLoop } from "./useLogoLoop";
import { ANIMATION_CONFIG } from "./LogoLoop.constants";

const LogoItem = memo(function LogoItem({
  src,
  alt,
  index,
  isScaledDown,
  width,
  height,
  transitionDelay,
  isPriority,
}: {
  src: string;
  alt: string;
  index: number;
  isScaledDown: boolean;
  width: number;
  height: number;
  transitionDelay: number;
  isPriority: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width,
        height,
        transform: isScaledDown ? "scale(0)" : "scale(1)",
        transitionDelay: `${index * transitionDelay}ms`,
        transitionProperty: "transform",
        transitionDuration: "300ms",
        transitionTimingFunction: "ease-out",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        className="select-none object-contain"
        draggable={false}
        priority={isPriority}
      />
    </div>
  );
});

export const LogoLoop = memo(function LogoLoop() {
  const {
    currentPage,
    currentLogos,
    isScaledDown,
    responsiveConfig,
    isClient,
  } = useLogoLoop();
  const [isHovered, setIsHovered] = useState(false);

  const containerHeight =
    responsiveConfig.LOGO_HEIGHT + ANIMATION_CONFIG.CONTAINER_PADDING;

  // Prevent hydration mismatch by showing a placeholder on server
  if (!isClient) {
    return (
      <section
        className="relative w-full flex items-center justify-center py-4 sm:py-6"
        style={{ minHeight: containerHeight }}
        aria-label="Sección de partidos políticos"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          <div className="shrink-0 sm:pr-4 md:pr-6 lg:pr-8 z-10 text-center">
            <p className="text-[#A6A6A6] text-xs sm:text-sm md:text-base max-w-40 sm:max-w-44 md:max-w-52 lg:max-w-56 font-semibold">
              Información imparcial sobre todos los partidos
            </p>
          </div>
          <div className="flex items-center justify-center" role="list">
            {/* Placeholder for SSR */}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full flex items-center justify-center py-4 sm:py-6"
      style={{ minHeight: containerHeight }}
      aria-label="Sección de partidos políticos"
    >
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-0">
        {/* Static text section - responsive */}
        <div className="shrink-0 sm:pr-4 md:pr-6 lg:pr-8 z-10 text-center">
          <p className="text-[#A6A6A6] text-xs sm:text-sm md:text-base max-w-40 sm:max-w-44 md:max-w-52 lg:max-w-56 font-semibold">
            Información imparcial sobre todos los partidos
          </p>
        </div>

        {/* Logos container - responsive with hover effect */}
        <div
          className="flex items-center justify-center"
          style={{
            gap: responsiveConfig.GAP,
            filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 300ms ease-out",
          }}
          role="list"
          aria-live="polite"
          aria-label="Logos de partidos políticos"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {currentLogos.map((logo, index) => (
            <LogoItem
              key={`${currentPage}-${logo.src}`}
              src={logo.src}
              alt={logo.alt}
              index={index}
              isScaledDown={isScaledDown}
              width={responsiveConfig.LOGO_WIDTH}
              height={responsiveConfig.LOGO_HEIGHT}
              transitionDelay={ANIMATION_CONFIG.TRANSITION_DELAY_MS}
              isPriority={currentPage === 0 && index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
