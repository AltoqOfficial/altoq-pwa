"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import type { RenderableValue, FieldConfig } from "./types";
import { renderValue, renderBulletList } from "./utils";

interface TwoColumnLayoutProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
  fields: FieldConfig[];
  dataKey: keyof CandidateComparisonData;
  listStyle?: "none" | "bullet" | "numbered";
  className?: string;
}

/**
 * TwoColumnLayout Component
 *
 * Renders a split 2-column layout with a divider:
 * [Left Candidate Data] | [Right Candidate Data]
 */
export function TwoColumnLayout({
  leftCandidate,
  rightCandidate,
  fields,
  dataKey,
  listStyle = "none",
  className = "",
}: TwoColumnLayoutProps) {
  const renderCandidateColumn = (
    candidate: CandidateComparisonData | null,
    align: "left" | "right" = "left"
  ) => {
    const isRight = align === "right";
    const textAlign = isRight ? "right" : "left";
    const flexDirection = isRight ? "md:flex-row-reverse" : "";
    const itemsAlign = isRight
      ? "items-end md:items-center"
      : "items-start md:items-center";

    const data = candidate?.[dataKey] as
      | Record<string, RenderableValue>
      | undefined;

    return (
      <div className="w-full space-y-16 grid lg:space-y-16 py-8 md:py-12 lg:py-16 items-center justify-center">
        {fields.map(({ key, label, type }) => (
          <div
            key={key}
            className={`flex flex-col md:grid md:grid-cols-2 w-full gap-2 md:gap-0 ${flexDirection}`}
          >
            <Typography
              color="white"
              variant="h6"
              align={textAlign}
              weight="600"
              className="max-w-full md:max-w-[18rem] text-sm md:text-base lg:text-lg"
            >
              {label}
            </Typography>
            <Typography
              color="white"
              variant="h6"
              align={textAlign}
              weight="200"
              className={`max-w-full md:max-w-[20rem] flex md:justify-center ${itemsAlign} text-xs md:text-sm lg:text-base ${
                type === "list" ? "flex-col space-y-2" : ""
              }`}
            >
              {type === "list" && listStyle === "bullet"
                ? renderBulletList(data?.[key] as string[] | undefined)
                : renderValue(data?.[key])}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`grid grid-cols-[1fr_1px_1fr] gap-2 md:gap-16 lg:gap-16 border-t border-white ${className}`}
    >
      {renderCandidateColumn(leftCandidate, "left")}
      <div className="w-0.5 h-px lg:h-auto my-8 bg-white/50" />
      {renderCandidateColumn(rightCandidate, "right")}
    </div>
  );
}
