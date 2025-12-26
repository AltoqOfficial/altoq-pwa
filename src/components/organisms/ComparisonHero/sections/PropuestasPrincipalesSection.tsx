"use client";

import type { CandidateComparisonData } from "@/data";
import { PROPUESTAS_PRINCIPALES_CONFIG } from "../config";
import { ComparisonGrid } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Propuestas Principales Section
 * Three-column grid with list values and source tooltips
 */
export function PropuestasPrincipalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ComparisonGrid
      fields={PROPUESTAS_PRINCIPALES_CONFIG.fields!}
      leftData={leftCandidate?.propuestasPrincipales}
      rightData={rightCandidate?.propuestasPrincipales}
      leftCandidate={leftCandidate}
      rightCandidate={rightCandidate}
    />
  );
}
