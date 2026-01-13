"use client";

import { memo, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Input, Select } from "@/components/atoms";
import { useSignup } from "./hooks/useAuth";
import { ErrorAlert, InlineError } from "./components/AuthAlerts";
import type { SignupFormState } from "./types/auth.types";

// ==================== Types ====================

type RegisterStep = "email" | "password" | "profile" | "questions";

interface PasswordValidation {
  hasLetter: boolean;
  hasNumberOrSpecial: boolean;
  hasMinLength: boolean;
}

// ==================== Constants ====================

const STEP_CONFIG = {
  password: { number: 1, total: 3, title: "Crea una contraseña" },
  profile: { number: 2, total: 3, title: "Háblanos de ti" },
  questions: { number: 3, total: 3, title: "Responde estas preguntas" },
} as const;

const AGE_OPTIONS = [
  { value: "YOUTH", label: "18 - 21" },
  { value: "ADULT", label: "22 - 39" },
  { value: "SENIOR", label: "40 a más" },
];

const MOTIVATION_OPTIONS = [
  { value: "DECISION", label: "Tomar mejores decisiones antes de votar" },
  {
    value: "PROMISES",
    label: "Saber si los políticos cumplen lo que prometen",
  },
  { value: "ANALYSIS", label: "Quiero información confiable para mi análisis" },
  { value: "CHANGE", label: "Quiero impulsar el cambio con información real" },
];

const PROFILE_OPTIONS = [
  { value: "student", label: "Estudiante" },
  { value: "professional", label: "Profesional" },
  { value: "entrepreneur", label: "Emprendedor" },
  { value: "retired", label: "Jubilado" },
  { value: "other", label: "Otro" },
];

// ==================== Sub-Components ====================

/**
 * Barra de progreso visual
 */
