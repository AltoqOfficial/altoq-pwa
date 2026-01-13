"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// Routes that should NOT show the landing page Header/Footer
const dashboardRoutes = ["/dashboard"];

/**
 * ConditionalLayout
 * Conditionally renders Header and Footer based on current route
 * Dashboard routes have their own layout and don't need the landing page chrome
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current route is a dashboard route
  const isDashboardRoute = dashboardRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Dashboard routes render children directly (they have their own layout)
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Public routes render with Header and Footer
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
