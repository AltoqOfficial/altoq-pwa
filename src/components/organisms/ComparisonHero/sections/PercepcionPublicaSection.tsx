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
    <div className="w-full border-t border-white py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Left Candidate */}
        <div className="flex flex-col items-center">
          {leftCandidate && (
            <>
              <div
                className="w-full max-w-[200px] md:max-w-xs mb-3 md:mb-4 py-1.5 md:py-2 px-3 md:px-4 rounded-full text-center"
                style={{ backgroundColor: `${leftCandidate.color}30` }}
              >
                <Typography
                  color="white"
                  variant="h6"
                  weight="600"
                  className="text-sm md:text-base"
                >
                  {leftCandidate.shortName}
                </Typography>
              </div>
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

        {/* Divider */}
        <div className="hidden md:flex justify-center items-center h-full">
          <div className="w-px h-full min-h-[250px] md:min-h-[300px] bg-linear-to-b from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Right Candidate */}
        <div className="flex flex-col items-center">
          {rightCandidate && (
            <>
              <div
                className="w-full max-w-[200px] md:max-w-xs mb-3 md:mb-4 py-1.5 md:py-2 px-3 md:px-4 rounded-full text-center"
                style={{ backgroundColor: `${rightCandidate.color}30` }}
              >
                <Typography
                  color="white"
                  variant="h6"
                  weight="600"
                  className="text-sm md:text-base"
                >
                  {rightCandidate.shortName}
                </Typography>
              </div>
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
