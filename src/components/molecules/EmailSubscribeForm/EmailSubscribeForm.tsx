"use client";

import React from "react";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { InlineMessage } from "@/components/atoms/InlineMessage";
import { Input } from "@/components/atoms/Input";
import { Toast } from "@/components/atoms/Toast";
import { cn } from "@/lib/utils";
import { getDeviceInfo } from "@/lib/utils/deviceDetection";

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
}

/**
 * EmailSubscribeForm Component (Molecule)
 * Reusable email subscription form with optional checkbox
 *
 * This molecule combines:
 * - Email input field
 * - Submit button
 * - Optional terms acceptance checkbox
 *
 * Features:
 * - Customizable submit text and placeholder
 * - Optional checkbox for terms/newsletter acceptance
 * - Multiple variants and sizes
 * - Horizontal or vertical layout
 * - Form validation
 * - Loading state support
 *
 * @example
 * ```tsx
 * <EmailSubscribeForm
 *   submitText="¡Notifícame!"
 *   placeholder="tucorreo@ejemplo.com"
 *   showCheckbox={true}
 *   checkboxLabel="Acepto recibir novedades"
 *   onSubmit={(email) => console.log(email)}
 * />
 *
 * <EmailSubscribeForm
 *   submitText="Suscribirse"
 *   inputVariant="outline"
 *   layout="vertical"
 *   showCheckbox={false}
 * />
 * ```
 */
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
}: EmailSubscribeFormProps) {
  const [email, setEmail] = React.useState("");
  const [accepted, setAccepted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
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

      setEmail("");
      setAccepted(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Ocurrió un error. Por favor, intenta nuevamente.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message="¡Gracias por suscribirte! Te notificaremos cuando esté disponible."
        type="success"
        duration={4000}
        show={showSuccessToast}
        onDismiss={() => setShowSuccessToast(false)}
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
            disabled={isSubmitting}
          />
          <Button
            variant={buttonVariant}
            size={size}
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : submitText}
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
