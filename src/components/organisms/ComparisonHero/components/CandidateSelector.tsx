"use client";

import Image from "next/image";
import { useId } from "react";
import { CANDIDATES, SELECTION_COLORS, type Candidate } from "../constants";

interface CandidateSelectorProps {
  selectedCandidates: string[];
  onCandidateClick: (candidateId: string) => void;
}

/**
 * Candidate Selector Component
 * Grid of candidate images for selection with rectangular cards
 */
export function CandidateSelector({
  selectedCandidates,
  onCandidateClick,
}: CandidateSelectorProps) {
  const uniqueId = useId();
  const noiseFilterId = `noiseSelectorFilter${uniqueId}`;

  const getBackgroundColor = (candidateId: string) => {
    const index = selectedCandidates.indexOf(candidateId);
    if (index === 0) return SELECTION_COLORS.first;
    if (index === 1) return SELECTION_COLORS.second;
    return "#484848";
  };

  const getImageStyle = (candidateId: string) => {
    const isSelected = selectedCandidates.includes(candidateId);
    if (isSelected) return "grayscale-0";
    return "grayscale";
  };

  return (
    <>
      {/* SVG Filters for Noise Effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Noise filter for selector cards */}
          <filter
            id={noiseFilterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.25 1.25"
              numOctaves={3}
              result="noise"
              seed={4254}
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="alphaNoise"
            />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA
                type="discrete"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
              />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in2="shape"
              in="coloredNoise1"
              result="noise1Clipped"
            />
            <feFlood
              floodColor="rgba(255, 255, 255, 0.2)"
              result="color1Flood"
            />
            <feComposite
              operator="in"
              in2="noise1Clipped"
              in="color1Flood"
              result="color1"
            />
            <feMerge result="effect1_noise">
              <feMergeNode in="shape" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-[280px] md:max-w-[350px] lg:max-w-[420px]">
        {CANDIDATES.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => onCandidateClick(candidate.id)}
            className="relative cursor-pointer transition-all duration-300 overflow-hidden border-2 border-[#CECECE] w-full aspect-[2.2/1] md:h-18 lg:h-22 flex justify-center items-center group"
          >
            {/* Background with noise */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              style={{ filter: `url(#${noiseFilterId})` }}
            >
              <rect
                width="100%"
                height="100%"
                fill={getBackgroundColor(candidate.id)}
              />
            </svg>

            {/* Image on top */}
            <Image
              src={candidate.src}
              alt={candidate.name}
              width={120}
              height={100}
              className={`relative z-10 translate-y-4 md:translate-y-5 lg:translate-y-4.5 transition-all duration-300 object-cover w-[80%] md:w-[85%] lg:w-auto ${getImageStyle(candidate.id)}`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Get candidate data key from selection
 */
export function getCandidateDataKey(candidateId: string): string {
  const candidate = CANDIDATES.find((c) => c.id === candidateId);
  return candidate?.dataKey || "";
}

/**
 * Get candidate by ID from CANDIDATES array
 */
export function getCandidateById(candidateId: string) {
  return CANDIDATES.find((c) => c.id === candidateId) || null;
}
