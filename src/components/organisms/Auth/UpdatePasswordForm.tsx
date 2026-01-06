"use client";

import {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Typography, Button, Input } from "@/components/atoms";
import { ErrorAlert, InlineError, SuccessAlert } from "./components/AuthAlerts";
import { supabase } from "@/lib/supabase";

// ==================== Types ====================

interface PasswordValidation {
  hasLetter: boolean;
  hasNumberOrSpecial: boolean;
  hasMinLength: boolean;
}

type FormStatus = "loading" | "ready" | "submitting" | "success" | "error";

// ==================== Sub-Components ====================

/**
 * Indicador de validación de contraseña
 */
const PasswordRequirement = memo(function PasswordRequirement({
  met,
  text,
}: {
  met: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        // Check icon when met
        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        // Error icon when not met
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          className="w-4 h-4"
        >
          <path
            d="M7.5 0C3.36 0 0 3.247 0 7.247s3.36 7.247 7.5 7.247S15 11.248 15 7.247 11.64 0 7.5 0m.75 10.87h-1.5V9.422h1.5zm0-2.898h-1.5V3.624h1.5z"
            fill="#b3261e"
          />
        </svg>
      )}
      <span
        className={`text-sm font-flexo ${met ? "text-black" : "text-[#b3261e]"}`}
      >
        {text}
      </span>
    </div>
  );
});

/**
 * Spinner de carga
 */
const LoadingSpinner = memo(function LoadingSpinner({
  text = "Actualizando...",
}: {
  text?: string;
}) {
  return (
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
      {text}
    </span>
  );
});

// ==================== Main Component ====================

/**
 * UpdatePasswordForm Component
 *
 * Formulario para actualizar la contraseña después de recibir el enlace de recuperación.
 * Procesa los tokens de la URL para establecer la sesión de Supabase antes de permitir
 * la actualización de contraseña.
 *
 * @example
 * ```tsx
 * <UpdatePasswordForm />
 * ```
 */
export const UpdatePasswordForm = memo(function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<FormStatus>("loading");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Process URL hash tokens on mount
  useEffect(() => {
    const processTokens = async () => {
      // Get the hash from the URL (contains tokens from Supabase email link)
      const hash = window.location.hash;

      if (hash) {
        // Parse the hash parameters
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const type = params.get("type");

        if (accessToken && refreshToken && type === "recovery") {
          // Set the session using the tokens from the URL
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Error setting session:", error);
            setApiError(
              "El enlace de recuperación ha expirado o es inválido. Por favor, solicita uno nuevo."
            );
            setStatus("error");
            return;
          }

          // Clear the hash from URL for security
          window.history.replaceState(null, "", window.location.pathname);
          setStatus("ready");
          return;
        }
      }

      // Check if user already has a valid session (e.g., came from email link earlier)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setStatus("ready");
        return;
      }

      // No valid session or tokens
      setApiError(
        "No se encontró una sesión válida. Por favor, usa el enlace de tu correo electrónico."
      );
      setStatus("error");
    };

    processTokens();
  }, []);

  // Password validation
  const passwordValidation = useMemo<PasswordValidation>(
    () => ({
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumberOrSpecial: /[0-9#?!@$%^&*\-]/.test(password),
      hasMinLength: password.length >= 10,
    }),
    [password]
  );

  const isPasswordValid =
    passwordValidation.hasLetter &&
    passwordValidation.hasNumberOrSpecial &&
    passwordValidation.hasMinLength;

  const handleInputChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (validationError) setValidationError(null);
      if (apiError) setApiError(null);
    },
    [validationError, apiError]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);
    setApiError(null);

    if (!isPasswordValid) {
      setValidationError("La contraseña no cumple los requisitos");
      return;
    }

    setStatus("submitting");

    try {
      // Update password directly with Supabase client
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Error updating password:", error);
        setApiError(
          error.message ||
            "No se pudo actualizar la contraseña. Por favor, intenta de nuevo."
        );
        setStatus("ready");
        return;
      }

      // Sign out to clear the recovery session
      await supabase.auth.signOut();

      setStatus("success");

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/login?passwordUpdated=true");
      }, 2000);
    } catch (error) {
      console.error("Unexpected error:", error);
      setApiError("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
      setStatus("ready");
    }
  };

  // Render loading state
  if (status === "loading") {
    return (
      <div className="bg-[#FEFEFE80] w-full md:w-[60%] lg:w-[30%] min-w-0 md:min-w-80 p-6 md:p-8 rounded-2xl flex flex-col mx-auto items-center">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={100}
          height={50}
          className="py-2 md:py-4 mb-6"
          style={{ filter: "grayscale(1) brightness(0)" }}
        />
        <LoadingSpinner text="Verificando enlace..." />
      </div>
    );
  }

  // Render error state (invalid/expired link)
  if (status === "error") {
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
        <div className="space-y-6">
          <ErrorAlert
            error={{
              error: apiError || "Error desconocido",
              code: "session_error",
            }}
            context="update"
          />
          <Link
            href="/forgot"
            className="block text-center text-[#202020] font-flexo-bold text-base hover:opacity-80 transition-opacity"
          >
            Solicitar nuevo enlace
          </Link>
          <Link
            href="/login"
            className="block text-center text-[#202020] font-flexo text-sm hover:opacity-80 transition-opacity"
          >
            Volver al Login
          </Link>
        </div>
      </div>
    );
  }

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

      {status === "success" ? (
        // Success state
        <div className="space-y-6">
          <SuccessAlert
            title="¡Contraseña actualizada!"
            description="Tu contraseña ha sido actualizada correctamente. Redirigiendo al login..."
          />
          <Link
            href="/login"
            className="block text-center text-[#202020] font-flexo-bold text-base hover:opacity-80 transition-opacity"
          >
            Ir al Login
          </Link>
        </div>
      ) : (
        // Form state
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Header similar al registro pero sin paso */}
          <div className="mb-6">
            <Typography className="font-flexo-bold text-lg text-[#202020]">
              Introduce tu nueva contraseña
            </Typography>
          </div>

          {/* Password input */}
          <div className="relative">
            <Input
              variant="outline"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              size="lg"
              value={password}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={status === "submitting"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#202020] opacity-50 hover:opacity-100 transition-opacity"
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

          {/* Password requirements */}
          <div className="space-y-2">
            <Typography className="text-sm text-[#202020] font-flexo">
              La contraseña debe tener al menos
            </Typography>
            <div className="space-y-1.5 pl-1">
              <PasswordRequirement
                met={passwordValidation.hasLetter}
                text="1 letra"
              />
              <PasswordRequirement
                met={passwordValidation.hasNumberOrSpecial}
                text="1 número o carácter especial (ejemplo: #, ?, !, o &)"
              />
              <PasswordRequirement
                met={passwordValidation.hasMinLength}
                text="10 caracteres"
              />
            </div>
          </div>

          {/* Error messages */}
          {apiError && (
            <ErrorAlert
              error={{ error: apiError, code: "update_error" }}
              context="update"
            />
          )}
          {validationError && <InlineError message={validationError} />}

          <Button
            variant="secondary"
            type="submit"
            size="lg"
            className="w-full mt-4"
            disabled={status === "submitting" || !isPasswordValid}
          >
            {status === "submitting" ? (
              <LoadingSpinner />
            ) : (
              "Actualizar contraseña"
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
