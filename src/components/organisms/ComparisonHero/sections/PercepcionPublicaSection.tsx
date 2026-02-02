"use client";

import type { CandidateComparisonData } from "@/data";
import { VoteIntentionChart } from "../components/VoteIntentionChart";
import { Typography } from "@/components/atoms";
import { extractValue, extractSource } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Percepción Pública Section with Charts
 * Custom layout using VoteIntentionChart component with source tooltips
 */
export function PercepcionPublicaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const hasData = leftCandidate || rightCandidate;

  if (!hasData) {
    return (
      <div className="w-full border-t border-white py-8 md:py-12 lg:py-16">
        <div className="text-center py-8 md:py-12">
          <Typography
            color="white"
            variant="h5"
            weight="200"
            className="opacity-50 text-sm md:text-base lg:text-lg"
          >
            Selecciona candidatos para ver la percepción pública
          </Typography>
        </div>
      </div>
    );
  }

  const renderCandidateChart = (candidate: CandidateComparisonData | null) => {
    if (candidate && candidate.percepcionPublica) {
      // Extract values and sources
      const aprobacionValue =
        (extractValue(candidate.percepcionPublica.aprobacion) as string) || "";
      const aprobacionSource = extractSource(
        candidate.percepcionPublica.aprobacion
      );

      const redesValue =
        (extractValue(candidate.percepcionPublica.redes) as string) || "";
      const redesSource = extractSource(candidate.percepcionPublica.redes);

      return (
        <VoteIntentionChart
          minVote={candidate.percepcionPublica.intencionVoto.min}
          maxVote={candidate.percepcionPublica.intencionVoto.max}
          description={candidate.percepcionPublica.intencionVoto.descripcion}
          color={candidate.color || "#6B7280"}
          approval={aprobacionValue}
          socialMedia={redesValue}
          voteSource={candidate.percepcionPublica.intencionVoto.source}
          approvalSource={aprobacionSource}
          socialMediaSource={redesSource}
          historialPartidos={candidate.perfilGeneral?.historialPartidos}
        />
      );
    }

    return (
      <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
        <Typography
          color="white"
          variant="p"
          className="opacity-50 text-sm md:text-base"
        >
          Sin seleccionar
        </Typography>
      </div>
    );
  };

  return (
    <div className="w-full border-t border-white py-8 lg:py-16 md:flex md:justify-center">
      <div className="relative flex 2xl:grid 2xl:grid-cols-2 space-x-4 lg:space-x-24 xl:gap-8 2xl:gap-32 items-start 2xl:justify-items-center 2xl:mx-auto">
        {/* Left Candidate */}
        <div className="flex items-center">
          {renderCandidateChart(leftCandidate)}
        </div>

        {/* Divider */}
        <div className="absolute left-1/2 top-32 lg:top-40 bottom-0 w-0.5 bg-white/50 -translate-x-1/2" />

        {/* Right Candidate */}
        <div className="flex items-center">
          {renderCandidateChart(rightCandidate)}
        </div>
      </div>
    </div>
  );
}
