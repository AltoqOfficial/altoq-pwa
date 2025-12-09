"use client";

import type { CandidateComparisonData } from "@/data";
import { ComparisonGrid } from "../components/shared";
import { IDEOLOGIA_POLITICA_CONFIG } from "../config";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Ideología Política Section
 * Uses dynamic ComparisonGrid with configuration
 */
export function IdeologiaPoliticaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ComparisonGrid
      fields={IDEOLOGIA_POLITICA_CONFIG.fields!}
      leftData={leftCandidate?.ideologiaPolitica}
      rightData={rightCandidate?.ideologiaPolitica}
    />
  );
}
