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

// Responsive breakpoints configuration
// default: < 640px (mobile)
// sm: >= 640px
// md: >= 768px
// lg: >= 1024px
// xl: >= 1280px
// 2xl: >= 1536px

export type Breakpoint = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

export const BREAKPOINTS: Record<Breakpoint, number> = {
  default: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export interface ResponsiveConfig {
  LOGOS_PER_PAGE: number;
  LOGO_HEIGHT: number;
  LOGO_WIDTH: number;
  GAP: number;
}

export const RESPONSIVE_LOGO_CONFIG: Record<Breakpoint, ResponsiveConfig> = {
  default: {
    LOGOS_PER_PAGE: 2,
    LOGO_HEIGHT: 32,
    LOGO_WIDTH: 56,
    GAP: 16,
  },
  sm: {
    LOGOS_PER_PAGE: 3,
    LOGO_HEIGHT: 40,
    LOGO_WIDTH: 72,
    GAP: 24,
  },
  md: {
    LOGOS_PER_PAGE: 4,
    LOGO_HEIGHT: 44,
    LOGO_WIDTH: 80,
    GAP: 32,
  },
  lg: {
    LOGOS_PER_PAGE: 5,
    LOGO_HEIGHT: 48,
    LOGO_WIDTH: 88,
    GAP: 48,
  },
  xl: {
    LOGOS_PER_PAGE: 6,
    LOGO_HEIGHT: 52,
    LOGO_WIDTH: 96,
    GAP: 72,
  },
  "2xl": {
    LOGOS_PER_PAGE: 6,
    LOGO_HEIGHT: 56,
    LOGO_WIDTH: 100,
    GAP: 96,
  },
};

export const ANIMATION_CONFIG = {
  TRANSITION_DELAY_MS: 150,
  PAGE_DISPLAY_MS: 7000,
  CONTAINER_PADDING: 48,
} as const;

export type PartidoLogo = (typeof PARTIDO_LOGOS)[number];
