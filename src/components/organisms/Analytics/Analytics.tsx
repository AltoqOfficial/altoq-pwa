"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/analytics/gtag";

/**
 * Analytics Component
 *
 * Componente que rastrea automáticamente las páginas vistas cuando el usuario navega.
 * Se coloca en el layout principal para que funcione en toda la aplicación.
 *
 * Features:
 * - Rastreo automático de navegación
 * - Incluye parámetros de búsqueda (query params) en el rastreo
 * - Solo se ejecuta en el cliente
 * - Funciona con el App Router de Next.js 13+
 */
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construir la URL completa con los query params
    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Registrar la página vista
    pageview(url);
  }, [pathname, searchParams]);

  // Este componente no renderiza nada
  return null;
}
