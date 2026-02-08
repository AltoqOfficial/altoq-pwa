"use client";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { EXTERNAL_LINKS } from "@/constants";

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
    <section className="relative min-h-[500px] overflow-hidden bg-white py-16 sm:min-h-[550px] sm:py-20 md:min-h-[600px] lg:py-24">
      {/* Light Background Shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Subtle red glow top right */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary-500/5 blur-[120px] rounded-full" />
        {/* Subtle gray glow bottom left */}
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neutral-200/50 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto flex min-h-[400px] items-center justify-center px-4 sm:min-h-[450px] md:min-h-[500px]">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-2 shadow-sm sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-neutral-600 sm:text-sm uppercase">
              Tu voz importa
            </span>
          </div>

          {/* Main Card */}
          <div className="w-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200/50 sm:p-10 md:p-14 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-500 to-transparent opacity-20" />

            {/* Title */}
            <Typography
              variant="h2"
              font="kenyan"
              className="mb-6 text-3xl leading-tight sm:text-4xl md:text-5xl text-neutral-950"
              align="center"
            >
              Caja de{" "}
              <span className="bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Sugerencias
              </span>
            </Typography>

            {/* Description */}
            <Typography
              variant="p"
              className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg"
              align="center"
            >
              ¿Tienes alguna idea para mejorar Altoq? Tu sugerencia es el motor
              que nos ayuda a construir la mejor plataforma para los peruanos.
            </Typography>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                variant="primary"
                shape="pill"
                className="w-full sm:w-auto px-8 py-4"
                onClick={() =>
                  window.open(EXTERNAL_LINKS.suggestionsForm, "_blank")
                }
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-500 sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-green-50">
                  <svg
                    className="h-4 w-4 text-green-600"
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
                </div>
                <span>Permanece anónimo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-primary-50">
                  <svg
                    className="h-4 w-4 text-primary-600"
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
                </div>
                <span>Leemos todo en 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
