/**
 * Google Analytics (GA4) Utilities
 *
 * Este módulo proporciona funciones para interactuar con Google Analytics 4.
 * Permite rastrear páginas vistas, eventos personalizados y conversiones.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Tipos para eventos personalizados
export interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Tipos para eventos predefinidos
export type EventName =
  | "page_view"
  | "search"
  | "select_content"
  | "share"
  | "sign_up"
  | "purchase"
  | "generate_lead"
  | string; // Permite eventos personalizados

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Verifica si Google Analytics está disponible
 */
export const isGtagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag !== "undefined";
};

/**
 * Registra una página vista en Google Analytics
 * @param url - URL de la página vista
 */
export const pageview = (url: string): void => {
  if (!isGtagAvailable() || !GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Registra un evento personalizado en Google Analytics
 * @param eventName - Nombre del evento
 * @param params - Parámetros adicionales del evento
 */
export const event = (eventName: EventName, params?: EventParams): void => {
  if (!isGtagAvailable() || !GA_MEASUREMENT_ID) return;

  window.gtag("event", eventName, params);
};

/**
 * Eventos predefinidos para la aplicación
 */
export const trackEvent = {
  /**
   * Rastrear suscripción de email
   */
  emailSubscribe: (email: string, hasAcceptedTerms: boolean) => {
    event("generate_lead", {
      method: "email_form",
      terms_accepted: hasAcceptedTerms,
      // No enviamos el email completo por privacidad, solo el dominio
      email_domain: email.split("@")[1] || "unknown",
    });
  },

  /**
   * Rastrear comparación de candidatos
   */
  compareCandidate: (candidateId: string, candidateName: string) => {
    event("select_content", {
      content_type: "candidate",
      content_id: candidateId,
      content_name: candidateName,
    });
  },

  /**
   * Rastrear cambio de tab en comparación
   */
  comparisonTabChange: (tabName: string) => {
    event("select_content", {
      content_type: "comparison_tab",
      tab_name: tabName,
    });
  },

  /**
   * Rastrear clic en botón CTA
   */
  ctaClick: (ctaName: string, location: string) => {
    event("select_content", {
      content_type: "cta_button",
      cta_name: ctaName,
      cta_location: location,
    });
  },

  /**
   * Rastrear formulario de voluntarios
   */
  volunteerFormSubmit: () => {
    event("generate_lead", {
      method: "volunteer_form",
    });
  },

  /**
   * Rastrear búsqueda
   */
  search: (searchTerm: string) => {
    event("search", {
      search_term: searchTerm,
    });
  },

  /**
   * Rastrear compartir en redes sociales
   */
  share: (method: string, contentType: string, contentId?: string) => {
    event("share", {
      method,
      content_type: contentType,
      content_id: contentId,
    });
  },

  /**
   * Rastrear errores
   */
  error: (errorMessage: string, errorLocation: string) => {
    event("exception", {
      description: errorMessage,
      location: errorLocation,
      fatal: false,
    });
  },

  /**
   * Rastrear instalación de PWA
   */
  pwaInstall: () => {
    event("pwa_install", {
      method: "browser_prompt",
    });
  },

  /**
   * Rastrear actualización de PWA
   */
  pwaUpdate: () => {
    event("pwa_update", {
      method: "service_worker",
    });
  },
};

// Extender el objeto Window con gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
