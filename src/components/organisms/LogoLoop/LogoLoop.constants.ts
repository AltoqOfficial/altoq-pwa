export const PARTIDO_LOGOS = [
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
] as const;

export const LOGO_CONFIG = {
  LOGOS_PER_PAGE: 6,
  LOGO_HEIGHT: 56,
  LOGO_WIDTH: 100,
  TRANSITION_DELAY_MS: 150,
  PAGE_DISPLAY_MS: 7000,
  CONTAINER_PADDING: 48,
} as const;

export type PartidoLogo = (typeof PARTIDO_LOGOS)[number];
