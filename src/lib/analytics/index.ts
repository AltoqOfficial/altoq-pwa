/**
 * Analytics Module
 * Exporta todas las utilidades de Google Analytics
 */

export {
  GA_MEASUREMENT_ID,
  pageview,
  event,
  trackEvent,
  isGtagAvailable,
  type GtagEvent,
  type EventName,
  type EventParams,
} from "./gtag";
