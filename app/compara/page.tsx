import { Metadata } from "next";

import { ComparisonHero } from "@/components/organisms/ComparisonHero";

export const metadata: Metadata = {
  title: "Comparar Candidatos | Altoq",
  description:
    "Compara las propuestas y trayectorias de los candidatos presidenciales para las Elecciones 2026",
};

/**
 * Compare Page (Comparar Candidatos)
 * Route: /compara
 *
 * Sections:
 * 1. Comparison Hero - Header with "A COMPARAR!" title
 * 2. Candidate Selector - Side-by-side candidate selection (VS style)
 * 3. Comparison Tabs - Tabs with comparison data:
 *    - I. Perfil General
 *    - II. Trayectoria Política
 *    - III. Antecedentes e Investigaciones
 *    - IV. Propuestas por Temas
 *    - V. Coherencia con el Plan del Partido
 *    - VI. Financiamiento
 */
export default function ComparePage() {
  return (
    <>
      {/* Hero Section */}
      <ComparisonHero />
    </>
  );
}
