"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { cn } from "@/lib/utils";

export interface ToastProps {
  /**
   * Toast message
   */
  message: string;
  /**
   * Toast type
   */
  type?: "success" | "error" | "info";
  /**
   * Duration in milliseconds before auto-dismiss
   */
  duration?: number;
  /**
   * Callback when toast is dismissed
   */
  onDismiss: () => void;
  /**
   * Whether to show the toast
   */
  show: boolean;
}

/**
 * Toast Component (Atom)
 * Floating notification that appears in the top-right corner
 *
 * Features:
 * - Auto-dismiss after specified duration
 * - Smooth enter/exit animations
 * - Success/Error/Info variants with Altoq brand colors
 * - Icon indicators
 * - Manual close button
 *
 * @example
 * ```tsx
 * <Toast
 *   message="¡Gracias por suscribirte!"
 *   type="success"
 *   duration={5000}
 *   show={showToast}
 *   onDismiss={() => setShowToast(false)}
 * />
 * ```
 */
export function Toast({
  message,
  type = "success",
  duration = 5000,
  onDismiss,
  show,
}: ToastProps) {
  const [mounted, setMounted] = useState(show);
  const [isBrowser, setIsBrowser] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're in the browser (for SSR compatibility)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBrowser(true);
  }, []);

  // Mount/unmount with delay for exit animation
  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    } else {
      // Delay unmount to allow exit animation
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
      }, 300);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [show]);

  // Auto-dismiss timer
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onDismiss]);

  if (!mounted || !isBrowser) return null;

  const isExiting = !show;

  const icons = {
    success: (
      <svg
        className="w-6 h-6"
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
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-6 h-6"
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
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  const toastContent = (
    <div
      className={cn(
        "fixed top-4 right-4 left-4 sm:left-auto sm:right-4",
        isExiting ? "animate-toast-slide-out" : "animate-toast-slide-in"
      )}
      style={{ zIndex: 9999 }}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg w-full sm:min-w-[300px] sm:max-w-[400px]",
          styles[type]
        )}
      >
        <div className="shrink-0">{icons[type]}</div>
        <p className="flex-1 text-xs sm:text-sm font-medium wrap-break-word">
          {message}
        </p>
        <button
          onClick={onDismiss}
          className="shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
          aria-label="Cerrar notificación"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  // Use portal to render toast at the end of body, outside any stacking contexts
  return ReactDOM.createPortal(toastContent, document.body);
}
