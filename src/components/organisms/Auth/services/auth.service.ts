import { axiosInstance } from "@/api/axiosInstance";
import { isAxiosError } from "axios";
import type {
  LoginRequest,
  SignupRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  AuthResponse,
  SignupResponse,
  MessageResponse,
  ErrorResponse,
} from "../types/auth.types";

/**
 * Auth Service
 *
 * Handles all authentication API calls using Axios.
 * Each method returns a typed promise for type safety.
 */
export const authService = {
  /**
   * Login with email and password
   * @returns AuthResponse with tokens
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        data
      );
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Register a new user
   * @returns SignupResponse with email confirmation
   */
  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await axiosInstance.post<SignupResponse>(
        "/auth/signup",
        data
      );
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Logout current user
   * @returns MessageResponse with confirmation
   */
  async logout(): Promise<MessageResponse> {
    try {
      const response =
        await axiosInstance.post<MessageResponse>("/auth/logout");
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Request password reset email
   * @returns MessageResponse with confirmation
   */
  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    try {
      const response = await axiosInstance.post<MessageResponse>(
        "/auth/reset-password",
        data
      );
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },

  /**
   * Update password for authenticated user
   * @returns MessageResponse with confirmation
   */
  async updatePassword(data: UpdatePasswordRequest): Promise<MessageResponse> {
    try {
      const response = await axiosInstance.post<MessageResponse>(
        "/auth/update-password",
        data
      );
      return response.data;
    } catch (error) {
      throw handleAuthError(error);
    }
  },
};

/**
 * Handle and normalize auth errors
 * Extracts error details from Axios error response
 */
function handleAuthError(error: unknown): ErrorResponse {
  // Handle Axios errors (API responses)
  if (isAxiosError(error)) {
    const response = error.response;
    const data = response?.data;

    // If we have a response from the server
    if (response) {
      return {
        error:
          data?.message ||
          data?.error ||
          getDefaultErrorMessage(response.status),
        code: data?.code || getDefaultErrorCode(response.status),
        message: data?.message,
        status: response.status,
      };
    }

    // Network error (no response received)
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return {
        error:
          "La solicitud tardó demasiado. Verifica tu conexión e intenta de nuevo.",
        code: "timeout",
        message: "Request timeout",
        status: 408,
      };
    }

    // No response and no network - likely a CORS or network issue
    return {
      error:
        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
      code: "network_error",
      message: error.message,
    };
  }

  // Handle TypeError (usually fetch/network errors)
  if (error instanceof TypeError) {
    return {
      error: "Error de conexión. Verifica tu conexión a internet.",
      code: "network_error",
      message: error.message,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      error: error.message || "Ocurrió un error inesperado.",
      code: "unknown_error",
      message: error.message,
    };
  }

  // Fallback for unknown error types
  return {
    error: "Ocurrió un error inesperado. Por favor, intenta de nuevo.",
    code: "unknown_error",
  };
}

/**
 * Returns a default error message based on HTTP status code
 */
function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Los datos proporcionados no son válidos.";
    case 401:
      return "Credenciales incorrectas. Verifica tus datos.";
    case 403:
      return "No tienes permiso para realizar esta acción.";
    case 404:
      return "El recurso solicitado no existe.";
    case 409:
      return "Ya existe un recurso con estos datos.";
    case 422:
      return "Los datos proporcionados no son válidos.";
    case 429:
      return "Demasiados intentos. Espera unos minutos.";
    case 500:
    case 502:
    case 503:
      return "Error del servidor. Intenta más tarde.";
    default:
      return "Error de autenticación.";
  }
}

/**
 * Returns a default error code based on HTTP status code
 */
function getDefaultErrorCode(status: number): string {
  switch (status) {
    case 400:
      return "bad_request";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "not_found";
    case 409:
      return "conflict";
    case 422:
      return "unprocessable_entity";
    case 429:
      return "too_many_requests";
    case 500:
    case 502:
    case 503:
      return "server_error";
    default:
      return "auth_error";
  }
}
