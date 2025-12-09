"use client";

import type { CandidateComparisonData } from "@/data";
import { ComparisonGrid } from "../components/shared";
import { COHERENCIA_PLAN_CONFIG } from "../config";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Coherencia con el Plan Section
 * Uses dynamic ComparisonGrid with configuration
 */
export function CoherenciaConElPlanSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  return (
    <ComparisonGrid
      fields={COHERENCIA_PLAN_CONFIG.fields!}
      leftData={leftCandidate?.coherenciaConElPlan}
      rightData={rightCandidate?.coherenciaConElPlan}
    />
  );
}
