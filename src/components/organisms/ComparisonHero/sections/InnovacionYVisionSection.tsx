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
        {item}
      </Typography>
    ));
  };

  return (
    <div className="gap-8 md:gap-16 lg:gap-32">
      <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
        <div className="relative flex lg:grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-16 items-center">
          <div className="w-full space-y-4 md:space-y-6  flex justify-center items-center flex-col">
            {renderList(leftCandidate?.innovacionYVision)}
          </div>
          <div className="absolute left-1/2 h-full w-0.5 bg-white/50 -translate-x-1/2" />
          <div className="w-full space-y-4 md:space-y-6 flex justify-center items-center flex-col">
            {renderList(rightCandidate?.innovacionYVision)}
          </div>
        </div>
      </div>
    </div>
  );
}
