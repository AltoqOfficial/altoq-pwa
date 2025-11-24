/**
 * Application Constants
 * Centralized configuration for Altoq platform
 */

// Application Info
export const APP_NAME = "Altoq";
export const APP_DESCRIPTION =
  "Plataforma para votar informado en las Elecciones Generales 2026 del Perú";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://altoq.pe";

// Launch Date - January 10, 2026 at 00:00 Peru time (UTC-5)
export const LAUNCH_DATE = new Date("2026-01-10T00:00:00-05:00");

// SEO Configuration
export const SEO = {
  TITLE_TEMPLATE: "%s | Altoq",
  DEFAULT_TITLE: "Altoq - Vota Informado",
  DESCRIPTION: APP_DESCRIPTION,
  KEYWORDS: [
    "elecciones",
    "perú",
    "2026",
    "candidatos",
    "votar",
    "democracia",
    "política",
    "informado",
  ],
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  COMPARATOR: "/compara",
  JOIN_US: "/unete",
  ABOUT: "/about",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  tiktok: "https://tiktok.com/@altoq",
  linkedin: "https://linkedin.com/company/altoq",
  instagram: "https://instagram.com/altoq",
  facebook: "https://facebook.com/altoq",
  twitter: "https://twitter.com/altoq",
} as const;

// Contact Information
export const CONTACT = {
  email: "contacto@altoqperu.com",
  phone: "+51 999 999 999",
} as const;

// Political Parties (from the design)
export const POLITICAL_PARTIES = [
  {
    id: "renovacion-popular",
    name: "Renovación Popular",
    logo: "/images/parties/renovacion-popular.png",
  },
  {
    id: "fuerza-popular",
    name: "Fuerza Popular",
    logo: "/images/parties/fuerza-popular.png",
  },
  {
    id: "peru-libre",
    name: "Perú Libre",
    logo: "/images/parties/peru-libre.png",
  },
  {
    id: "peru-bicentenario",
    name: "Perú Bicentenario",
    logo: "/images/parties/peru-bicentenario.png",
  },
  {
    id: "alianza-progreso",
    name: "Alianza para el Progreso",
    logo: "/images/parties/alianza-progreso.png",
  },
] as const;

// Comparison Tabs
export const COMPARISON_TABS = [
  {
    id: "perfil-general",
    title: "I. Perfil General",
    order: 1,
  },
  {
    id: "trayectoria-politica",
    title: "II. Trayectoria Política",
    order: 2,
  },
  {
    id: "antecedentes",
    title: "III. Antecedentes e Investigaciones",
    order: 3,
  },
  {
    id: "propuestas",
    title: "IV. Propuestas por Temas",
    order: 4,
  },
  {
    id: "coherencia",
    title: "V. Coherencia con el Plan del Partido",
    order: 5,
  },
  {
    id: "financiamiento",
    title: "VI. Financiamiento",
    order: 6,
  },
] as const;
