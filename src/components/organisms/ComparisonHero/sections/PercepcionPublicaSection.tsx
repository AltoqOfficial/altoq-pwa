"use client";

import type { CandidateComparisonData } from "@/data";
import { VoteIntentionChart } from "../components/VoteIntentionChart";
import { Typography } from "@/components/atoms";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Percepción Pública Section with Charts
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

  return (
    <div className="w-full border-t border-white py-8 lg:py-16 md:flex md:justify-center">
      <div className="relative flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Candidate */}
        <div className="flex items-center">
          {leftCandidate && (
            <>
              <VoteIntentionChart
                minVote={leftCandidate.percepcionPublica.intencionVoto.min}
                maxVote={leftCandidate.percepcionPublica.intencionVoto.max}
                description={
                  leftCandidate.percepcionPublica.intencionVoto.descripcion
                }
                color={leftCandidate.color}
                approval={leftCandidate.percepcionPublica.aprobacion}
                socialMedia={leftCandidate.percepcionPublica.redes}
              />
            </>
          )}
          {!leftCandidate && (
            <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
              <Typography
                color="white"
                variant="p"
                className="opacity-50 text-sm md:text-base"
              >
                Sin seleccionar
              </Typography>
            </div>
          )}
        </div>

        {/* Divider - starts below the charts */}
        <div className="absolute left-1/2 top-32 lg:top-40 bottom-0 w-0.5 bg-white/50 -translate-x-1/2" />

        {/* Right Candidate */}
        <div className="flex items-center">
          {rightCandidate && (
            <>
              <VoteIntentionChart
                minVote={rightCandidate.percepcionPublica.intencionVoto.min}
                maxVote={rightCandidate.percepcionPublica.intencionVoto.max}
                description={
                  rightCandidate.percepcionPublica.intencionVoto.descripcion
                }
                color={rightCandidate.color}
                approval={rightCandidate.percepcionPublica.aprobacion}
                socialMedia={rightCandidate.percepcionPublica.redes}
              />
            </>
          )}
          {!rightCandidate && (
            <div className="w-full h-48 md:h-64 flex items-center justify-center bg-white/5 rounded-lg">
              <Typography
                color="white"
                variant="p"
                className="opacity-50 text-sm md:text-base"
              >
                Sin seleccionar
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
