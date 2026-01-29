"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// Routes that should NOT show the landing page Header/Footer
const noLayoutRoutes = ["/dashboard"];

// Routes that render their own Header
const customHeaderRoutes = ["/compara"];

// Hydration-safe hook to detect client-side mounting
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
}

/**
 * ConditionalLayout
 * Conditionally renders Header and Footer based on current route and auth state
 * - Dashboard routes have their own layout
 * - Home page (/) hides Header/Footer for authenticated users (shows dashboard)
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isMounted = useIsMounted();

  // Check if current route is a no-layout route
  const isNoLayoutRoute = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Dashboard routes render children directly (they have their own layout)
  if (isNoLayoutRoute) {
    return <>{children}</>;
  }

  // Determine if we should show Header
  // On server and before mount, always show Header (default behavior)
  // After mount, check the route
  const isCustomHeaderRoute =
    isMounted && customHeaderRoutes.some((route) => pathname === route);

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
