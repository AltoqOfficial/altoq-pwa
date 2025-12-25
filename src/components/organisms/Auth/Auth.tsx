"use client";

import { memo } from "react";
import Image from "next/image";
import { Typography, Button, Input } from "@/components/atoms";

// Constantes de configuración
const NOISE_FILTER_ID = "authNoiseFilter";
const NOISE_TABLE_VALUES =
  "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";

/**
 * Componente SVG de ruido para el fondo
 * Memoizado para evitar re-renders innecesarios
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
    "absolute bottom-0 z-2 object-contain h-full max-h-[90vh] w-auto select-none pointer-events-none";

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

/**
 * Formulario de autenticación
 */
const AuthForm = memo(function AuthForm() {
  return (
    <div className="bg-[#FEFEFE] w-[30%] min-w-80 p-10 rounded-2xl flex flex-col mx-auto">
      <div className="w-full flex justify-center">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={120}
          height={50}
          className="py-2 mb-8"
        />
      </div>

      <form className="space-y-6 mb-5">
        <Input type="email" placeholder="Correo" size="lg" />
        <Input type="password" placeholder="Contraseña" size="lg" />
      </form>

      <a
        href="/forgot-password"
        className="text-[#FF2727] text-lg flex justify-end hover:underline transition-all cursor-pointer"
      >
        ¿Olvidaste tu contraseña?
      </a>

      <Button size="lg" className="mt-5">
        Iniciar sesión
      </Button>

      <div className="flex justify-center gap-4 mt-5 flex-wrap">
        <Typography>¿No tienes una cuenta?</Typography>
        <a
          href="/register"
          className="text-[#FF2727] underline text-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Registrarse
        </a>
      </div>
    </div>
  );
});

/**
 * Auth Component (Organism)
 *
 * Página de autenticación con fondo de ruido, imágenes de candidatos,
 * degradado y formulario de login.
 *
 * @example
 * ```tsx
 * <Auth />
 * ```
 */
export function Auth() {
  return (
    <section className="bg-[#FF2727] min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Capas de fondo */}
      <NoiseBackground />
      <CandidatesBackground />
      <GradientOverlay />

      {/* Contenido principal */}
      <div className="space-y-14 w-full flex flex-col items-center justify-center relative z-10 px-4">
        {/* Título y subtítulo */}
        <header className="text-center">
          <Typography
            font="sohneSchmal"
            variant="h3"
            color="white"
            align="center"
          >
            &quot;NO SE PUEDE AMAR LO QUE NO SE CONOCE.&quot; - JOSÉ MARÍA
            ARGUEDAS
          </Typography>
          <Typography color="white" variant="h6" weight="200" align="center">
            Conoce antes de decidir.
          </Typography>
        </header>

        {/* Formulario */}
        <AuthForm />
      </div>
    </section>
  );
}
