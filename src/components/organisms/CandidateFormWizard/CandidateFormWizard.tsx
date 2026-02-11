"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Logo } from "@/components/atoms/Logo";
import { motion } from "framer-motion";
import { FormStep, AnswerValue } from "./types";
import { FORM_SECTIONS } from "./constants";
import { QuestionItem } from "./QuestionItem";
import {
  calculatePoliticalMatch,
  MatchCandidate,
} from "@/lib/utils/political-match";
import { MatchResults } from "./MatchResults";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";

const FORM_STORAGE_KEY = "altoq_candidate_form_v2";

// Loading messages that cycle during progress
const LOADING_MESSAGES = [
  "Estudiando tus respuestas...",
  "Analizando tus preferencias...",
  "Comparando con propuestas...",
  "Procesando información...",
  "Casi listo...",
];

export interface CandidateFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialAnswer?: { questionId: string; value: AnswerValue } | null;
}

export const CandidateFormWizard: React.FC<CandidateFormWizardProps> = ({
  isOpen,
  onClose,
  initialAnswer,
}) => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useUserProfile();
  const isAuthenticated = !!user && !isLoadingUser;
  const { resolvedTheme } = useTheme();
  const { track } = useAnalytics();

  /*
   * Start - Hydration Mismatch Fix
   * We need to wait for the component to mount before using theme data
   * to avoid server/client mismatch errors.
   */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is necessary for hydration mismatch handling
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // If user is not logged in, force light theme
  // If user is logged in, respect their theme selection
  // During SSR (not mounted), default to false (light) to match server
  const isDark = mounted && user ? resolvedTheme === "dark" : false;
  /* End - Hydration Mismatch Fix */

  const [responses, setResponses] = useState<Record<string, AnswerValue>>(
    () => {
      let initialResponses: Record<string, AnswerValue> = {};

      // 1. Try to load from localStorage
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(FORM_STORAGE_KEY);
        if (saved) {
          try {
            initialResponses = JSON.parse(saved).responses || {};
          } catch (e) {
            console.error("Error loading responses", e);
          }
        }
      }

      // 2. Merge initialAnswer if provided (e.g. from Zero-Click Start)
      if (initialAnswer) {
        initialResponses = {
          ...initialResponses,
          [initialAnswer.questionId]: initialAnswer.value,
        };
      }

      return initialResponses;
    }
  );

  const [step, setStep] = useState<FormStep>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved).step || 1;
        } catch (e) {
          console.error("Error loading step", e);
        }
      }
    }
    return 1;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchResults, setMatchResults] = useState<MatchCandidate[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Compute loading message based on progress (derived state, no useEffect needed)
  const loadingMessage =
    LOADING_MESSAGES[
      Math.min(Math.floor(progress / 20), LOADING_MESSAGES.length - 1)
    ];

  // Scroll to top when step changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).lenis) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [step]);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(responses).length > 0) {
      localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({ responses, step })
      );
    }
  }, [responses, step]);

  if (!isOpen) return null;

  const currentSection = FORM_SECTIONS[step - 1];

  // Check if all questions in current section are answered
  const isSectionComplete = currentSection.questions.every(
    (q) => !!responses[q.id]
  );

  const handleAnswer = (questionId: string, value: AnswerValue) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));

    // B2B Tracking: Insight Capture
    track({
      name: "question_answered",
      properties: {
        questionId,
        topic: currentSection.title,
        answerValue: value, // "A", "B", etc.
      },
    });
  };

  const nextStep = () => {
    if (step < 5) {
      setStep((prev) => (prev + 1) as FormStep);
    } else {
      submitForm();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as FormStep);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setProgress(0);

    // Progress simulation for 3 seconds
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    // Wait for progress to complete
    await new Promise((r) => setTimeout(r, duration + 500));
    clearInterval(timer);

    // Check authentication status
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login with message
      setIsSubmitting(false);
      router.push("/login?formPending=true");
      return;
    }

    // Authenticated users see results
    console.log("Submitting final responses:", responses);

    // Calculate Match
    const results = calculatePoliticalMatch(
      responses as Record<string, string>
    );
    setMatchResults(results);

    // B2B Tracking: Match Completed
    if (results.length > 0) {
      track({
        name: "match_completed",
        properties: {
          topCandidateId: results[0].id,
          matchPercentage: results[0].score, // Score is already 0-100 or similar
          timeToCompleteSeconds: 0, // TODO: Add timer
        },
      });
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  if (isSubmitting) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-200 flex flex-col items-center justify-center p-6 text-center select-none",
          isDark
            ? "bg-neutral-950 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"
            : "bg-white"
        )}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 1],
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mb-12 relative"
        >
          {/* Glow effect backing for logo in dark mode */}
          {isDark && (
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-full transform scale-150" />
          )}
          <Logo
            variant={isDark ? "white" : "default"}
            size="lg"
            className="scale-150 relative z-10"
          />
        </motion.div>

        <motion.h2
          key={loadingMessage}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "text-2xl md:text-3xl font-flexo-bold uppercase tracking-wider mb-4",
            isDark ? "text-white" : "text-neutral-900"
          )}
        >
          {loadingMessage}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "text-sm md:text-base max-w-sm mb-16 leading-relaxed font-flexo",
            isDark ? "text-white/70" : "text-neutral-600"
          )}
        >
          Altoq nunca influirá en tus decisiones, somos una plataforma neutral
        </motion.p>

        <div className="relative">
          <span
            className={cn(
              "text-3xl font-flexo-bold tabular-nums",
              isDark ? "text-white" : "text-neutral-900"
            )}
          >
            {Math.round(progress)}%
          </span>
          {/* Subtle underline progress */}
          <div
            className={cn(
              "absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full overflow-visible", // overflow-visible for glow
              isDark ? "bg-neutral-800" : "bg-neutral-200"
            )}
          >
            <motion.div
              className={cn(
                "h-full bg-primary-600 rounded-full",
                isDark && "shadow-[0_0_10px_rgba(220,38,38,0.8)]" // Red glow
              )}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return <MatchResults onClose={onClose} results={matchResults} />;
  }

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "min-h-screen w-full relative z-100 selection:bg-primary-600/30",
        isDark ? "bg-[#1a1a1a]" : "bg-white"
      )}
    >
      {/* Top Progress Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-1 z-110",
          isDark ? "bg-white/10" : "bg-neutral-200"
        )}
      >
        <div
          className="h-full bg-primary-600 transition-all duration-500"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-30">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-8 bg-[#FF0000]" />
            <div>
              <p className="text-[#FF0000] font-bold text-sm md:text-base uppercase tracking-wider font-flexo mb-1">
                Sección {step}/5
              </p>
              <p
                className={cn(
                  "text-xs md:text-sm font-bold uppercase tracking-widest",
                  isDark ? "text-white/60" : "text-neutral-600"
                )}
              >
                {currentSection.title}
              </p>
              <h2
                className={cn(
                  "text-xl md:text-2xl font-bold font-flexo-bold mt-1",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                {currentSection.description}
              </h2>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {currentSection.questions.map((q, idx) => (
            <QuestionItem
              key={q.id}
              index={idx + 1}
              question={q}
              selectedAnswer={responses[q.id] || ""}
              onChange={(val) => handleAnswer(q.id, val)}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Navigation Footer */}
        <div
          className={cn(
            "fixed bottom-0 left-0 w-full backdrop-blur-md border-t p-4 md:p-6 z-110",
            isDark
              ? "bg-[#1a1a1a]/95 border-white/10"
              : "bg-white/95 border-neutral-200"
          )}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="order-2 md:order-1 flex items-center gap-6">
              <button
                onClick={onClose}
                className={cn(
                  "transition-colors text-sm font-flexo-bold uppercase tracking-widest",
                  isDark
                    ? "text-white hover:text-neutral-300"
                    : "text-neutral-900 hover:text-neutral-600"
                )}
              >
                Cerrar
              </button>

              {step > 1 && (
                <button
                  onClick={prevStep}
                  className={cn(
                    "transition-colors text-sm font-flexo-bold uppercase tracking-widest",
                    isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  Anterior
                </button>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 order-1 md:order-2">
              <Button
                onClick={nextStep}
                disabled={!isSectionComplete || isSubmitting}
                className="w-full md:w-64 py-3 md:py-4 text-base md:text-lg"
              >
                {step === 5
                  ? isSubmitting
                    ? "Enviando..."
                    : "Enviar Respuestas"
                  : "Siguiente Paso"}
              </Button>
              <p
                className={cn(
                  "text-xs font-bold uppercase tracking-tighter mt-1",
                  isDark ? "text-neutral-300" : "text-neutral-600"
                )}
              >
                Página 0{step} de 05
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
