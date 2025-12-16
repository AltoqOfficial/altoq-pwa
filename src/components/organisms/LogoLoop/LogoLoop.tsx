"use client";

import React, { useState, useEffect, useCallback } from "react";

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

const LOGOS_PER_PAGE = 6;
const LOGO_HEIGHT = 56;
const LOGO_WIDTH = 100;
const TRANSITION_DELAY_MS = 150;
const PAGE_DISPLAY_MS = 6000;

const getLogoPages = (): PartidoLogo[][] => {
  const pages: PartidoLogo[][] = [];
  for (let i = 0; i < PARTIDO_LOGOS.length; i += LOGOS_PER_PAGE) {
    pages.push(PARTIDO_LOGOS.slice(i, i + LOGOS_PER_PAGE));
  }
  return pages;
};

const LOGO_PAGES = getLogoPages();

export const LogoLoop = React.memo(function LogoLoop() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);

  const nextPage = useCallback(() => {
    setIsAnimatingOut(true);

    setTimeout(
      () => {
        setCurrentPage((prev) => (prev + 1) % LOGO_PAGES.length);
        setIsAnimatingOut(false);
        setIsAnimatingIn(true);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimatingIn(false);
          });
        });
      },
      LOGOS_PER_PAGE * TRANSITION_DELAY_MS + 300
    );
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimatingIn(false);
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(nextPage, PAGE_DISPLAY_MS);
    return () => clearInterval(interval);
  }, [nextPage]);

  const currentLogos = LOGO_PAGES[currentPage];

  const getScale = () => {
    if (isAnimatingOut) return "scale(0)";
    if (isAnimatingIn) return "scale(0)";
    return "scale(1)";
  };

  return (
    <div className="relative w-full flex items-center justify-center py-6">
      <div className="flex items-center justify-center">
        {/* Contenedor estático del texto */}
        <div className="shrink-0 pr-8 z-10 text-center">
          <p className="text-[#A6A6A6] max-w-56 font-semibold">
            Información imparcial sobre todos los partidos.
          </p>
        </div>

        {/* Contenedor de logos con animación de escala */}
        <div
          className="flex items-center justify-center gap-24"
          aria-label="Partidos políticos"
        >
          {currentLogos.map((logo, index) => (
            <div
              key={`${currentPage}-${logo.src}-${index}`}
              className="flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                minWidth: LOGO_WIDTH,
                transform: getScale(),
                transitionDelay: `${index * TRANSITION_DELAY_MS}ms`,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                height={LOGO_HEIGHT}
                className="select-none object-contain"
                style={{
                  height: LOGO_HEIGHT,
                  width: LOGO_WIDTH,
                }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
