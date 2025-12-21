/**
 * Application Constants
 * Centralized configuration for Altoq platform
 */

// Application Info
export const APP_NAME = "Altoq";
export const APP_DESCRIPTION =
  "Plataforma para votar informado en las Elecciones Generales 2026 del Perú";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://altoqperu.com";

// Launch Date - January 12, 2026 at 00:00 Peru time (UTC-5)
export const LAUNCH_DATE = new Date("2026-01-12T00:00:00-05:00");

// SEO Configuration
export const SEO = {
  TITLE_TEMPLATE: "%s | Altoq",
  DEFAULT_TITLE: "Altoq - Vota Informado en las Elecciones 2026",
  DESCRIPTION: APP_DESCRIPTION,
  KEYWORDS: [
    // Brand keywords
    "altoq",
    "altoq peru",
    "altoq perú",
    "altoqperu",
    "altoque",
    "altoque peru",
    "altoque perú",
    // Election keywords
    "elecciones 2026",
    "elecciones generales 2026",
    "elecciones perú 2026",
    "elecciones peru",
    "elecciones presidenciales perú",
    "elecciones presidenciales 2026",
    // Candidate keywords
    "candidatos presidenciales",
    "candidatos 2026",
    "candidatos peru",
    "candidatos presidenciales peru",
    "comparar candidatos",
    "comparar candidatos presidenciales",
    "comparación de candidatos",
    "propuestas candidatos",
    "análisis candidatos",
    "trayectoria candidatos",
    "antecedentes candidatos",
    "quien es el mejor candidato",
    "quién es el mejor candidato",
    // Action keywords - Votar Informado (CRÍTICO PARA TU OBJETIVO)
    "votar informado",
    "vota informado",
    "vota bien",
    "votar bien",
    "cómo votar bien",
    "votabien",
    "votabienpe",
    "como votar informado",
    "cómo votar informado",
    "donde votar informado",
    "dónde votar informado",
    "informarse para votar",
    "información para votar",
    "información para votar bien",
    "votar consciente",
    "voto consciente",
    "herramientas para votar",
    "guía para votar",
    "guía electoral",
    "guía elecciones 2026",
    // Platform & Tools keywords
    "plataforma electoral",
    "plataforma electoral perú",
    "comparar planes de gobierno",
    "planes de gobierno 2026",
    "propuestas presidenciales",
    "propuestas presidenciales 2026",
    // General political keywords
    "democracia perú",
    "política peruana",
    "partidos políticos perú",
    "plan de gobierno",
    "propuestas electorales",
    // Electoral authorities
    "JNE",
    "ONPE",
    "RENIEC",
    "ciudadanía informada",
    "participación ciudadana",
    // Debate & Campaign keywords
    "debate electoral",
    "debate presidencial",
    "campaña electoral 2026",
  ],
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  COMPARATOR: "/compara",
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@altoqperu",
} as const;

// Contact Information
export const CONTACT = {
  email: "contacto@altoqperu.com",
} as const;
