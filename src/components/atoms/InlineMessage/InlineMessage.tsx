"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface InlineMessageProps {
  /**
   * Message text
   */
  message: string;
  /**
   * Message type
   */
  type?: "success" | "error" | "warning" | "info";
  /**
   * Whether to show the message
   */
  show: boolean;
  /**
   * Optional custom className
   */
  className?: string;
  /**
   * Duration in milliseconds before auto-dismiss (0 to disable)
   */
  duration?: number;
  /**
   * Callback when message is dismissed
   */
  onDismiss?: () => void;
}

/**
 * InlineMessage Component (Atom)
 * Contextual message that appears inline with content
 *
 * Features:
 * - Multiple variants (success, error, warning, info)
 * - Smooth fade-in and fade-out animations
 * - Icon indicators
 * - Border accent with Altoq brand colors
 * - Accessible markup
 *
 * @example
 * ```tsx
 * <InlineMessage
 *   message="Este email ya está suscrito"
 *   type="error"
 *   show={hasError}
 * />
 * ```
 */
export function InlineMessage({
  message,
  type = "error",
  show,
  className,
  duration = 2500,
  onDismiss,
}: InlineMessageProps) {
  const [mounted, setMounted] = useState(show);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mount/unmount with delay for exit animation
  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    } else {
      // Delay unmount to allow exit animation
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
      }, 250);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [show]);

  // Auto-dismiss timer
  useEffect(() => {
    if (show && duration > 0 && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onDismiss]);

  if (!mounted) return null;

  const isExiting = !show;

  const icons = {
    success: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  const styles = {
    success: {
      container: "bg-green-50 border-green-500 text-green-800",
      icon: "text-green-500",
    },
    error: {
      container: "bg-red-50 border-primary-500 text-red-900",
      icon: "text-primary-500",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-500 text-yellow-900",
      icon: "text-yellow-500",
    },
    info: {
      container: "bg-blue-50 border-blue-500 text-blue-900",
      icon: "text-blue-500",
    },
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-l-4",
        isExiting
          ? "animate-inline-message-slide-out"
          : "animate-inline-message-slide-in",
        styles[type].container,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={cn("mt-0.5 shrink-0", styles[type].icon)}>
        {icons[type]}
      </div>
      <p className="text-xs sm:text-sm font-medium leading-relaxed">
        {message}
      </p>
    </div>
  );
}
