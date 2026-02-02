"use client";

import { memo, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import { cn } from "@/lib/utils";

// ==================== Constants ====================

const NOISE_FILTER_ID = "authNoiseFilter";
const NOISE_TABLE_VALUES =
  "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";

// Quotes data
const QUOTES = [
  {
    quote: "No se puede amar lo que no se conoce",
    author: "José María Arguedas",
    message: "Conoce antes de decidir.",
  },
  {
    quote:
      "La libertad de opinión es una farsa si no se garantiza la información",
    author: "Hannah Arendt",
    message: "Aquí empieza la información.",
  },
  {
    quote: "Votar a ciegas también es una decisión",
    author: "",
    message: "Hazlo con información.",
  },
  {
    quote: "Cuando el pueblo es ignorante, la libertad es una palabra vacía",
    author: "González Prada",
    message: "Llénala de información.",
  },
  {
    quote: "Hay, hermanos, muchísimo que hacer",
    author: "César Vallejo",
    message: "Informarse es un buen comienzo.",
  },
];

// ==================== Components ====================

/**
 * Componente de cita animada
 * Uses fixed min-height to prevent layout shift when quotes change
 */
export const AnimatedQuote = memo(function AnimatedQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Change quote every 5 seconds
    timerRef.current = setTimeout(() => {
      setIsAnimating(true);

      // After fade out, change the quote
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
        setIsAnimating(false);
      }, 400); // Fade out duration
    }, 5000); // Display duration

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const currentQuote = QUOTES[currentIndex];

  return (
    <header className="text-center max-w-[90%] md:max-w-[80%] lg:max-w-none min-h-[140px] md:min-h-[160px] lg:min-h-[180px] flex flex-col justify-center items-center">
      {/* Quote text */}
      <Typography
        font="bigShoulders"
        variant="h2"
        color="white"
        align="center"
        className={cn(
          "text-xl md:text-3xl lg:text-4xl transition-all duration-400 ease-in-out",
          isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        &quot;{currentQuote.quote.toUpperCase()}.&quot;
      </Typography>

      {/* Author */}
      <Typography
        font="bilbo"
        variant="h3"
        color="white"
        align="right"
        className={cn(
          "text-lg md:text-2xl lg:text-3xl transition-all duration-400 ease-in-out delay-75 w-full",
          isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          !currentQuote.author && "invisible"
        )}
      >
        {currentQuote.author || "—"}
      </Typography>

      {/* Message badge */}
      <span
        className={cn(
          "border border-[#FEFEFE80] text-sm md:text-lg lg:text-xl font-flexo-bold text-[#FEFEFE] px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg inline-block mt-2",
          "transition-all duration-400 ease-in-out delay-150",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        {currentQuote.message}
      </span>
    </header>
  );
});

/**
 * Componente SVG de ruido para el fondo
 */
export const NoiseBackground = memo(function NoiseBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-1 pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ isolation: "isolate" }}
    >
      <defs>
        <filter
          id={NOISE_FILTER_ID}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1 1.1"
            numOctaves={3}
            result="noise"
            seed={4224}
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues={NOISE_TABLE_VALUES} />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood
            floodColor="rgba(255, 255, 255, 0.25)"
            result="color1Flood"
          />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="#FF2727"
        filter={`url(#${NOISE_FILTER_ID})`}
      />
    </svg>
  );
});

/**
 * Componente de imágenes de candidatos para el fondo
 */
export const CandidatesBackground = memo(function CandidatesBackground() {
  const sharedClasses =
    "absolute bottom-0 z-2 object-contain w-auto select-none pointer-events-none hidden md:block md:max-h-[50vh] lg:max-h-[90vh]";

  return (
    <>
      <Image
        src="/auth/vs-left.webp"
        alt=""
        width={400}
        height={800}
        className={`left-0 ${sharedClasses}`}
        priority
        aria-hidden="true"
      />
      <Image
        src="/auth/vs-right.webp"
        alt=""
        width={400}
        height={800}
        className={`right-0 ${sharedClasses}`}
        priority
        aria-hidden="true"
      />
    </>
  );
});

/**
 * Degradado de fondo
 */
export const GradientOverlay = memo(function GradientOverlay() {
  return (
    <div
      className="absolute inset-0 z-5 pointer-events-none"
      style={{
        background: "linear-gradient(to top, #0E0E0E 0%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
});