const ProgressBar = memo(function ProgressBar({ step }: { step: number }) {
  const progress = (step / 3) * 100;

  return (
    <div className="w-full h-1 bg-[#000000] rounded-full overflow-hidden mb-4">
      <div
        className="h-full bg-[#B3261E] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

/**
 * Header con navegación de pasos
 */
const StepHeader = memo(function StepHeader({
  stepNumber,
  totalSteps,
  title,
  onBack,
}: {
  stepNumber: number;
  totalSteps: number;
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <button
        type="button"
        onClick={onBack}
        className="text-2xl text-[#202020] hover:opacity-70 transition-opacity mt-1 cursor-pointer"
        aria-label="Volver al paso anterior"
      >
        ‹
      </button>
      <div>
        <Typography className="text-[#B3261E] font-flexo text-sm">
          Paso {stepNumber} de {totalSteps}
        </Typography>
        <Typography className="font-flexo-bold text-lg text-[#202020]">
          {title}
        </Typography>
      </div>
    </div>
  );
});

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
const LoadingSpinner = memo(function LoadingSpinner() {
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
      Creando cuenta...
    </span>
  );
});

// ==================== Main Component ====================

/**
 * RegisterForm Component - Multi-step wizard
 *
 * Formulario de registro paso a paso:
 * - Email inicial
 * - Paso 1: Contraseña
 * - Paso 2: Nombre + Edad
 * - Paso 3: Motivación + Perfil
 */
export const RegisterForm = memo(function RegisterForm() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageRangeCode: "",
    motivationCode: "",
    profileCode: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: signup, isPending, error, reset } = useSignup();

  // Password validation
  const passwordValidation = useMemo<PasswordValidation>(
    () => ({
      hasLetter: /[a-zA-Z]/.test(formData.password),
      hasNumberOrSpecial: /[0-9#?!@$%^&*\-]/.test(formData.password),
      hasMinLength: formData.password.length >= 10,
    }),
    [formData.password]
  );

  const isPasswordValid =
    passwordValidation.hasLetter &&
    passwordValidation.hasNumberOrSpecial &&
    passwordValidation.hasMinLength;

  const handleInputChange = useCallback(
    (field: keyof SignupFormState, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (validationError) setValidationError(null);
      if (error) reset();
    },
    [validationError, error, reset]
  );

  const goToStep = useCallback((step: RegisterStep) => {
    setValidationError(null);
    setCurrentStep(step);
  }, []);

  const handleBack = useCallback(() => {
    const stepMap: Record<RegisterStep, RegisterStep> = {
      email: "email",
      password: "email",
      profile: "password",
      questions: "profile",
    };
    goToStep(stepMap[currentStep]);
  }, [currentStep, goToStep]);

  const handleNextFromEmail = useCallback(() => {
    if (!formData.email.trim()) {
      setValidationError("El correo es requerido");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Ingresa un correo válido");
      return;
    }
    goToStep("password");
  }, [formData.email, goToStep]);

  const handleNextFromPassword = useCallback(() => {
    if (!isPasswordValid) {
      setValidationError("La contraseña no cumple los requisitos");
      return;
    }
    goToStep("profile");
  }, [isPasswordValid, goToStep]);

  const handleNextFromProfile = useCallback(() => {
    if (!formData.fullName.trim()) {
      setValidationError("El nombre es requerido");
      return;
    }
    if (!formData.ageRangeCode) {
      setValidationError("Selecciona tu rango de edad");
      return;
    }
    goToStep("questions");
  }, [formData.fullName, formData.ageRangeCode, goToStep]);

  const handleSubmit = useCallback(() => {
    if (!formData.motivationCode) {
      setValidationError("Selecciona tu motivación");
      return;
    }
    if (!formData.profileCode) {
      setValidationError("Selecciona tu perfil");
      return;
    }

    reset();
    signup({
      email: formData.email.trim(),
      password: formData.password,
      fullName: formData.fullName.trim(),
      ageRangeCode: formData.ageRangeCode,
      motivationCode: formData.motivationCode,
      profileCode: formData.profileCode,
    });
  }, [formData, signup, reset]);

  // Render error component - uses ErrorAlert for API errors, InlineError for validation errors
  const renderError = () => {
    if (error) {
      return <ErrorAlert error={error} context="register" />;
    }
    if (validationError) {
      return <InlineError message={validationError} />;
    }
    return null;
  };

  // ==================== Render Steps ====================

  const renderEmailStep = () => (
    <>
      <div className="w-full flex flex-col items-center mb-4 md:mb-6">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={100}
          height={50}
          className="py-2 md:py-4 mb-1"
          style={{ filter: "grayscale(1) brightness(0)" }}
        />
        <h3 className="font-flexo-bold text-2xl md:text-3xl lg:text-4xl text-center leading-8 max-w-60 mb-4">
          Regístrate para votar informado
        </h3>
      </div>

      <div className="space-y-6">
        <Input
          variant="google"
          type="email"
          placeholder="Dirección de correo electrónico"
          size="lg"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        {renderError()}

        <Button
          variant="secondary"
          type="button"
          size="lg"
          className="w-full cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleNextFromEmail}
        >
          Siguiente
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2 mt-6">
        <Typography className="font-flexo text-base text-[#202020]">
          ¿Ya tienes una cuenta?
        </Typography>
        <Link
          href="/login"
          className="text-[#202020] font-flexo-bold text-base hover:opacity-80 transition-opacity"
        >
          Iniciar sesión
        </Link>
      </div>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <ProgressBar step={1} />
      <StepHeader
        stepNumber={STEP_CONFIG.password.number}
        totalSteps={STEP_CONFIG.password.total}
        title={STEP_CONFIG.password.title}
        onBack={handleBack}
      />

      <div className="space-y-8">
        <div className="relative">
          <Input
            variant="google"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            size="lg"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
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

        {renderError()}

        <Button
          variant="secondary"
          type="button"
          size="lg"
          className="w-full mt-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleNextFromPassword}
          disabled={!isPasswordValid}
        >
          Siguiente
        </Button>
      </div>
    </>
  );

  const renderProfileStep = () => (
    <>
      <ProgressBar step={2} />
      <StepHeader
        stepNumber={STEP_CONFIG.profile.number}
        totalSteps={STEP_CONFIG.profile.total}
        title={STEP_CONFIG.profile.title}
        onBack={handleBack}
      />

      <div className="space-y-8">
        <Input
          variant="google"
          type="text"
          placeholder="Nombre"
          size="lg"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />

        <Select
          variant="google"
          placeholder="Edad"
          size="lg"
          value={formData.ageRangeCode}
          onChange={(e) => handleInputChange("ageRangeCode", e.target.value)}
          options={AGE_OPTIONS}
        />

        {renderError()}

        <Button
          variant="secondary"
          type="button"
          size="lg"
          className="w-full mt-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleNextFromProfile}
        >
          Siguiente
        </Button>
      </div>
    </>
  );

  const renderQuestionsStep = () => (
    <>
      <ProgressBar step={3} />
      <StepHeader
        stepNumber={STEP_CONFIG.questions.number}
        totalSteps={STEP_CONFIG.questions.total}
        title={STEP_CONFIG.questions.title}
        onBack={handleBack}
      />

      <div className="space-y-8">
        <Select
          variant="google"
          placeholder="¿Qué te motiva a informarte sobre política?"
          size="lg"
          value={formData.motivationCode}
          onChange={(e) => handleInputChange("motivationCode", e.target.value)}
          options={MOTIVATION_OPTIONS}
          disabled={isPending}
        />

        <Select
          variant="google"
          placeholder="¿Con qué perfil te identificas?"
          size="lg"
          value={formData.profileCode}
          onChange={(e) => handleInputChange("profileCode", e.target.value)}
          options={PROFILE_OPTIONS}
          disabled={isPending}
        />

        {renderError()}

        <Button
          variant="secondary"
          type="button"
          size="lg"
          className="w-full mt-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner /> : "Siguiente"}
        </Button>
      </div>
    </>
  );

  // ==================== Main Render ====================

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "email":
        return renderEmailStep();
      case "password":
        return renderPasswordStep();
      case "profile":
        return renderProfileStep();
      case "questions":
        return renderQuestionsStep();
    }
  };

  return (
    <div className="bg-[#FEFEFE80] w-full md:w-[60%] lg:w-[30%] min-w-0 md:min-w-80 p-6 md:p-8 rounded-2xl flex flex-col mx-auto">
      <div className="w-full flex justify-center mb-2">
        {currentStep !== "email" && (
          <Image
            src="/images/logo/altoq.webp"
            alt="Altoq Logo"
            width={80}
            height={40}
            className="py-2 mb-2"
            style={{ filter: "grayscale(1) brightness(0)" }}
          />
        )}
      </div>
      {renderCurrentStep()}
    </div>
  );
});
