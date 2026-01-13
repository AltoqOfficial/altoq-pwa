"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import type { CandidateComparisonData } from "@/data";
import { SourceTooltip } from "../components/shared/SourceTooltip";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

type SourceableData =
  | string
  | string[]
  | {
      value?: string | string[];
      values?: string | string[];
      source?: string | string[];
    }
  | null
  | undefined;

/**
 * Helper to get simple string value from SourceableString
 */
const getValue = (item: SourceableData): string => {
  if (!item) return "0";
  if (typeof item === "string") return item;
  if (Array.isArray(item)) return item[0] || "0";
  if (typeof item === "object" && "value" in item) {
    const val = item.value;
    // @ts-expect-error - We are checking for array but TS might still complain about complexity
    return Array.isArray(val) ? val[0] : val;
  }
  return "0";
};

/**
 * Helper to get array string from SourceableArray
 */
const getArrayValue = (item: SourceableData): string[] => {
  if (!item) return [];
  if (Array.isArray(item)) return item;
  if (typeof item === "object" && "values" in item) {
    const val = item.values;
    // @ts-expect-error - Complex union type handling
    return Array.isArray(val) ? val : [val];
  }
  return [];
};

/**
 * Helper to get source from SourceableData
 */
const getSource = (item: SourceableData): string | string[] | undefined => {
  if (!item) return undefined;
  if (typeof item === "object" && "source" in item) {
    return item.source;
  }
  return undefined;
};

/**
 * Helper to parse "Title (YYYY-YYYY)" string.
 * Also handles "YYYY - YYYY Title" or "YYYY: Title"
 */
const parseRole = (str: string) => {
  if (!str) return { title: "", year: "" };

  // Format: Title (YYYY-YYYY)
  let match = str.match(/^(.*?)\s*\((\d{4}(?:-\d{4})?)\)$/);
  if (match) return { title: match[1].trim(), year: match[2].trim() };

  // Format: YYYY-YYYY Title OR YYYY: Title
  match = str.match(/^(\d{4}(?:-\d{4})?)\s*[:\-\s]\s*(.*)$/);
  if (match) return { title: match[2].trim(), year: match[1].trim() };

  return { title: str, year: "" };
};

/**
 * Helper to parse "YYYY → Result" string.
 * Also handles "YYYY: Result"
 */
const parseCandidacy = (str: string) => {
  if (!str) return { title: "", year: "" };

  // Format: YYYY -> Result OR YYYY: Result
  const match = str.match(/^(\d{4})\s*(?:[→:\-]|:\s)\s*(.*)$/);
  if (match) return { year: match[1].trim(), title: match[2].trim() };

  return { title: str, year: "" };
};

/**
 * Timeline Item Component
 */
const TimelineItem = ({
  year,
  title,
  color,
  source,
}: {
  year: string;
  title: string;
  color: string;
  source?: string | string[];
}) => (
  <div className="flex flex-col relative pt-6 shrink-0 w-32 md:w-64">
    {/* Dot on line */}
    <div className="absolute top-0 left-0 w-5 h-5 z-10">
      <SourceTooltip source={source} className="block w-full h-full">
        <div
          className="w-full h-full rounded-full bg-noise-pattern"
          style={{ backgroundColor: color }}
        />
      </SourceTooltip>
    </div>
    <Typography
      variant="h6"
      weight="700"
      className="text-white text-xs md:text-base mb-1"
    >
      {year}
    </Typography>
    <div className="relative">
      <SourceTooltip source={source}>
        <Typography
          variant="p"
          weight="200"
          className="text-gray-300 text-xs md:text-sm leading-tight hover:text-white transition-colors cursor-help"
        >
          {title}
        </Typography>
      </SourceTooltip>
    </div>
  </div>
);

/**
 * Experiencia Política Section - Timeline Layout
 */
