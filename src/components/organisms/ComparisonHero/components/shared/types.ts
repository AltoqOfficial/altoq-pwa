/**
 * Shared types for ComparisonHero components
 */

import type { CandidateComparisonData } from "@/data";

/**
 * Common props for section components
 */
export interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Value types that can be rendered
 */
export type RenderableValue = string | string[] | number | undefined | null;

/**
 * Field configuration for dynamic sections
 */
export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "list" | "number";
}

/**
 * Section layout types
 */
export type SectionLayoutType =
  | "three-column"
  | "two-column-split"
  | "list-comparison"
  | "custom";

/**
 * Section configuration
 */
export interface SectionConfig {
  id: string;
  title: string;
  dataKey: keyof CandidateComparisonData;
  layout: SectionLayoutType;
  fields?: FieldConfig[];
  customRender?: boolean;
}
