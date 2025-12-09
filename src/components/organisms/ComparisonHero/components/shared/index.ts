/**
 * Shared components and utilities for ComparisonHero
 */

// Types
export * from "./types";

// Utilities
export * from "./utils";

// Layout Components
export { ComparisonGrid } from "./ComparisonGrid";
export { TwoColumnLayout } from "./TwoColumnLayout";
export { ListComparisonLayout } from "./ListComparisonLayout";

// Tooltip
export {
  SourceTooltip,
  extractValue,
  extractSource,
  hasSource,
} from "./SourceTooltip";
export type { ValueWithSource, ArrayValueWithSource } from "./SourceTooltip";
