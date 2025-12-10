"use client";

import React from "react";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { InlineMessage } from "@/components/atoms/InlineMessage";
import { Input } from "@/components/atoms/Input";
import { Toast } from "@/components/atoms/Toast";
import { cn } from "@/lib/utils";
import { getDeviceInfo } from "@/lib/utils/deviceDetection";
import { trackEvent } from "@/lib/analytics/gtag";

export interface EmailSubscribeFormProps {
  /**
   * Callback when form is submitted
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Submit button text
   */
  submitText?: string;
  /**
   * Input placeholder text
   */
  placeholder?: string;
  /**
   * Whether to show the checkbox for accepting terms
   */
  showCheckbox?: boolean;
  /**
   * Checkbox label text
   */
  checkboxLabel?: string;
  /**
   * Input variant
   */
  inputVariant?: "default" | "outline";
  /**
   * Button variant
   */
  buttonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-light"
    | "ghost"
    | "header-nav"
    | "header-nav-dark";
  /**
   * Size of input and button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Custom className for wrapper
   */
  className?: string;
  /**
   * Layout direction
   */
  layout?: "horizontal" | "vertical";
  /**
   * Cooldown duration in seconds (default: 60)
   */
  cooldownDuration?: number;
}

/**
 * EmailSubscribeForm Component (Molecule)
 * Reusable email subscription form with optional checkbox and cooldown protection
 *
 * This molecule combines:
 * - Email input field
 * - Submit button
 * - Optional terms acceptance checkbox
 * - Cooldown timer to prevent spam
 *
 * Features:
 * - Customizable submit text and placeholder
 * - Optional checkbox for terms/newsletter acceptance
 * - Multiple variants and sizes
 * - Horizontal or vertical layout
 * - Form validation
 * - Loading state support
 * - Cooldown timer with localStorage persistence
 * - Real-time countdown display in button
 * - Automatic form disable during cooldown
 *
 * @example
 * ```tsx
 * <EmailSubscribeForm
 *   submitText="¡Notifícame!"
 *   placeholder="tucorreo@ejemplo.com"
 *   showCheckbox={true}
 *   checkboxLabel="Acepto recibir novedades"
 *   cooldownDuration={60}
 *   onSubmit={(email) => console.log(email)}
 * />
 *
 * <EmailSubscribeForm
 *   submitText="Suscribirse"
 *   inputVariant="outline"
 *   layout="vertical"
 *   showCheckbox={false}
 *   cooldownDuration={120}
 * />
 * ```
 */
const COOLDOWN_STORAGE_KEY = "altoq_email_subscribe_cooldown";

