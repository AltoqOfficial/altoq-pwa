import type { Metadata } from "next";
import { DashboardLayout } from "@/components/organisms/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard - Altoq",
  description: "Panel de control de Altoq para información electoral de Perú",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Layout
 * Custom layout for authenticated users
 * Contains Sidebar and main content area
 * Does NOT include the landing page Header/Footer
 */
export default function DashboardRootLayout({
  children,
}: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
