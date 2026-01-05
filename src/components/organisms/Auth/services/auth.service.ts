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
  if (isAxiosError(error)) {
    const data = error.response?.data;
    return {
      error: data?.message || data?.error || "Error de autenticación",
      code: data?.code || "auth_error",
      message: data?.message,
      status: error.response?.status,
    };
  }

  return {
    error: "Error de conexión",
    code: "network_error",
  };
}
