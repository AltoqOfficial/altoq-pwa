"use client";

import type { CandidateComparisonData } from "@/data";
import type { SectionDefinition } from "../config";
import { ComparisonGrid, ListComparisonLayout } from "./shared";
import type { RenderableValue } from "./shared";

interface DynamicSectionProps {
  config: SectionDefinition;
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * DynamicSection Component
 *
 * Renders a section dynamically based on configuration.
 * Supports three-column grid, two-column split, and list comparison layouts.
 */
export function DynamicSection({
  config,
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const { dataKey, layout, fields } = config;

  // Get data from candidates based on dataKey
  const leftData = leftCandidate?.[dataKey as keyof CandidateComparisonData] as
    | Record<string, RenderableValue>
    | undefined;
  const rightData = rightCandidate?.[
    dataKey as keyof CandidateComparisonData
  ] as Record<string, RenderableValue> | undefined;

  // Three-column grid layout (Label in center, values on sides)
  if (layout === "three-column" && fields) {
    return (
      <ComparisonGrid
        fields={fields}
        leftData={leftData}
        rightData={rightData}
      />
    );
  }

  // List comparison layout (simple two-column list)
  if (layout === "list-comparison") {
    return (
      <ListComparisonLayout
        leftCandidate={leftCandidate}
        rightCandidate={rightCandidate}
        dataKey={dataKey as keyof CandidateComparisonData}
      />
    );
  }

  // Default fallback
  return null;
}
