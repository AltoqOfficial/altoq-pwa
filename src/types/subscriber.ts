/**
 * Tipos para el sistema de suscripciones
 */

export interface Subscriber {
  // Identificación
  id: string;
  email: string;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Estado
  status: "active" | "unsubscribed";

  // Consentimiento legal
  terms_accepted: boolean;
  terms_accepted_at: string | null;

  // Información del dispositivo
  device_type: "mobile" | "tablet" | "desktop" | null;
  os: string | null;
  browser: string | null;
  browser_version: string | null;
  user_agent: string | null;

  // Información de pantalla
  screen_width: number | null;
  screen_height: number | null;

  // Información de localización
  timezone: string | null;
  language: string | null;

  // Información de origen
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  // Información de red
  ip_address: string | null;
  country: string | null;
  city: string | null;
}

export interface SubscriptionRequest {
  email: string;
  termsAccepted?: boolean;
  deviceInfo?: {
    deviceType: "mobile" | "tablet" | "desktop";
    os: string;
    browser: string;
    browserVersion: string;
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    timezone: string;
    language: string;
  };
  referrer?: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

export interface SubscriptionResponse {
  message: string;
  subscriber: {
    id: string;
    email: string;
    created_at: string;
  };
}
