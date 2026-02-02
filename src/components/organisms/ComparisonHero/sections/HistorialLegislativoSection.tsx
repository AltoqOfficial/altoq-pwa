"use client";

import type { CandidateComparisonData } from "@/data";
import { LegislativeProjectsChart } from "../components/LegislativeProjectsChart";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

/**
 * Historial Legislativo Section with Charts
 * Custom layout using LegislativeHistoryChart component with source tooltips
 */
export function HistorialLegislativoSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const hasData = leftCandidate || rightCandidate;

  if (!hasData) return null;

  return (
    <div className="w-full py-8 md:py-12 lg:py-20 2xl:py-28 px-2 md:px-8">
      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-start relative">
        {/* Left Candidate */}
        <div className="flex justify-center md:justify-end md:pr-4 lg:pr-8">
          {leftCandidate?.historialLegislativo && (
            <div className="w-full max-w-sm">
              <LegislativeProjectsChart
                data={leftCandidate.historialLegislativo}
                partyName={leftCandidate.party}
                color={leftCandidate.color || "#6B7280"}
                partyLogoLetter={
                  leftCandidate.slug === "keikoFujimori"
                    ? "K"
                    : leftCandidate.party.charAt(0)
                }
                partyIcon={leftCandidate.partyIcon}
              />
            </div>
          )}
        </div>

        {/* Right Candidate */}
        <div className="flex justify-center md:justify-start md:pl-4 lg:pl-8">
          {rightCandidate?.historialLegislativo && (
            <div className="w-full max-w-sm">
              <LegislativeProjectsChart
                data={rightCandidate.historialLegislativo}
                partyName={rightCandidate.party}
                color={rightCandidate.color || "#6B7280"}
                partyLogoLetter={
                  rightCandidate.slug === "rafaelLopez"
                    ? "R"
                    : rightCandidate.party.charAt(0)
                }
                partyIcon={rightCandidate.partyIcon}
              />
            </div>
          )}
        </div>
      </div>

      {/* Show More Button - Unified for both columns */}
      <div className="mt-8 md:mt-12 flex justify-center w-full">
        <button className="w-full max-w-4xl py-3 border border-white/20 rounded hover:bg-white/10 transition text-sm font-medium text-white/80">
          Mostrar más proyectos
        </button>
      </div>
    </div>
  );
}
