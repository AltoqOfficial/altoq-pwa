"use client";

import { memo } from "react";
import Link from "next/link";
import type { ErrorResponse } from "../types/auth.types";
import {
  getFriendlyError,
  type FriendlyError,
  type ErrorContext,
} from "../utils/errorUtils";

// ==================== Types ====================

interface ErrorAlertProps {
  /** The error response from the API */
  error: ErrorResponse;
  /** Context for default error messages */
  context?: ErrorContext;
  /** Callback when resend email is clicked */
  onResendEmail?: () => void;
  /** Whether the resend email action is in progress */
  isResending?: boolean;
}

interface InlineErrorProps {
  /** Error message to display */
  message: string;
  /** Optional helper text/example */
  helperText?: string;
}

interface SuccessAlertProps {
  title: string;
  description: string;
}

interface LoadingAlertProps {
  message: string;
}

// ==================== Icons ====================

/**
 * Error icon - red circle with exclamation mark (matches design)
 */
export const ErrorIcon = memo(function ErrorIcon({
  className = "w-[15px] h-[15px]",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
    >
      <path
        d="M7.5 0C3.36 0 0 3.247 0 7.247s3.36 7.247 7.5 7.247S15 11.248 15 7.247 11.64 0 7.5 0m.75 10.87h-1.5V9.422h1.5zm0-2.898h-1.5V3.624h1.5z"
        fill="#b3261e"
      />
    </svg>
  );
});

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ==================== Action Components ====================

interface ActionProps {
  action: FriendlyError["action"];
  onResendEmail?: () => void;
  isResending?: boolean;
}

const ErrorActions = memo(function ErrorActions({
  action,
  onResendEmail,
  isResending,
}: ActionProps) {
  if (action === "resend" && onResendEmail) {
    return (
      <button
        type="button"
        onClick={onResendEmail}
        disabled={isResending}
        className="text-[#b3261e] font-flexo-bold text-sm underline hover:opacity-80 transition-opacity disabled:opacity-50 ml-1"
      >
        {isResending ? "Enviando..." : "Reenviar correo"}
      </button>
    );
  }

  if (action === "register") {
    return (
      <Link
        href="/register"
        className="text-[#b3261e] font-flexo-bold text-sm underline hover:opacity-80 transition-opacity ml-1"
      >
        Crear una cuenta
      </Link>
    );
  }

  if (action === "login") {
    return (
      <Link
        href="/login"
        className="text-[#b3261e] font-flexo-bold text-sm underline hover:opacity-80 transition-opacity ml-1"
      >
        Iniciar sesión
      </Link>
    );
  }

  if (action === "forgot") {
    return (
      <Link
        href="/forgot"
        className="text-[#b3261e] font-flexo-bold text-sm underline hover:opacity-80 transition-opacity ml-1"
      >
        Solicitar nuevo enlace
      </Link>
    );
  }

  return null;
});

// ==================== Alert Components ====================

/**
 * InlineError Component
 *
 * Simple inline error message with icon.
 * Matches the design style shown in mockups.
 */
export const InlineError = memo(function InlineError({
  message,
  helperText,
}: InlineErrorProps) {
  return (
    <div className="flex items-start gap-2 text-[#b3261e]">
      <ErrorIcon className="w-[15px] h-[15px] shrink-0 mt-0.5" />
      <div className="font-flexo text-sm leading-tight">
        <span>{message}</span>
        {helperText && (
          <span className="block text-[#b3261e]/80">{helperText}</span>
        )}
      </div>
    </div>
  );
});

/**
 * ErrorAlert Component
 *
 * Displays a user-friendly error message with optional actions.
 * Uses inline style matching the design mockups.
 */
export const ErrorAlert = memo(function ErrorAlert({
  error,
  context = "login",
  onResendEmail,
  isResending,
}: ErrorAlertProps) {
  const { description, action } = getFriendlyError(error, context);

  return (
    <div className="flex items-start gap-2 text-[#b3261e]">
      <ErrorIcon className="w-[15px] h-[15px] shrink-0 mt-0.5" />
      <div className="font-flexo text-sm leading-tight">
        <span>{description}</span>
        <ErrorActions
          action={action}
          onResendEmail={onResendEmail}
          isResending={isResending}
        />
      </div>
    </div>
  );
});

/**
 * SuccessAlert Component
 *
 * Displays a success message with a green theme.
 */
export const SuccessAlert = memo(function SuccessAlert({
  title,
  description,
}: SuccessAlertProps) {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-[#B3261E] font-flexo-bold text-sm">{title}</h4>
        <p className="text-[#B3261E] text-sm mt-0.5 text-center">
          {description}
        </p>
      </div>
    </div>
  );
});

/**
 * LoadingAlert Component
 *
 * Displays a loading message with a blue theme.
 */
export const LoadingAlert = memo(function LoadingAlert({
  message,
}: LoadingAlertProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <LoadingSpinner />
        <span className="text-blue-700 text-sm">{message}</span>
      </div>
    </div>
  );
});
