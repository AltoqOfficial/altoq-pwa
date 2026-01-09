/**
 * Auth Types - DTOs for authentication API
 *
 * Based on API documentation for /api/auth/* endpoints
 */

// ==================== Request DTOs ====================

/**
 * Signup request payload
 * POST /api/auth/signup
 */
export interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  ageRangeCode: string;
  motivationCode: string;
  profileCode: string;
}

/**
 * Login request payload
 * POST /api/auth/login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Reset password request payload
 * POST /api/auth/reset-password
 */
export interface ResetPasswordRequest {
  email: string;
  redirectTo?: string;
}

/**
 * Update password request payload
 * POST /api/auth/update-password
 */
export interface UpdatePasswordRequest {
  newPassword: string;
}

// ==================== Response DTOs ====================

/**
 * Successful login response
 */
export interface AuthResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * Successful signup response
 */
export interface SignupResponse {
  email: string;
}

/**
 * Generic success message response
 */
export interface MessageResponse {
  message: string;
}

// ==================== Error DTOs ====================

/**
 * Error response structure for 400/500 errors
 */
export interface ErrorResponse {
  error: string;
  code: string;
  message?: string;
  status?: number;
}

// ==================== Form State Types ====================

/**
 * Login form state
 */
export interface LoginFormState {
  email: string;
  password: string;
}

/**
 * Signup form state (includes confirm password)
 */
export interface SignupFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  ageRangeCode: string;
  motivationCode: string;
  profileCode: string;
}
