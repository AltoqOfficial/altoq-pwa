"use client";

import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Innovación y Visión Section
 */
export function InnovacionYVisionSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return "-";
    return items.map((item, index) => (
      <Typography
        key={index}
        color="white"
        variant="h6"
        align="left"
        weight="200"
        className="text-xs md:text-sm lg:text-base"
      >
        {index + 1}. {item}
      </Typography>
    ));
  };

  return (
    <div className="gap-8 md:gap-16 lg:gap-32">
      <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-0">
          <div className="w-full space-y-4 md:space-y-6">
            {renderList(leftCandidate?.innovacionYVision)}
          </div>
          <div className="w-full space-y-4 md:space-y-6">
            {renderList(rightCandidate?.innovacionYVision)}
          </div>
        </div>
      </div>
    </div>
  );
}
