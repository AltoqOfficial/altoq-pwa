"use client";

import { memo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@/components/atoms";
import { useResetPassword } from "./hooks/useAuth";
import { ErrorAlert, SuccessAlert, InlineError } from "./components/AuthAlerts";

/**
 * ForgotPasswordForm Component
 *
 * Formulario para solicitar restablecimiento de contraseña.
 * Envía un email con el enlace para restablecer la contraseña.
 *
 * @example
 * ```tsx
 * <ForgotPasswordForm />
 * ```
 */
export const ForgotPasswordForm = memo(function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    mutate: resetPassword,
    isPending,
    error,
    isSuccess,
    reset,
  } = useResetPassword();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    // Validate email
    if (!email.trim()) {
      setValidationError("El correo es requerido");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("Ingresa un correo válido");
      return;
    }

    // Reset previous state
    reset();

    // Execute reset password mutation
    // redirectTo points to the update password page
    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/forgot-password`
        : "/forgot-password";

    resetPassword({
      email: email.trim(),
      redirectTo: redirectUrl,
    });
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (validationError) {
      setValidationError(null);
    }
    if (error) {
      reset();
    }
  };

  // Render error component
  const renderError = () => {
    if (error) {
      return <ErrorAlert error={error} context="forgot" />;
    }
    if (validationError) {
      return (
        <InlineError
          message={validationError}
          helperText="Asegúrate de que tenga un formato como este: ejemplo@email.com"
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-[#FEFEFE80] w-full md:w-[60%] lg:w-[30%] min-w-0 md:min-w-80 p-6 md:p-8 rounded-2xl flex flex-col mx-auto">
      <div className="w-full flex flex-col items-center mb-4 md:mb-6">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={100}
          height={50}
          className="py-2 md:py-4 mb-2"
          style={{ filter: "grayscale(1) brightness(0)" }}
        />
      </div>

      {isSuccess ? (
        // Success state
        <div className="space-y-6">
          <SuccessAlert
            title="¡Correo enviado!"
            description="Revisa tu bandeja de entrada y sigue el enlace para restablecer tu contraseña."
          />
          <Link
            href="/login"
            className="block text-center text-[#202020] font-flexo-bold text-base hover:opacity-80 transition-opacity"
          >
            Volver al Login
          </Link>
        </div>
      ) : (
        // Form state
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            variant="outline"
            type="email"
            placeholder="Correo electrónico"
            size="lg"
            value={email}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={isPending}
          />

          {renderError()}

          <Button
            variant="secondary"
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
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
                Enviando...
              </span>
            ) : (
              "Enviar al Correo"
            )}
          </Button>

          <Link
            href="/login"
            className="block text-center text-[#202020] font-flexo-bold text-base hover:opacity-80 transition-opacity"
          >
            Volver al Login
          </Link>
        </form>
      )}
    </div>
  );
});
