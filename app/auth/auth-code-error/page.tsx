"use client";

import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";

/**
 * Auth Code Error Page
 * Shown when email confirmation fails
 */
export default function AuthCodeErrorPage() {
  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
      <Logo variant="white" size="lg" className="mb-8" />
      <h2 className="text-white text-xl font-bold mb-4">
        Error de verificación
      </h2>
      <p className="text-white/60 text-sm mb-8 max-w-sm">
        No pudimos verificar tu cuenta. El enlace puede haber expirado o ya fue
        utilizado.
      </p>
      <Link
        href="/login"
        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Ir a iniciar sesión
      </Link>
    </div>
  );
}
