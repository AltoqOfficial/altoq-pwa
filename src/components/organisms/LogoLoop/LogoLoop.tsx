"use client";

import { memo } from "react";
import Image from "next/image";
import { useLogoLoop } from "./useLogoLoop";

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
      className="relative flex items-center justify-center transition-transform duration-300 ease-out"
      style={{
        width,
        height,
        transform: isScaledDown ? "scale(0)" : "scale(1)",
        transitionDelay: `${index * transitionDelay}ms`,
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
  const { currentPage, currentLogos, isScaledDown, config } = useLogoLoop();

  const containerHeight = config.LOGO_HEIGHT + config.CONTAINER_PADDING;

  return (
    <section
      className="relative w-full flex items-center justify-center py-6"
      style={{ minHeight: containerHeight }}
      aria-label="Sección de partidos políticos"
    >
      <div className="flex items-center justify-center">
        <div className="shrink-0 pr-8 z-10 text-center">
          <p className="text-[#A6A6A6] max-w-56 font-semibold">
            Información imparcial sobre todos los partidos
          </p>
        </div>

        <div
          className="flex items-center justify-center gap-24"
          role="list"
          aria-live="polite"
          aria-label="Logos de partidos políticos"
        >
          {currentLogos.map((logo, index) => (
            <LogoItem
              key={`${currentPage}-${logo.src}`}
              src={logo.src}
              alt={logo.alt}
              index={index}
              isScaledDown={isScaledDown}
              width={config.LOGO_WIDTH}
              height={config.LOGO_HEIGHT}
              transitionDelay={config.TRANSITION_DELAY_MS}
              isPriority={currentPage === 0 && index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
