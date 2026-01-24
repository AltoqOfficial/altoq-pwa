"use client";

import { Typography } from "@/components/atoms";
import { SourceTooltip } from "./shared";

interface VoteIntentionChartProps {
  minVote: number | null;
  maxVote: number | null;
  description: string;
  color: string;
  approval: string | null;
  socialMedia: string | null;
  voteSource?: string | string[] | null;
  approvalSource?: string | string[] | null;
  socialMediaSource?: string | string[] | null;
}

/**
 * Vote Intention Chart Component
 * Displays vote intention statistics with two vertical bars
 * Supports source tooltips on hover
 */
export function VoteIntentionChart({
  minVote,
  maxVote,
  description,
  color,
  approval,
  socialMedia,
  voteSource,
  approvalSource,
  socialMediaSource,
}: VoteIntentionChartProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Two Vertical Bars */}
      <SourceTooltip source={voteSource}>
        <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-[180px] md:max-w-xs mx-auto mb-4 md:mb-8">
          <div
            className="h-28 md:h-32 lg:h-40 w-16 md:w-20 lg:w-24 flex items-center justify-center rounded-sm"
            style={{ backgroundColor: "rgba(134, 134, 134, 0.6)" }}
          >
            <Typography
              weight="400"
              color="white"
              variant="h4"
              align="center"
              className="text-lg md:text-xl lg:text-2xl"
            >
              {minVote ?? "N/A"}%
            </Typography>
          </div>
          <div
            className="h-28 md:h-32 lg:h-40 w-16 md:w-20 lg:w-24 flex items-center justify-center rounded-sm"
            style={{ backgroundColor: color, opacity: 0.85 }}
          >
            <Typography
              weight="400"
              color="white"
              variant="h4"
              align="center"
              className="text-lg md:text-xl lg:text-2xl"
            >
              {maxVote ?? "N/A"}%
            </Typography>
          </div>
        </div>
      </SourceTooltip>

      {/* Stats */}
      <div className="space-y-3 md:space-y-4 lg:space-y-6 text-center">
        <div>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="800"
            className="text-xs md:text-sm lg:text-base"
          >
            INTENCIÓN DE VOTO
          </Typography>
          <Typography
            color="white"
            variant="p"
            align="center"
            weight="200"
            className="text-xs md:text-sm"
          >
            <SourceTooltip source={voteSource}>{description}</SourceTooltip>
          </Typography>
        </div>
        <div>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="800"
            className="text-xs md:text-sm lg:text-base"
          >
            APROBACIÓN
          </Typography>
          <Typography
            color="white"
            variant="p"
            align="center"
            weight="200"
            className="text-xs md:text-sm"
          >
            <SourceTooltip source={approvalSource}>{approval}</SourceTooltip>
          </Typography>
        </div>
        <div>
          <Typography
            color="white"
            variant="h6"
            align="center"
            weight="800"
            className="text-xs md:text-sm lg:text-base"
          >
            REDES
          </Typography>
          <Typography
            color="white"
            variant="p"
            align="center"
            weight="200"
            className="text-xs md:text-sm"
          >
            <SourceTooltip source={socialMediaSource}>
              {socialMedia}
            </SourceTooltip>
          </Typography>
        </div>
      </div>
    </div>
  );
}
