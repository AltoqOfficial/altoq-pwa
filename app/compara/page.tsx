import { ComparisonHero } from "@/components/organisms/ComparisonHero";
import { generateMetadata } from "@/lib/config/seo";

export const metadata = generateMetadata({
  title: "Comparar Candidatos",
  description:
    "Compara candidatos presidenciales para las Elecciones 2026 en Perú. Analiza propuestas, trayectorias, antecedentes, planes de gobierno y financiamiento. Herramienta gratuita para votar informado.",
  keywords: [
    "comparar candidatos presidenciales",
    "comparar candidatos 2026",
    "comparación candidatos perú",
    "propuestas presidenciales 2026",
    "trayectoria candidatos",
    "antecedentes candidatos",
    "planes de gobierno 2026",
    "análisis candidatos presidenciales",
  ],
  path: "/compara",
  type: "website",
});

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
    <div className="min-h-screen bg-neutral-500">
      {/* Hero Section */}
      <ComparisonHero />
    </div>
  );
}
