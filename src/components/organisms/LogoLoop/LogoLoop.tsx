"use client";

import React from "react";

type PartidoLogo = {
  src: string;
  alt: string;
};

const PARTIDO_LOGOS: PartidoLogo[] = [
  { src: "/partidos/ahoranacion.webp", alt: "Ahora Nación" },
  { src: "/partidos/app.webp", alt: "Alianza Para el Progreso" },
  { src: "/partidos/apra.webp", alt: "APRA" },
  { src: "/partidos/avanzapais.webp", alt: "Avanza País" },
  { src: "/partidos/batallaperu.webp", alt: "Batalla Perú" },
  { src: "/partidos/cd.webp", alt: "Camino Democrático" },
  { src: "/partidos/cpp.webp", alt: "Cambio País" },
  { src: "/partidos/cppp.webp", alt: "Centro Popular" },
  { src: "/partidos/fe.webp", alt: "Fe en el Perú" },
  { src: "/partidos/frenteamplio.webp", alt: "Frente Amplio" },
  { src: "/partidos/fuerzapopular.webp", alt: "Fuerza Popular" },
  { src: "/partidos/partidomorado.webp", alt: "Partido Morado" },
  { src: "/partidos/perulibre.webp", alt: "Perú Libre" },
  { src: "/partidos/peruprimero.webp", alt: "Perú Primero" },
  { src: "/partidos/ppt.webp", alt: "Perú Posible" },
  { src: "/partidos/rp.webp", alt: "Renovación Popular" },
  { src: "/partidos/somosperu.webp", alt: "Somos Perú" },
  { src: "/partidos/verde.webp", alt: "Partido Verde" },
];

const LOGO_HEIGHT = 56;
const LOGO_WIDTH = 120;
const GAP = 32;
const ANIMATION_SECONDS = 40;

const DUPLICATED_LOGOS: PartidoLogo[] = [...PARTIDO_LOGOS, ...PARTIDO_LOGOS];
type CSSVars = React.CSSProperties & Record<string, string | number>;

const STYLE_VARS: CSSVars = {
  "--logo-height": `${LOGO_HEIGHT}px`,
  "--logo-width": `${LOGO_WIDTH}px`,
  "--logo-gap": `${GAP}px`,
  "--logo-duration": `${ANIMATION_SECONDS}s`,
};

export const LogoLoop = React.memo(function LogoLoop() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <div
        className="flex w-max items-center animate-logo-marquee"
        style={STYLE_VARS}
        aria-label="Partidos políticos"
      >
        {DUPLICATED_LOGOS.map((logo, index) => (
          <div
            className="flex flex-none items-center justify-center"
            style={{ minWidth: `var(--logo-width)` }}
            key={`${logo.src}-${index}`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              height={LOGO_HEIGHT}
              className="select-none object-contain"
              style={{
                height: "var(--logo-height)",
                width: "var(--logo-width)",
              }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-marquee {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-logo-marquee {
          animation: logo-marquee var(--logo-duration) linear infinite;
          gap: var(--logo-gap);
          will-change: transform;
        }
      `}</style>
    </div>
  );
});
