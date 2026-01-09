"use client";

import { RegisterLayout } from "./RegisterLayout";
import { RegisterForm } from "./RegisterForm";

/**
 * Auth Component (Organism)
 *
 * Página de autenticación por defecto que muestra el formulario de login.
 * Redirige a /login para mantener consistencia.
 *
 * @deprecated Use `/login` o `/register` directamente
 *
 * @example
 * ```tsx
 * <Auth />
 * ```
 */
export function Auth() {
  return (
    <RegisterLayout>
      <RegisterForm />
    </RegisterLayout>
  );
}
