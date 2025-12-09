"use client";

import type { CandidateComparisonData } from "@/data";
import { ListComparisonLayout } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Transparencia Section
 * Uses ListComparisonLayout for simple list display
 */
export function TransparenciaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ListComparisonLayout
      leftCandidate={leftCandidate}
      rightCandidate={rightCandidate}
      dataKey="transparencia"
    />
  );
}
