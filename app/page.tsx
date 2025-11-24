import { Metadata } from "next";

import { HeroSection } from "@/components/organisms/HeroSection";
import { CompareSection } from "@/components/organisms/CompareSection";
import { IdealCandidateSection } from "@/components/organisms/IdealCandidateSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { SuggestionsSection } from "@/components/organisms/SuggestionsSection";

export const metadata: Metadata = {
  title: "Altoq - Vota Informado en las Elecciones 2026",
  description:
    "Plataforma para conocer candidatos y comparar propuestas en las Elecciones Generales 2026 del Perú",
};

/**
 * Home Page (Landing Page)
 * Route: /
 *
 * Sections:
 * 1. Hero Section - Countdown timer + hero message
 * 2. Compare Section - Preview of comparison feature (VS)
 * 3. Ideal Candidate Section - "Mi Candidato Ideal" feature
 * 4. FAQ Section - Preguntas Frecuentes
 * 5. Suggestions Section - Caja de sugerencias
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section with Countdown */}
      <HeroSection />

      {/* Candidate Comparison Preview */}
      <CompareSection />

      {/* Ideal Candidate Feature */}
      <IdealCandidateSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Suggestions Box */}
      <SuggestionsSection />
    </>
  );
}
