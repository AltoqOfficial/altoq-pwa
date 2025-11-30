import React from "react";

import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface TimelineItemProps {
  /**
   * Year or time period
   */
  year: string;
  /**
   * Title or description
   */
  title: string;
  /**
   * Additional description or details
   */
  description?: string | React.ReactNode;
  /**
   * Custom color for the timeline marker
   */
  markerColor?: string;
  /**
   * Custom color for the timeline line
   */
  lineColor?: string;
  /**
   * Whether this is the last item (no line below)
   */
  isLast?: boolean;
  /**
   * Custom className for wrapper
   */
  className?: string;
}

/**
 * TimelineItem Component (Molecule)
 * Timeline entry with year, title, and optional description
 *
 * This molecule displays a timeline event with:
 * - Vertical timeline line and marker
 * - Year/period label
 * - Title and optional description
 * - Customizable colors
 *
 * Features:
 * - Customizable marker and line colors
 * - Optional description
 * - Responsive design
 * - Support for React nodes in description
 *
 * @example
 * ```tsx
 * <TimelineItem
 *   year="2019 - 2022"
 *   title="Alcalde de Lima"
 * />
 *
 * <TimelineItem
 *   year="2020 - Actual"
 *   title="Líder de partido político"
 *   description="Fundador y líder del partido"
 *   isLast={true}
 * />
 *
 * <TimelineItem
 *   year="2021"
 *   title="Candidato presidencial"
 *   markerColor="bg-green-600"
 *   lineColor="border-green-600"
 * />
 * ```
 */
export function TimelineItem({
  year,
  title,
  description,
  markerColor = "bg-primary-600",
  lineColor = "border-primary-600",
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <div
      className={cn(
        "flex gap-4 border-l-2 pl-4",
        isLast ? "border-transparent" : lineColor,
        className
      )}
    >
      <div className="shrink-0">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs text-white",
            markerColor
          )}
        >
          •
        </div>
      </div>
      <div className="flex-1">
        <Typography variant="small" className="font-medium text-neutral-900">
          {year}
        </Typography>
        <Typography variant="small" className="text-neutral-600">
          {title}
        </Typography>
        {description && (
          <div className="mt-1">
            {typeof description === "string" ? (
              <Typography variant="small" className="text-neutral-500">
                {description}
              </Typography>
            ) : (
              description
            )}
          </div>
        )}
      </div>
    </div>
  );
}
