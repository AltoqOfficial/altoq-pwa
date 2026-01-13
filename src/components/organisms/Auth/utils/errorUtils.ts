/**
 * Auth Error Utilities
 *
 * Shared error handling logic for authentication forms.
 * Maps backend/Supabase errors to user-friendly Spanish messages.
 */

import type { ErrorResponse } from "../types/auth.types";

// ==================== Types ====================

export type ErrorContext = "login" | "register" | "forgot" | "update";

export interface FriendlyError {
  title: string;
  description: string;
  action?: "resend" | "register" | "login" | "forgot";
}

// ==================== Error Message Mapping ====================

/**
 * Maps backend/Supabase error codes and messages to user-friendly Spanish messages.
 * Keys are lowercased patterns that will be matched against error messages.
 */
const ERROR_MESSAGES: Record<string, FriendlyError> = {
  // ==================== Login Errors ====================
  "email not confirmed": {
    title: "Correo no verificado",
    description:
      "Revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión.",
    action: "resend",
  },
  "invalid login credentials": {
    title: "Credenciales incorrectas",
    description:
      "El correo o la contraseña no son correctos. Verifica tus datos e intenta de nuevo.",
  },
  "invalid credentials": {
    title: "Credenciales incorrectas",
    description:
      "El correo o la contraseña no son correctos. Verifica tus datos e intenta de nuevo.",
  },
  "credenciales inválidas": {
    title: "Credenciales incorrectas",
    description:
      "El correo o la contraseña no son correctos. Verifica tus datos e intenta de nuevo.",
  },
  "user not found": {
    title: "Usuario no encontrado",
    description: "No existe una cuenta con este correo.",
    action: "register",
  },
  "invalid password": {
    title: "Contraseña incorrecta",
    description: "La contraseña ingresada no es correcta. Intenta de nuevo.",
  },
  "signups not allowed": {
    title: "Registro deshabilitado",
    description:
      "El registro de nuevos usuarios está temporalmente deshabilitado.",
  },

  // ==================== Register Errors ====================
  "email already exists": {
    title: "Correo ya registrado",
    description: "Ya existe una cuenta con este correo.",
    action: "login",
  },
  "email already registered": {
    title: "Correo ya registrado",
    description: "Ya existe una cuenta con este correo.",
    action: "login",
  },
  "user already exists": {
    title: "Usuario ya existe",
    description: "Ya existe una cuenta con este correo.",
    action: "login",
  },
  "user already registered": {
    title: "Usuario ya registrado",
    description: "Ya existe una cuenta con este correo.",
    action: "login",
  },
  "duplicate key": {
    title: "Correo ya registrado",
    description: "Ya existe una cuenta con este correo.",
    action: "login",
  },

  // ==================== Password Errors ====================
  "weak password": {
    title: "Contraseña débil",
    description:
      "La contraseña no cumple con los requisitos de seguridad. Debe tener al menos 10 caracteres, una letra y un número o carácter especial.",
  },
  "password should be at least": {
    title: "Contraseña muy corta",
    description: "La contraseña debe tener al menos 10 caracteres.",
  },
  "new password should be different": {
    title: "Contraseña igual a la anterior",
    description:
      "La nueva contraseña debe ser diferente a tu contraseña actual.",
  },
  same_password: {
    title: "Contraseña igual a la anterior",
    description:
      "La nueva contraseña debe ser diferente a tu contraseña actual.",
  },

  // ==================== Email Errors ====================
  "invalid email": {
    title: "Correo inválido",
    description:
      "Por favor, ingresa una dirección de correo válida (ejemplo: usuario@email.com).",
  },
  "unable to validate email": {
    title: "Correo inválido",
    description:
      "No se pudo validar el correo electrónico. Verifica que esté bien escrito.",
  },

  // ==================== Session/Token Errors ====================
  "invalid refresh token": {
    title: "Sesión expirada",
    description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
    action: "login",
  },
  "refresh token not found": {
    title: "Sesión no válida",
    description: "No se encontró una sesión activa. Inicia sesión nuevamente.",
    action: "login",
  },
  "session expired": {
    title: "Sesión expirada",
    description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
    action: "login",
  },
  "jwt expired": {
    title: "Sesión expirada",
    description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
    action: "login",
  },
  "invalid jwt": {
    title: "Sesión inválida",
    description:
      "Hubo un problema con tu sesión. Por favor, inicia sesión nuevamente.",
    action: "login",
  },
  "token expired": {
    title: "Enlace expirado",
    description: "El enlace ha expirado. Por favor, solicita uno nuevo.",
    action: "forgot",
  },
  otp_expired: {
    title: "Código expirado",
    description: "El código de verificación ha expirado. Solicita uno nuevo.",
    action: "forgot",
  },

  // ==================== Rate Limiting Errors ====================
  "too many requests": {
    title: "Demasiados intentos",
    description:
      "Has realizado demasiados intentos. Espera unos minutos antes de intentar de nuevo.",
  },
  "rate limit exceeded": {
    title: "Límite excedido",
    description:
      "Has excedido el límite de solicitudes. Espera unos minutos e intenta de nuevo.",
  },
  "email rate limit exceeded": {
    title: "Límite de correos excedido",
    description:
      "Has solicitado demasiados correos. Espera unos minutos antes de solicitar otro.",
  },
  "for security purposes": {
    title: "Espera antes de continuar",
    description:
      "Por seguridad, debes esperar unos segundos antes de intentar de nuevo.",
  },

  // ==================== Network/Server Errors ====================
  network_error: {
    title: "Error de conexión",
    description:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
  },
  "failed to fetch": {
    title: "Error de conexión",
    description:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
  },
  "network request failed": {
    title: "Error de conexión",
    description:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
  },
  "server error": {
    title: "Error del servidor",
    description:
      "Ocurrió un problema en el servidor. Por favor, intenta más tarde.",
  },
  "internal server error": {
    title: "Error del servidor",
    description: "Ocurrió un problema interno. Por favor, intenta más tarde.",
  },
  "service unavailable": {
    title: "Servicio no disponible",
    description:
      "El servicio no está disponible en este momento. Intenta más tarde.",
  },

  // ==================== Authorization Errors ====================
  unauthorized: {
    title: "No autorizado",
    description: "No tienes permiso para realizar esta acción.",
  },
  "not authorized": {
    title: "No autorizado",
    description: "No tienes permiso para realizar esta acción.",
  },
  "access denied": {
    title: "Acceso denegado",
    description: "No tienes permiso para acceder a este recurso.",
  },

  // ==================== Forgot Password Errors ====================
  "unable to send email": {
    title: "No se pudo enviar el correo",
    description:
      "Hubo un problema al enviar el correo. Verifica que la dirección sea correcta e intenta de nuevo.",
  },
  "email not found": {
    title: "Correo no encontrado",
    description: "No existe una cuenta asociada a este correo electrónico.",
    action: "register",
  },

  // ==================== Profile/Data Errors ====================
  invalid_age_range_or_motivation: {
    title: "Datos inválidos",
    description:
      "Hubo un problema con los datos seleccionados. Por favor, intenta de nuevo.",
  },
  profile_creation_failed: {
    title: "Error al crear perfil",
    description: "No se pudo crear tu perfil. Por favor, intenta de nuevo.",
  },
  user_creation_failed: {
    title: "Error al crear usuario",
    description:
      "No se pudo crear tu cuenta. Por favor, intenta de nuevo más tarde.",
  },
  missing_credentials: {
    title: "Datos incompletos",
    description: "Por favor, completa todos los campos requeridos.",
  },
  missing_email: {
    title: "Correo requerido",
    description: "Por favor, ingresa tu correo electrónico.",
  },
};

