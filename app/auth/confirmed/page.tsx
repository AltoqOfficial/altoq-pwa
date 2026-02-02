"use client";

import { useEffect } from "react";
import { Logo } from "@/components/atoms/Logo";

/**
 * Auth Confirmed Page
 * Client-side page shown after email confirmation
 * Uses window.location.href to force full page reload
 * This ensures the Header re-reads cookies and shows logged-in state
 * Always redirects to home page (/)
 */
export default function AuthConfirmedPage() {
  useEffect(() => {
    // Small delay for visual feedback
    const timer = setTimeout(() => {
      // Full page reload to ensure Header updates
      window.location.href = "/";
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center">
      <Logo variant="white" size="lg" className="mb-8 animate-pulse" />
      <p className="text-white/60 text-sm">Verificando tu cuenta...</p>
    </div>
  );
}
