"use client";

import Image from "next/image";
import { useId } from "react";
import { CANDIDATES, SELECTION_COLORS, type Candidate } from "../constants";
import { useMediaQuery } from "@/hooks";

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
  const isLgScreen = useMediaQuery("(min-width: 1024px)");

  const isDisabled = (candidate: Candidate) => !candidate.dataKey;

  const getBackgroundColor = (candidateId: string, candidate: Candidate) => {
    if (isDisabled(candidate)) return "#2a2a2a";
    const index = selectedCandidates.indexOf(candidateId);
    if (index === 0) return SELECTION_COLORS.first;
    if (index === 1) return SELECTION_COLORS.second;
    return "#48484840";
  };

  const getImageFilter = (candidate: Candidate) => {
    const brightness = (candidate.brightness ?? 1) * (candidate.shadows ?? 1);
    const contrast = candidate.contrast ?? 1;
    const saturate = candidate.saturate ?? 1;
    const sepia = candidate.sepia ?? 0;

    // Disabled candidates are always grayscale with reduced opacity
    if (isDisabled(candidate)) {
      return `grayscale(1) brightness(0.5) contrast(${contrast})`;
    }

    const isSelected = selectedCandidates.includes(candidate.id);
    // Apply grayscale when not selected, full color filters when selected
    if (isSelected) {
      return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) sepia(${sepia})`;
    }
    return `grayscale(1) brightness(${brightness}) contrast(${contrast})`;
  };

  const getImageDimensions = (candidate: Candidate) => {
    if (isLgScreen && candidate.imageWidthLg && candidate.imageHeightLg) {
      return {
        width: candidate.imageWidthLg,
        height: candidate.imageHeightLg,
      };
    }
    return {
      width: candidate.imageWidth || 120,
      height: candidate.imageHeight || 100,
    };
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
        {CANDIDATES.map((candidate) => {
          const disabled = isDisabled(candidate);
          return (
            <button
              key={candidate.id}
              onClick={() => !disabled && onCandidateClick(candidate.id)}
              disabled={disabled}
              className={`relative transition-all duration-300 overflow-hidden border-2 w-full aspect-[2.2/1] md:h-18 lg:h-22 flex justify-center items-center group ${
                disabled
                  ? "cursor-not-allowed border-[#555] opacity-60"
                  : "cursor-pointer border-[#CECECE]"
              }`}
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
                  fill={getBackgroundColor(candidate.id, candidate)}
                />
              </svg>

              {/* Image on top */}
              <Image
                src={candidate.src}
                alt={candidate.name}
                width={getImageDimensions(candidate).width}
                height={getImageDimensions(candidate).height}
                className="relative z-10 transition-all duration-300 object-cover"
                style={{
                  width: `${getImageDimensions(candidate).width}px`,
                  height: `${getImageDimensions(candidate).height}px`,
                  transform: `translate(${candidate.offsetX ?? 0}px, ${candidate.offsetY ?? 16}px)`,
                  filter: getImageFilter(candidate),
                }}
              />
            </button>
          );
        })}
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
