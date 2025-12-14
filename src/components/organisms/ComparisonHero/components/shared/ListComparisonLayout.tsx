"use client";

import type {
  CandidateComparisonData,
  TransparenciaData,
  InnovacionData,
} from "@/data";
import { renderTypographyListWithSource } from "./utils";

interface ListComparisonLayoutProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
  dataKey: keyof CandidateComparisonData;
  className?: string;
}

/**
 * ListComparisonLayout Component
 *
 * Renders a simple two-column layout for list comparisons:
 * [Left List] | [Right List]
 *
 * Supports source tooltips on hover for each item.
 */
export function ListComparisonLayout({
  leftCandidate,
  rightCandidate,
  dataKey,
  className = "",
}: ListComparisonLayoutProps) {
  // Handle both old format (string[]) and new format ({ items, source })
  const getListData = (
    candidate: CandidateComparisonData | null
  ): string[] | { items: string[]; source?: string | string[] } | undefined => {
    if (!candidate) return undefined;
    const data = candidate[dataKey];

    if (Array.isArray(data)) {
      return data as string[];
    }

    if (data && typeof data === "object" && "items" in data) {
      return data as TransparenciaData | InnovacionData;
    }

    return undefined;
  };

  const leftData = getListData(leftCandidate);
  const rightData = getListData(rightCandidate);

  return (
    <div className={`gap-8 md:gap-16 lg:gap-32 ${className}`}>
      <div className="w-full border-t border-white space-y-8 md:space-y-12 lg:space-y-16 py-8 md:py-12 lg:py-16">
        <div className="relative flex lg:grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-16 items-center">
          {/* Left column */}
          <div className="w-full space-y-4 md:space-y-6 flex justify-center items-center flex-col">
            {renderTypographyListWithSource(leftData, "left")}
          </div>

          {/* Divider */}
          <div className="absolute left-1/2 h-full w-0.5 bg-white/50 -translate-x-1/2" />

          {/* Right column */}
          <div className="w-full space-y-4 md:space-y-6 flex justify-center items-center flex-col">
            {renderTypographyListWithSource(rightData, "left")}
          </div>
        </div>
      </div>
    </div>
  );
}
