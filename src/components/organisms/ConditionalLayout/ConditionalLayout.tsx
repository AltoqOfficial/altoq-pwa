"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// Routes that should NOT show the landing page Header/Footer
const noLayoutRoutes = ["/dashboard"];

// Routes that render their own Header
const customHeaderRoutes = [
  "/",
  "/compara",
  "/formulario-candidato",
  "/login",
  "/register",
  "/forgot",
  "/forgot-password",
];

/**
 * ConditionalLayout
 * Conditionally renders Header and Footer based on current route and auth state
 * - Dashboard routes have their own layout
 * - Home page (/) hides Header/Footer for authenticated users (shows dashboard)
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  // Check if current route is a no-layout route
  const isNoLayoutRoute = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Dashboard routes render children directly (they have their own layout)
  if (isNoLayoutRoute) {
    return <>{children}</>;
  }

  // Determine if we should show Header
  // Check the route directly (consistent on server and client)
  const isCustomHeaderRoute = customHeaderRoutes.some(
    (route) => pathname === route
  );

  // Public routes render with Header and Footer
  return (
    <div className="flex min-h-screen flex-col">
      {!isCustomHeaderRoute && <Header />}
      <main className="flex-1" id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
