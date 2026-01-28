"use client";

import { Typography } from "@/components/atoms";
import { SourceTooltip } from "./shared";
import Image from "next/image";

interface PartyHistory {
  ano: string;
  partido: string;
  icono?: string;
  source?: string | string[];
}

interface VoteIntentionChartProps {
  minVote: number | null;
  maxVote: number | null;
  description: string;
  color: string;
  approval: string;
  socialMedia: string;
  voteSource?: string | string[] | null;
  approvalSource?: string | string[] | null;
  socialMediaSource?: string | string[] | null;
  historialPartidos?: PartyHistory[];
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
  historialPartidos,
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

        {/* Historial de Partidos */}
        {historialPartidos && historialPartidos.length > 0 && (
          <div className="pt-2">
            <Typography
              color="white"
              variant="h6"
              align="center"
              weight="800"
              className="text-xs md:text-sm lg:text-base mb-3"
            >
              HISTORIAL DE PARTIDOS
            </Typography>
            <div className="flex flex-col gap-2">
              {historialPartidos.map((partido, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2"
                >
                  {partido.icono && (
                    <SourceTooltip source={partido.source}>
                      <div className="relative w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden shrink-0 cursor-pointer">
                        <Image
                          src={partido.icono}
                          alt={partido.partido}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SourceTooltip>
                  )}
                  <div className="flex flex-col items-start">
                    <Typography
                      color="white"
                      variant="p"
                      weight="700"
                      className="text-[10px] md:text-xs"
                    >
                      {partido.ano}
                    </Typography>
                    <Typography
                      color="white"
                      variant="p"
                      weight="400"
                      className="text-xs md:text-sm"
                    >
                      {partido.partido}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
