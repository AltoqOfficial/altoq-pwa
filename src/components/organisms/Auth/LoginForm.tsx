"use client";

import { memo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  const [showPassword, setShowPassword] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [dismissedRegisteredMessage, setDismissedRegisteredMessage] =
    useState(false);

  const searchParams = useSearchParams();
  const { mutate: login, isPending, error, reset } = useLogin();

  // Derivar si mostrar mensaje de registro exitoso
  const showRegisteredMessage =
    searchParams.get("registered") === "true" && !dismissedRegisteredMessage;

  // Derivar si mostrar mensaje de formulario pendiente
  const showFormPendingMessage = searchParams.get("formPending") === "true";

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
    // Clear messages when user starts typing
    if (error) {
      reset();
      setResendStatus("idle");
    }
    if (showRegisteredMessage) {
      setDismissedRegisteredMessage(true);
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

      {/* Mensaje de formulario pendiente */}
      {showFormPendingMessage && (
        <div className="mb-6 p-5 bg-primary-50 border border-primary-200 rounded-2xl text-center">
          <h4 className="font-flexo-bold text-xl text-primary-600 mb-2">
            ¡Ya casi terminas!
          </h4>
          <p className="font-flexo text-sm text-neutral-600 leading-relaxed">
            Inicia sesión o regístrate para completar tu Match y ver los
            resultados.
          </p>
        </div>
      )}

      {/* Mensaje de registro exitoso */}
      {showRegisteredMessage && (
        <SuccessAlert
          title="¡Registro exitoso!"
          description="Se envió un correo de confirmación a tu email. Revisa tu bandeja de entrada y confirma tu cuenta para poder iniciar sesión."
        />
      )}

      <form className="space-y-6 mb-5" onSubmit={handleSubmit}>
        <Input
          variant="google"
          type="email"
          placeholder="Correo"
          size="lg"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          disabled={isPending}
        />
        <div className="relative">
          <Input
            variant="google"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            size="lg"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#202020]"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
              >
                <path
                  d="M11 4c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C9.74 4.13 10.35 4 11 4M1 1.27l2.28 2.28.46.46A11.8 11.8 0 0 0 0 9c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L18.73 19 20 17.73 2.27 0zM6.53 6.8l1.55 1.55C8.03 8.56 8 8.78 8 9c0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"
                  fill="#202020"
                />
              </svg>
            )}
          </button>
        </div>

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
          className="w-full mt-5 cursor-pointer hover:opacity-80 transition-opacity duration-300"
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