export function EmailSubscribeForm({
  onSubmit,
  submitText = "Enviar",
  placeholder = "Email",
  showCheckbox = false,
  checkboxLabel = "Acepto recibir novedades, noticias y actualizaciones importantes sobre Altoq.",
  inputVariant = "default",
  buttonVariant = "primary",
  size = "lg",
  className,
  layout = "horizontal",
  cooldownDuration = 60,
}: EmailSubscribeFormProps) {
  const [email, setEmail] = React.useState("");
  const [accepted, setAccepted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const [cooldownSeconds, setCooldownSeconds] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Memoizar el callback del Toast para evitar recreaciones constantes
  const handleDismissToast = React.useCallback(() => {
    setShowSuccessToast(false);
  }, []);

  // Inicializar cooldown desde localStorage
  React.useEffect(() => {
    const storedCooldownEnd = localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (storedCooldownEnd) {
      const endTime = parseInt(storedCooldownEnd, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

      if (remaining > 0) {
        setCooldownSeconds(remaining);
      } else {
        localStorage.removeItem(COOLDOWN_STORAGE_KEY);
      }
    }
  }, []);

  // Manejar el contador regresivo
  React.useEffect(() => {
    if (cooldownSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCooldownSeconds((prev) => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            localStorage.removeItem(COOLDOWN_STORAGE_KEY);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
          return Math.max(0, newValue);
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [cooldownSeconds]);

  // Iniciar cooldown después de envío exitoso
  const startCooldown = React.useCallback(() => {
    const endTime = Date.now() + cooldownDuration * 1000;
    localStorage.setItem(COOLDOWN_STORAGE_KEY, endTime.toString());
    setCooldownSeconds(cooldownDuration);
  }, [cooldownDuration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    // Verificar si está en cooldown
    if (cooldownSeconds > 0) {
      setErrorMessage(
        `Por favor espera ${cooldownSeconds} segundos antes de intentar nuevamente.`
      );
      setShowError(true);
      return;
    }

    // Limpiar errores previos
    setShowError(false);
    setErrorMessage("");

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        // Si se proporciona un handler personalizado, usarlo
        await onSubmit(email);
      } else {
        // Handler por defecto: llamar al API de suscripción
        // Obtener información del dispositivo
        const deviceInfo = getDeviceInfo();

        // Obtener parámetros UTM de la URL si existen
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {
          utm_source: urlParams.get("utm_source") || undefined,
          utm_medium: urlParams.get("utm_medium") || undefined,
          utm_campaign: urlParams.get("utm_campaign") || undefined,
        };

        // Obtener referrer
        const referrer = document.referrer || undefined;

        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            deviceInfo,
            referrer,
            utmParams,
            termsAccepted: accepted,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Si el email ya está registrado, mostrar mensaje específico
          if (response.status === 409) {
            setErrorMessage("Este email ya está suscrito.");
            setShowError(true);
            return;
          }
          throw new Error(data.error || "Error al suscribirse");
        }

        // Mostrar mensaje de éxito con Toast
        setShowSuccessToast(true);
      }

      // Rastrear evento de suscripción exitosa
      trackEvent.emailSubscribe(email, accepted);

      // Iniciar cooldown después de envío exitoso
      startCooldown();

      setEmail("");
      setAccepted(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMsg = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMsg);
      setShowError(true);

      // Rastrear error en Analytics
      trackEvent.error(
        error instanceof Error ? error.message : errorMsg,
        "EmailSubscribeForm"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || cooldownSeconds > 0;

  const getButtonText = () => {
    if (isSubmitting) return "Enviando...";
    if (cooldownSeconds > 0) {
      const minutes = Math.floor(cooldownSeconds / 60);
      const seconds = cooldownSeconds % 60;
      if (minutes > 0) {
        return `Espera ${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      return `Espera ${cooldownSeconds}s`;
    }
    return submitText;
  };

  return (
    <>
      <Toast
        message="¡Gracias por suscribirte! Te notificaremos cuando esté disponible."
        type="success"
        duration={4000}
        show={showSuccessToast}
        onDismiss={handleDismissToast}
      />

      <form onSubmit={handleSubmit} className={cn("w-full", className)}>
        <div
          className={cn(
            "flex gap-4",
            layout === "vertical" ? "flex-col" : "sm:flex-row flex-col"
          )}
        >
          <Input
            type="email"
            placeholder={placeholder}
            variant={inputVariant}
            size={size}
            className="flex-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}
          />
          <Button
            variant={buttonVariant}
            size={size}
            type="submit"
            className={cn(
              cooldownSeconds > 0 ? "cursor-not-allowed" : "cursor-pointer"
            )}
            disabled={isDisabled}
          >
            {getButtonText()}
          </Button>
        </div>

        {showCheckbox && (
          <div className="mt-4">
            <Checkbox
              label={checkboxLabel}
              size="md"
              className="accent-primary-600"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
          </div>
        )}

        {showError && (
          <div className="mt-4">
            <InlineMessage
              message={errorMessage}
              type="error"
              show={showError}
              duration={4000}
              onDismiss={() => setShowError(false)}
            />
          </div>
        )}
      </form>
    </>
  );
}
