import { DashboardContent } from "@/components/organisms/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Altoq",
  description:
    "Accede a comparaciones de candidatos, tu match político y novedades electorales en Perú.",
};

/**
 * Dashboard Page
 * Main page shown after user login
 * Displays quick access to key features:
 * - Compare candidates
 * - Political match
 * - Political parties
 * - Electoral news
 */
export default function DashboardPage() {
  return <DashboardContent />;
}
