"use client";

import { ReactNode } from "react";
import {
  AnimatedQuote,
  NoiseBackground,
  CandidatesBackground,
  GradientOverlay,
} from "./components/AuthLayoutComponents";

interface RegisterLayoutProps {
  children: ReactNode;
}

/**
 * RegisterLayout Component
 *
 * Layout compartido para la página de registro.
 * Incluye el fondo con ruido, imágenes de candidatos, degradado
 * y citas inspiracionales que rotan automáticamente.
 */
export function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <section className="bg-[#FF2727] min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10">
      {/* Capas de fondo */}
      <NoiseBackground />
      <CandidatesBackground />
      <GradientOverlay />

      {/* Contenido principal */}
      <div className="space-y-6 md:space-y-10 lg:space-y-14 w-full flex flex-col items-center justify-center relative z-10 px-4 py-8 md:py-10">
        {/* Citas animadas */}
        <AnimatedQuote />

        {/* Contenido (formulario) */}
        {children}
      </div>
    </section>
  );
}
