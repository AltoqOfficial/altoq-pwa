"use client";

import Lottie from "lottie-react";

import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import animationData from "@/../public/data.json";

/**
 * SuggestionsSection Component (Organism)
 * Visual contact section with animated background
 *
 * Features:
 * - Multi-layer Lottie animation background
 * - Glassmorphism card design
 * - Responsive layout
 * - Call-to-action button
 */
export function SuggestionsSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16 sm:min-h-[550px] sm:py-20 md:min-h-[600px] lg:py-24">
      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-neutral-950 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-neutral-950 to-transparent" />
      </div>

      {/* Lottie Animation Background */}
      <div className="absolute inset-0 z-1 flex items-center justify-center opacity-25 sm:opacity-30 md:opacity-40">
        <div className="h-full w-full max-w-[1400px]">
          <Lottie
            animationData={animationData}
            loop={true}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto flex min-h-[400px] items-center justify-center px-4 sm:min-h-[450px] md:min-h-[500px]">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 backdrop-blur-sm sm:mb-8">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
            <span className="text-xs font-medium tracking-wide text-primary-400 sm:text-sm">
              Tu voz importa
            </span>
          </div>

          {/* Main Card with Glassmorphism */}
          <div className="w-full rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-primary-500/5 backdrop-blur-xl sm:rounded-3xl sm:p-8 md:p-10 lg:p-12">
            {/* Title */}
            <Typography
              variant="h2"
              font="kenyan"
              className="mb-4 text-2xl leading-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
              color="white"
              align="center"
            >
              Caja de{" "}
              <span className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Sugerencias
              </span>
            </Typography>

            {/* Description */}
            <Typography
              variant="p"
              className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-neutral-300 sm:mb-8 sm:text-base md:text-lg"
              align="center"
            >
              ¿Tienes alguna sugerencia, pregunta o comentario? Nos encantaría
              escucharte. Tu opinión nos ayuda a mejorar{" "}
              <span className="font-semibold text-white">Altoq</span> para todos
              los peruanos.
            </Typography>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                size="lg"
                variant="primary"
                className="group relative w-full overflow-hidden px-8 py-4 text-base font-semibold shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 sm:w-auto sm:px-10 cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enviar sugerencia
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 sm:mt-8 sm:gap-6 sm:text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-white">Datos protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">Respuesta en 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
