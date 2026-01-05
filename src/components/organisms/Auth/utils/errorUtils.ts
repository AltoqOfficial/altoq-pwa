/**
 * Auth Error Utilities
 *
 * Shared error handling logic for authentication forms.
 * Maps backend errors to user-friendly Spanish messages.
 */

import type { ErrorResponse } from "../types/auth.types";

// ==================== Types ====================

export interface FriendlyError {
  title: string;
  description: string;
  action?: "resend" | "register" | "login";
}

// ==================== Error Message Mapping ====================

/**
 * Maps backend error codes/messages to user-friendly Spanish messages
 */
const ERROR_MESSAGES: Record<string, FriendlyError> = {
  // Login errors
  "email not confirmed": {
    title: "Correo no verificado",
    description:
      "Revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión.",
    action: "resend",
  },
  "invalid credentials": {
    title: "Credenciales incorrectas",
    description:
      "El correo o la contraseña no son correctos. Intenta de nuevo.",
  },
  "user not found": {
    title: "Usuario no encontrado",
    description: "No existe una cuenta con este correo. ¿Quieres registrarte?",
    action: "register",
  },
  "invalid password": {
    title: "Contraseña incorrecta",
    description: "La contraseña ingresada no es correcta. Intenta de nuevo.",
  },

  // Register errors
  "email already exists": {
    title: "Correo ya registrado",
    description:
      "Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?",
    action: "login",
  },
  "email already registered": {
    title: "Correo ya registrado",
    description:
      "Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?",
    action: "login",
  },
  "user already exists": {
    title: "Usuario ya existe",
    description:
      "Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?",
    action: "login",
  },
  "weak password": {
    title: "Contraseña débil",
    description: "La contraseña no cumple con los requisitos de seguridad.",
  },
  "invalid email": {
    title: "Correo inválido",
    description: "Por favor, ingresa una dirección de correo válida.",
  },

  // Common errors
  "too many requests": {
    title: "Demasiados intentos",
    description:
      "Has excedido el límite de intentos. Espera unos minutos e intenta de nuevo.",
  },
  network_error: {
    title: "Error de conexión",
    description:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
  },
  "server error": {
    title: "Error del servidor",
    description:
      "Ocurrió un problema en el servidor. Por favor, intenta más tarde.",
  },
  unauthorized: {
    title: "No autorizado",
    description: "No tienes permiso para realizar esta acción.",
  },
};

const DEFAULT_LOGIN_ERROR: FriendlyError = {
  title: "Error al iniciar sesión",
  description: "Ocurrió un problema inesperado. Por favor, intenta de nuevo.",
};

const DEFAULT_REGISTER_ERROR: FriendlyError = {
  title: "Error al crear cuenta",
  description: "Ocurrió un problema inesperado. Por favor, intenta de nuevo.",
};

// ==================== Helper Functions ====================

/**
 * Get friendly error message from backend error
 * @param error - The error response from the backend
 * @param context - The context (login or register) for default error messages
 */
export function getFriendlyError(
  error: ErrorResponse,
  context: "login" | "register" = "login"
): FriendlyError {
  const errorText = (error.message || error.error || "").toLowerCase();

  // Check for known error patterns
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (errorText.includes(key)) {
      return value;
    }
  }

  // Check error code
  if (error.code && ERROR_MESSAGES[error.code.toLowerCase()]) {
    return ERROR_MESSAGES[error.code.toLowerCase()];
  }

  // Return context-specific default error
  return context === "register" ? DEFAULT_REGISTER_ERROR : DEFAULT_LOGIN_ERROR;
}

/**
 * Check if an error requires email confirmation
 */
export function isEmailNotConfirmedError(error: ErrorResponse): boolean {
  const errorText = (error.message || error.error || "").toLowerCase();
  return (
    errorText.includes("email not confirmed") ||
    errorText.includes("not verified")
  );
}

/**
 * Check if an error indicates the email already exists
 */
export function isEmailExistsError(error: ErrorResponse): boolean {
  const errorText = (error.message || error.error || "").toLowerCase();
  return (
    errorText.includes("already exists") ||
    errorText.includes("already registered") ||
    errorText.includes("email in use")
  );
}
