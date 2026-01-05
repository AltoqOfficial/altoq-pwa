"use client";

import { memo, ReactNode } from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms";

// Constantes de configuración
const NOISE_FILTER_ID = "authNoiseFilter";
const NOISE_TABLE_VALUES =
  "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";

/**
 * Componente SVG de ruido para el fondo
 */
const NoiseBackground = memo(function NoiseBackground() {
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
const CandidatesBackground = memo(function CandidatesBackground() {
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
const GradientOverlay = memo(function GradientOverlay() {
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

interface ForgotPasswordLayoutProps {
  children: ReactNode;
}

/**
 * ForgotPasswordLayout Component
 *
 * Layout para la página de recuperación de contraseña.
 * Incluye el fondo con ruido, imágenes de candidatos y degradado.
 *
 * @example
 * ```tsx
 * <ForgotPasswordLayout>
 *   <ForgotPasswordForm />
 * </ForgotPasswordLayout>
 * ```
 */
export function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return (
    <section className="bg-[#FF2727] min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10">
      {/* Capas de fondo */}
      <NoiseBackground />
      <CandidatesBackground />
      <GradientOverlay />

      {/* Contenido principal */}
      <div className="space-y-6 md:space-y-10 lg:space-y-14 w-full flex flex-col items-center justify-center relative z-10 px-4 py-8 md:py-10">
        {/* Título y subtítulo */}
        <header className="text-center max-w-[90%] md:max-w-[80%] lg:max-w-none">
          <Typography
            font="bigShoulders"
            variant="h2"
            color="white"
            align="center"
            className="text-xl md:text-3xl lg:text-4xl"
          >
            &quot;NO SE PUEDE AMAR LO QUE NO SE CONOCE.&quot;
          </Typography>
          <Typography
            font="bilbo"
            variant="h3"
            color="white"
            align="right"
            className="text-lg md:text-2xl lg:text-3xl"
          >
            José María Arguedas
          </Typography>
          <span className="border border-[#FEFEFE80] text-sm md:text-lg lg:text-xl font-flexo-bold text-[#FEFEFE] px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg inline-block mt-2">
            Conoce antes de decidir.
          </span>
        </header>

        {/* Contenido (formulario) */}
        {children}
      </div>
    </section>
  );
}
