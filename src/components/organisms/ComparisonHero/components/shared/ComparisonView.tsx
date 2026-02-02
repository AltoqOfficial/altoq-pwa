"use client";

import { useRef } from "react";
import { Typography } from "@/components/atoms";
import { MobileComparisonCard } from "./ComparisonCard";
import type { CandidateComparisonData } from "@/data";
import type { FieldConfig } from "./types";

interface MobileComparisonViewProps {
  fields: FieldConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftData: Record<string, any> | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rightData: Record<string, any> | null | undefined;
  leftCandidate?: CandidateComparisonData | null;
  rightCandidate?: CandidateComparisonData | null;
}

export function MobileComparisonView({
  fields,
  leftData,
  rightData,
  leftCandidate,
  rightCandidate,
}: MobileComparisonViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full relative min-h-[400px] py-4">
      {/* Scroll Container / Desktop Grid */}
      <div
        ref={scrollContainerRef}
        className="flex flex-col w-full px-4 gap-8 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8 md:px-0 md:items-start"
      >
        {/* Left Card Wrapper */}
        {leftCandidate && (
          <div className="w-full md:min-w-0 md:w-full">
            <MobileComparisonCard
              candidate={leftCandidate}
              data={leftData}
              fields={fields}
              side="left"
              color="#FF2727"
              socialLinks={leftCandidate.socialLinks}
            />
          </div>
        )}

        {/* VS Badge in Flow */}
        <div className="shrink-0 flex items-center justify-center md:h-auto md:self-center py-2 md:py-0">
          <div className="w-12 h-16 flex items-center justify-center">
            <Typography
              font="kenyan"
              variant="h3"
              className="text-4xl text-noise-red drop-shadow-lg"
            >
              VS
            </Typography>
          </div>
        </div>

        {/* Right Card Wrapper */}
        {rightCandidate && (
          <div className="w-full md:min-w-0 md:w-full">
            <MobileComparisonCard
              candidate={rightCandidate}
              data={rightData}
              fields={fields}
              side="right"
              color="#4E58B4"
              socialLinks={rightCandidate.socialLinks}
            />
          </div>
        )}
      </div>
    </div>
  );
}
