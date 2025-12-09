"use client";

import { Typography } from "@/components/atoms";
import type { FieldConfig } from "./types";
import { renderValueWithSource } from "./utils";
import type { SourceableValue } from "./utils";

interface ComparisonGridProps {
  fields: FieldConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftData: Record<string, any> | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightData: Record<string, any> | null | undefined;
  className?: string;
}

/**
 * ComparisonGrid Component
 *
 * Renders a 3-column grid layout for comparing candidate data:
 * [Left Value] | [Label] | [Right Value]
 *
 * Supports source tooltips on hover for each value.
 */
export function ComparisonGrid({
  fields,
  leftData,
  rightData,
  className = "",
}: ComparisonGridProps) {
  return (
    <div
      className={`w-full border-t border-white space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16 ${className}`}
    >
      {fields.map(({ key, label }) => (
        <div
          key={key}
          className="grid grid-cols-3 w-full gap-2 md:gap-0 items-center"
        >
          {/* Label in center */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="600"
            className="max-w-full md:max-w-[18rem] flex justify-center items-center mx-auto order-2 text-sm md:text-base lg:text-lg mb-2 md:mb-0 text-[10px]"
          >
            {label}
          </Typography>

          {/* Left value */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-1 text-xs md:text-sm lg:text-base"
          >
            {renderValueWithSource(leftData?.[key])}
          </Typography>

          {/* Right value */}
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="200"
            className="order-3 text-xs md:text-sm lg:text-base"
          >
            {renderValueWithSource(rightData?.[key])}
          </Typography>
        </div>
      ))}
    </div>
  );
}
