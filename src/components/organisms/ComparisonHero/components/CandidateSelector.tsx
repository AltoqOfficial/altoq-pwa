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

  // Media queries for responsive dimensions
  const isSmScreen = useMediaQuery("(min-width: 640px)");
  const isMdScreen = useMediaQuery("(min-width: 768px)");
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

  // Get dimensions for mobile grid (default and sm)
  const getMobileDimensions = (candidate: Candidate) => {
    if (isSmScreen) {
      return {
        width: candidate.imageWidthSm ?? candidate.imageWidth ?? 60,
        height: candidate.imageHeightSm ?? candidate.imageHeight ?? 60,
      };
    }
    return {
      width: candidate.imageWidth ?? 50,
      height: candidate.imageHeight ?? 50,
    };
  };

  // Get offset for mobile grid (default and sm)
  const getMobileOffset = (candidate: Candidate) => {
    if (isSmScreen) {
      return {
        x: candidate.offsetXSm ?? candidate.offsetX ?? 0,
        y: candidate.offsetYSm ?? candidate.offsetY ?? 8,
      };
    }
    return {
      x: candidate.offsetX ?? 0,
      y: candidate.offsetY ?? 8,
    };
  };

  // Get dimensions for md+ grid
  const getDesktopDimensions = (candidate: Candidate) => {
    if (isLgScreen) {
      return {
        width: candidate.imageWidthLg ?? candidate.imageWidthMd ?? 120,
        height: candidate.imageHeightLg ?? candidate.imageHeightMd ?? 100,
      };
    }
    return {
      width: candidate.imageWidthMd ?? 120,
      height: candidate.imageHeightMd ?? 100,
    };
  };

  // Get offset for md+ grid
  const getDesktopOffset = (candidate: Candidate) => {
    if (isLgScreen) {
      return {
        x: candidate.offsetX ?? 0,
        y: candidate.offsetY ?? 16,
      };
    }
    return {
      x: candidate.offsetXMd ?? candidate.offsetX ?? 0,
      y: candidate.offsetYMd ?? candidate.offsetY ?? 16,
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

      {/* Mobile/SM: Grid 5x2 */}
      <div className="grid grid-cols-5 grid-rows-2 gap-1.5 w-full max-w-[360px] sm:max-w-[420px] md:hidden mt-8 px-4 sm:px-0">
        {CANDIDATES.map((candidate) => {
          const disabled = isDisabled(candidate);
          const dimensions = getMobileDimensions(candidate);
          const offset = getMobileOffset(candidate);
          return (
            <button
              key={candidate.id}
              onClick={() => !disabled && onCandidateClick(candidate.id)}
              disabled={disabled}
              className={`relative transition-all duration-300 overflow-hidden border w-full aspect-square flex justify-center items-center group ${
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
                width={dimensions.width}
                height={dimensions.height}
                className="relative z-10 transition-all duration-300 object-cover"
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                  filter: getImageFilter(candidate),
                }}
              />
            </button>
          );
        })}
      </div>

      {/* MD and up: Grid 2 columns */}
      <div className="hidden md:grid grid-cols-2 gap-3 w-full max-w-[350px] lg:max-w-[420px]">
        {CANDIDATES.map((candidate) => {
          const disabled = isDisabled(candidate);
          const dimensions = getDesktopDimensions(candidate);
          const offset = getDesktopOffset(candidate);
          return (
            <button
              key={candidate.id}
              onClick={() => !disabled && onCandidateClick(candidate.id)}
              disabled={disabled}
              className={`relative transition-all duration-300 overflow-hidden border-2 w-full md:h-18 lg:h-22 flex justify-center items-center group ${
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
                width={dimensions.width}
                height={dimensions.height}
                className="relative z-10 transition-all duration-300 object-cover"
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
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