// ==================== Default Error Messages ====================

const DEFAULT_ERRORS: Record<ErrorContext, FriendlyError> = {
  login: {
    title: "Error al iniciar sesión",
    description: "Ocurrió un problema inesperado. Por favor, intenta de nuevo.",
  },
  register: {
    title: "Error al crear cuenta",
    description: "Ocurrió un problema inesperado. Por favor, intenta de nuevo.",
  },
  forgot: {
    title: "Error al enviar correo",
    description:
      "No se pudo enviar el correo de recuperación. Por favor, intenta de nuevo.",
  },
  update: {
    title: "Error al actualizar contraseña",
    description:
      "No se pudo actualizar tu contraseña. Por favor, intenta de nuevo.",
  },
};

// ==================== Helper Functions ====================

/**
 * Normalizes error text for pattern matching.
 * Removes extra whitespace and converts to lowercase.
 */
function normalizeErrorText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Get friendly error message from backend error
 * @param error - The error response from the backend
 * @param context - The context for default error messages
 */
export function getFriendlyError(
  error: ErrorResponse,
  context: ErrorContext = "login"
): FriendlyError {
  const rawErrorText = error.message || error.error || "";
  const errorText = normalizeErrorText(rawErrorText);
  const errorCode = normalizeErrorText(error.code || "");

  // First, check error code against our patterns
  for (const [pattern, friendlyError] of Object.entries(ERROR_MESSAGES)) {
    if (errorCode.includes(pattern) || errorCode === pattern) {
      return friendlyError;
    }
  }

  // Then, check error message against our patterns
  for (const [pattern, friendlyError] of Object.entries(ERROR_MESSAGES)) {
    if (errorText.includes(pattern)) {
      return friendlyError;
    }
  }

  // Handle HTTP status codes
  if (error.status) {
    switch (error.status) {
      case 400:
        return {
          title: "Datos inválidos",
          description:
            "Los datos proporcionados no son válidos. Verifica e intenta de nuevo.",
        };
      case 401:
        return {
          title: "No autorizado",
          description:
            "Tus credenciales no son válidas. Verifica e intenta de nuevo.",
        };
      case 403:
        return {
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción.",
        };
      case 404:
        return {
          title: "No encontrado",
          description: "El recurso solicitado no existe.",
        };
      case 422:
        return {
          title: "Error de validación",
          description:
            "Los datos proporcionados no son válidos. Verifica e intenta de nuevo.",
        };
      case 429:
        return {
          title: "Demasiados intentos",
          description:
            "Has realizado demasiados intentos. Espera unos minutos e intenta de nuevo.",
        };
      case 500:
      case 502:
      case 503:
        return {
          title: "Error del servidor",
          description:
            "Ocurrió un problema en el servidor. Por favor, intenta más tarde.",
        };
    }
  }

  // Return context-specific default error
  return DEFAULT_ERRORS[context];
}

