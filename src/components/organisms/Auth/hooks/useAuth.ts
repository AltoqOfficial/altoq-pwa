"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
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

// ==================== Cookie Utilities ====================

/**
 * Set a cookie with secure options
 */
function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // Use Secure flag in production, SameSite for CSRF protection
  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const secureFlag = isSecure ? "; Secure" : "";

  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax${secureFlag}`;
}

/**
 * Clear a cookie
 */
function clearCookie(name: string): void {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// ==================== Auth Hooks ====================

/**
 * Hook for user login
 *
 * On success: stores tokens in cookies and redirects to /dashboard
 *
 * @example
 * ```tsx
 * const { mutate: login, isPending, error } = useLogin();
 * login({ email: 'user@example.com', password: '123456' });
 * ```
 */
export function useLogin() {
  const router = useRouter();

  return useMutation<AuthResponse, ErrorResponse, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store tokens in cookies
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);

      // Redirect to dashboard
      router.push("/dashboard");
    },
  });
}

/**
 * Hook for user signup
 *
 * On success: redirects to /login with success message
 *
 * @example
 * ```tsx
 * const { mutate: signup, isPending, error } = useSignup();
 * signup({ email: 'user@example.com', password: '123456', fullName: 'John', ... });
 * ```
 */
export function useSignup() {
  const router = useRouter();

  return useMutation<SignupResponse, ErrorResponse, SignupRequest>({
    mutationFn: authService.signup,
    onSuccess: () => {
      // Redirect to login page after successful registration
      router.push("/login?registered=true");
    },
  });
}

/**
 * Hook for user logout
 *
 * On success: clears cookies and redirects to home
 *
 * @example
 * ```tsx
 * const { mutate: logout, isPending } = useLogout();
 * logout();
 * ```
 */
export function useLogout() {
  const router = useRouter();

  return useMutation<MessageResponse, ErrorResponse, void>({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear tokens
      clearCookie("accessToken");
      clearCookie("refreshToken");

      // Redirect to home
      router.push("/");
    },
  });
}

/**
 * Hook for password reset request
 *
 * On success: shows confirmation (handled by component)
 *
 * @example
 * ```tsx
 * const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
 * resetPassword({ email: 'user@example.com' });
 * ```
 */
export function useResetPassword() {
  return useMutation<MessageResponse, ErrorResponse, ResetPasswordRequest>({
    mutationFn: authService.resetPassword,
  });
}

/**
 * Hook for password update
 *
 * On success: redirects to /login
 *
 * @example
 * ```tsx
 * const { mutate: updatePassword, isPending } = useUpdatePassword();
 * updatePassword({ newPassword: 'newSecurePassword123' });
 * ```
 */
export function useUpdatePassword() {
  const router = useRouter();

  return useMutation<MessageResponse, ErrorResponse, UpdatePasswordRequest>({
    mutationFn: authService.updatePassword,
    onSuccess: () => {
      // Redirect to login after password update
      router.push("/login?passwordUpdated=true");
    },
  });
}
