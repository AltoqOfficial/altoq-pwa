"use client";

import { Typography } from "@/components/atoms";

interface VoteIntentionChartProps {
  minVote: number;
  maxVote: number;
  description: string;
  color: string;
  approval: string;
  socialMedia: string;
}

/**
 * Vote Intention Chart Component
 * Displays vote intention statistics with two vertical bars
 */
export function VoteIntentionChart({
  minVote,
  maxVote,
  description,
  color,
  approval,
  socialMedia,
}: VoteIntentionChartProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Two Vertical Bars */}
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
            {minVote}%
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
            {maxVote}%
          </Typography>
        </div>
      </div>

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
            {description}
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
            {approval}
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
            {socialMedia}
          </Typography>
        </div>
      </div>
    </div>
  );
}