/**
 * Check if an error requires email confirmation
 */
export function isEmailNotConfirmedError(error: ErrorResponse): boolean {
  const errorText = normalizeErrorText(error.message || error.error || "");
  return (
    errorText.includes("email not confirmed") ||
    errorText.includes("not verified") ||
    errorText.includes("confirm your email") ||
    errorText.includes("verify your email")
  );
}

/**
 * Check if an error indicates the email already exists
 */
export function isEmailExistsError(error: ErrorResponse): boolean {
  const errorText = normalizeErrorText(error.message || error.error || "");
  return (
    errorText.includes("already exists") ||
    errorText.includes("already registered") ||
    errorText.includes("email in use") ||
    errorText.includes("duplicate key") ||
    errorText.includes("user already exists")
  );
}

/**
 * Check if an error is related to rate limiting
 */
export function isRateLimitError(error: ErrorResponse): boolean {
  const errorText = normalizeErrorText(error.message || error.error || "");
  return (
    errorText.includes("too many requests") ||
    errorText.includes("rate limit") ||
    errorText.includes("for security purposes") ||
    error.status === 429
  );
}

/**
 * Check if an error is a network error
 */
export function isNetworkError(error: ErrorResponse): boolean {
  const errorText = normalizeErrorText(error.message || error.error || "");
  return (
    errorText.includes("failed to fetch") ||
    errorText.includes("network request failed") ||
    errorText.includes("network_error")
  );
}

/**
 * Check if error is related to invalid credentials (login)
 */
export function isInvalidCredentialsError(error: ErrorResponse): boolean {
  const errorText = normalizeErrorText(error.message || error.error || "");
  return (
    errorText.includes("invalid login credentials") ||
    errorText.includes("invalid credentials") ||
    errorText.includes("credenciales inválidas") ||
    errorText.includes("invalid password")
  );
}
