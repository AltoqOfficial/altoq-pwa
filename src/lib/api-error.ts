import { NextResponse } from "next/server";
import { ApiError } from "@/types";
import type { AuthError, PostgrestError } from "@supabase/supabase-js";

type ExtendedError = Partial<AuthError & PostgrestError> & {
  message?: string;
  reasons?: string[];
  __isAuthError?: boolean;
};

/**
 * Maps Supabase error codes to human-readable error codes
 */
const ERROR_CODE_MAP: Record<string, { code: string; status: number }> = {
  // Auth errors
  invalid_credentials: { code: "invalid_credentials", status: 401 },
  user_not_found: { code: "user_not_found", status: 404 },
  email_not_confirmed: { code: "email_not_confirmed", status: 403 },
  invalid_email: { code: "invalid_email", status: 400 },
  weak_password: { code: "weak_password", status: 400 },
  email_exists: { code: "email_exists", status: 409 },
  user_already_exists: { code: "user_already_exists", status: 409 },
  signup_disabled: { code: "signups_not_allowed", status: 403 },
  too_many_requests: { code: "too_many_requests", status: 429 },
  over_request_rate_limit: { code: "rate_limit_exceeded", status: 429 },
  over_email_send_rate_limit: {
    code: "email_rate_limit_exceeded",
    status: 429,
  },
  // Session errors
  invalid_token: { code: "invalid_token", status: 401 },
  session_expired: { code: "session_expired", status: 401 },
  refresh_token_not_found: { code: "refresh_token_not_found", status: 401 },
};

/**
 * Extracts error code from Supabase error message
 */
function extractErrorCode(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  // Check for common Supabase error patterns
  if (lowerMessage.includes("invalid login credentials")) {
    return "invalid_credentials";
  }
  if (lowerMessage.includes("email not confirmed")) {
    return "email_not_confirmed";
  }
  if (
    lowerMessage.includes("user already registered") ||
    lowerMessage.includes("already exists")
  ) {
    return "email_exists";
  }
  if (lowerMessage.includes("user not found")) {
    return "user_not_found";
  }
  if (
    lowerMessage.includes("too many requests") ||
    lowerMessage.includes("rate limit")
  ) {
    return "too_many_requests";
  }
  if (lowerMessage.includes("for security purposes")) {
    return "too_many_requests";
  }
  if (lowerMessage.includes("password should be")) {
    return "weak_password";
  }
  if (lowerMessage.includes("signups not allowed")) {
    return "signup_disabled";
  }

  return null;
}

/**
 * Handles API errors and returns a properly formatted error response
 */
export function handleApiError(err: unknown) {
  const errorObj = err as ExtendedError;
  const rawMessage = errorObj.message || "Internal Server Error";

  // Try to extract a more specific error code from the message
  const extractedCode = extractErrorCode(rawMessage);
  const mappedError = extractedCode ? ERROR_CODE_MAP[extractedCode] : null;

  // Determine the error code
  let errorCode = errorObj.code ?? "unknown_error";
  let statusCode = errorObj.status ?? 500;

  // If we found a mapped error, use it
  if (mappedError) {
    errorCode = mappedError.code;
    statusCode = mappedError.status;
  } else if (errorObj.code && ERROR_CODE_MAP[errorObj.code]) {
    // Use the original code if it's in our map
    const mapped = ERROR_CODE_MAP[errorObj.code];
    errorCode = mapped.code;
    statusCode = mapped.status;
  }

  const apiError: ApiError = {
    message: rawMessage,
    code: errorCode,
    status: statusCode,
    reasons: errorObj.reasons,
  };

  return NextResponse.json(apiError, { status: apiError.status });
}
