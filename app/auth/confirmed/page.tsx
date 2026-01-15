"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";

const FORM_STORAGE_KEY = "altoq_candidate_form_v2";

/**
 * Auth Confirmed Page
 * Client-side page that checks for pending form after email confirmation
 * Redirects to:
 * - /formulario-candidato?showResults=true if there's a pending form
 * - / (home/dashboard) otherwise
 */
export default function AuthConfirmedPage() {
  const router = useRouter();

  useEffect(() => {
    // Check for pending form in localStorage
    const pendingForm = localStorage.getItem(FORM_STORAGE_KEY);

    // Small delay for visual feedback
    const timer = setTimeout(() => {
      if (pendingForm) {
        router.replace("/formulario-candidato?showResults=true");
      } else {
        router.replace("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center">
      <Logo variant="white" size="lg" className="mb-8 animate-pulse" />
      <p className="text-white/60 text-sm">Verificando tu cuenta...</p>
    </div>
  );
}