export function ExperienciaPoliticaSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const renderTimeline = (
    candidate: CandidateComparisonData | null,
    side: "left" | "right"
  ) => {
    if (!candidate) return <div className="w-full h-full" />;

    const data = candidate.experienciaPolitica;
    if (!data) return null;

    // Use specific colors: Keiko Red (#FF2727), others Blue/Default (#4E58B4)
    const themeColor = side === "left" ? "#FF2727" : "#4E58B4";

    const yearsExp = getValue(data.anosExperiencia);

    // Parse cargos
    const cargosRaw = getArrayValue(data.cargosPrevios);
    const cargosSource = getSource(data.cargosPrevios);
    const cargos = cargosRaw.map(parseRole);

    // Parse candidaturas
    const candidaturasRaw = getArrayValue(data.candidaturasPresidenciales);
    const candidaturasSource = getSource(data.candidaturasPresidenciales);
    const candidaturas = candidaturasRaw.map(parseCandidacy);

    const isRight = side === "right";

    return (
      <div className="w-full max-w-full py-8 px-4 md:px-8">
        {/* Header: Avatar & Years */}
        <div
          className={`flex justify-between items-start mb-12 ${isRight ? "flex-row-reverse" : "flex-row"}`}
        >
          {/* Avatar Circle */}
          <div
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
            style={{ backgroundColor: themeColor }}
          >
            <Image
              src={candidate.image}
              alt={candidate.shortName || ""}
              fill
              className="object-cover"
            />
          </div>

          {/* Years of Experience */}
          <div className={isRight ? "text-left" : "text-right"}>
            <Typography
              variant="p"
              weight="300"
              className={`text-white uppercase tracking-wider text-xs md:text-sm mb-1 ${isRight ? "text-left" : "text-right"}`}
            >
              AÑOS DE EXPERIENCIA
            </Typography>
            <Typography
              variant="h3"
              weight="800"
              className={`text-white text-3xl md:text-4xl ${isRight ? "text-left" : "text-right"}`}
            >
              {yearsExp}
            </Typography>
          </div>
        </div>

        {/* Timeline Area */}
        <div className="relative mt-8">
          {/* Main Horizontal Line - Fixed to viewport width to create the track effect */}
          <div className="absolute top-[57px] left-0 w-full h-0.5 bg-white bg-noise-pattern" />

          {/* Single Horizontal Scroll Container */}
          <div className="flex gap-10 md:gap-32 overflow-x-auto pt-12 pb-4 scrollbar-hide pl-0 pr-4 w-full max-w-full">
            {/* Cargos Publicos Group */}
            {cargos.length > 0 && (
              <div className="flex gap-4 shrink-0 relative">
                <div className="absolute -top-10 left-0 text-xs md:text-sm font-bold uppercase flex items-center gap-2 mb-4 whitespace-nowrap">
                  <span
                    className="text-transparent bg-clip-text bg-noise-pattern"
                    style={{ backgroundColor: themeColor }}
                  >
                    CARGOS PÚBLICOS
                  </span>
                  <ArrowRight
                    style={{ color: themeColor }}
                    className="w-5 h-5 ml-1 "
                  />
                </div>
                {cargos.map((item, idx) => (
                  <TimelineItem
                    key={`cargo-${idx}`}
                    year={item.year}
                    title={item.title}
                    color={themeColor}
                    source={cargosSource}
                  />
                ))}
              </div>
            )}

            {/* Candidaturas Group */}
            {candidaturas.length > 0 && (
              <div className="flex gap-4 shrink-0 relative">
                <div className="absolute -top-10 left-0 text-xs md:text-sm font-bold uppercase flex items-center gap-2 mb-4 whitespace-nowrap">
                  <span
                    className="text-transparent bg-clip-text bg-noise-pattern"
                    style={{ backgroundColor: themeColor }}
                  >
                    CANDIDATURAS PRESIDENCIALES
                  </span>
                  <ArrowRight
                    style={{ color: themeColor }}
                    className="w-5 h-5 ml-1"
                  />
                </div>
                {candidaturas.map((item, idx) => (
                  <TimelineItem
                    key={`candidatura-${idx}`}
                    year={item.year}
                    title={item.title}
                    color={themeColor}
                    source={candidaturasSource}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-full xl:max-w-[calc(100vw-40rem)] overflow-hidden">
      {/* Top Candidate (Red/Left) */}
      <div className="w-full max-w-full border-b border-white/20 pb-8">
        {renderTimeline(leftCandidate, "left")}
      </div>

      {/* Bottom Candidate (Blue/Right) */}
      <div className="w-full max-w-full pt-8">
        {renderTimeline(rightCandidate, "right")}
      </div>
    </div>
  );
}
