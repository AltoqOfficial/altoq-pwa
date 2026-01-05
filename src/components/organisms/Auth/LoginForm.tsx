"use client";

import { memo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Input } from "@/components/atoms";
import { useLogin } from "./hooks/useAuth";
import {
  ErrorAlert,
  SuccessAlert,
  LoadingAlert,
} from "./components/AuthAlerts";
import type { LoginFormState } from "./types/auth.types";

/**
 * LoginForm Component
 *
 * Formulario de inicio de sesión para la página de autenticación.
 * Conectado con useLogin hook para autenticación via API.
 * Incluye manejo de errores amigable con mensajes en español.
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export const LoginForm = memo(function LoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const { mutate: login, isPending, error, reset } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Early return if fields are empty
    if (!formData.email.trim() || !formData.password.trim()) {
      return;
    }

    // Reset previous errors
    reset();
    setResendStatus("idle");

    // Execute login mutation
    login({
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  const handleInputChange = (field: keyof LoginFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) {
      reset();
      setResendStatus("idle");
    }
  };

  const handleResendEmail = async () => {
    if (resendStatus !== "idle") return;

    setResendStatus("sending");

    // TODO: Implement resend email endpoint when available
    // For now, simulate a delay and show success
    setTimeout(() => {
      setResendStatus("sent");
    }, 1500);
  };

  return (
    <div className="bg-[#FEFEFE80] w-full md:w-[60%] lg:w-[30%] min-w-0 md:min-w-80 p-6 md:p-8 lg:p-10 rounded-2xl flex flex-col mx-auto">
      <div className="w-full flex flex-col items-center mb-6 md:mb-8">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={100}
          height={50}
          className="py-2 md:py-4 mb-3 md:mb-5"
          style={{
            filter: "grayscale(1) brightness(0)",
          }}
        />
        <h3 className="font-flexo-bold text-3xl md:text-4xl lg:text-5xl text-center">
          ¡Hola de Nuevo!
        </h3>
      </div>

      <form className="space-y-6 mb-5" onSubmit={handleSubmit}>
        <Input
          variant="outline"
          type="email"
          placeholder="Correo"
          size="lg"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={isPending}
        />
        <Input
          variant="outline"
          type="password"
          placeholder="Contraseña"
          size="lg"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          disabled={isPending}
        />

        {/* Error message display */}
        {error && (
          <ErrorAlert
            error={error}
            context="login"
            onResendEmail={handleResendEmail}
            isResending={resendStatus === "sending"}
          />
        )}

        {/* Resend email success message */}
        {resendStatus === "sent" && (
          <SuccessAlert
            title="Correo enviado"
            description="Revisa tu bandeja de entrada y sigue el enlace para confirmar tu cuenta."
          />
        )}

        {/* Resend email loading */}
        {resendStatus === "sending" && (
          <LoadingAlert message="Enviando correo de confirmación..." />
        )}

        <Link
          href="/forgot"
          className="text-[#202020] font-flexo text-lg flex justify-end hover:underline transition-all cursor-pointer -mt-1 -mb-0.5"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Button
          variant="secondary"
          type="submit"
          size="lg"
          className="w-full mt-5"
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
              Cargando...
            </span>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>

      <div className="flex flex-col items-center gap-4 mt-5">
        <Typography className="font-flexo text-lg">
          ¿No tienes una cuenta?
        </Typography>
        <Link
          href="/register"
          className="text-[#202020] font-flexo-bold text-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
});
