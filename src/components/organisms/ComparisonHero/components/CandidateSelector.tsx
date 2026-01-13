"use client";

import Image from "next/image";
import { memo, useCallback, useMemo } from "react";
import { CANDIDATES, SELECTION_COLORS, type Candidate } from "../constants";
import { useMediaQuery } from "@/hooks";

interface CandidateSelectorProps {
  selectedCandidates: string[];
  onCandidateClick: (candidateId: string) => void;
  /** If true, prevents deselecting already selected candidates */
  lockSelection?: boolean;
}

/**
 * Candidate button component - memoized for performance
 */
const CandidateButton = memo(function CandidateButton({
  candidate,
  isDisabled,
  isLocked,
  backgroundColor,
  imageFilter,
  dimensions,
  offset,
  onClick,
}: {
  candidate: Candidate;
  isDisabled: boolean;
  isLocked: boolean;
  backgroundColor: string;
  imageFilter: string;
  dimensions: { width: number; height: number };
  offset: { x: number; y: number };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative transition-all duration-300 overflow-hidden border w-full aspect-square flex justify-center items-center group ${
        isDisabled
          ? "cursor-not-allowed border-[#555] opacity-60"
          : isLocked
            ? "cursor-default border-[#CECECE]"
            : "cursor-pointer border-[#CECECE]"
      }`}
    >
      {/* Background with simple color - no heavy SVG filter */}
      <div
        className="absolute inset-0 w-full h-full transition-colors duration-300"
        style={{ backgroundColor }}
      />

      {/* Image on top */}
      <Image
        src={candidate.src}
        alt={candidate.name}
        width={dimensions.width}
        height={dimensions.height}
        loading="lazy"
        className="relative z-10 transition-all duration-300 object-cover"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          filter: imageFilter,
        }}
      />
    </button>
  );
});

/**
 * Desktop candidate button - memoized for performance
 */
const DesktopCandidateButton = memo(function DesktopCandidateButton({
  candidate,
  isDisabled,
  isLocked,
  backgroundColor,
  imageFilter,
  dimensions,
  offset,
  onClick,
}: {
  candidate: Candidate;
  isDisabled: boolean;
  isLocked: boolean;
  backgroundColor: string;
  imageFilter: string;
  dimensions: { width: number; height: number };
  offset: { x: number; y: number };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative transition-all duration-300 overflow-hidden border-2 w-full xl:h-18 flex justify-center items-center group ${
        isDisabled
          ? "cursor-not-allowed border-[#555] opacity-60"
          : isLocked
            ? "cursor-default border-[#CECECE]"
            : "cursor-pointer border-[#CECECE]"
      }`}
    >
      {/* Background with simple color */}
      <div
        className="absolute inset-0 w-full h-full transition-colors duration-300"
        style={{ backgroundColor }}
      />

      {/* Image on top */}
      <Image
        src={candidate.src}
        alt={candidate.name}
        width={dimensions.width}
        height={dimensions.height}
        loading="lazy"
        className="relative z-10 transition-all duration-300 object-cover"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          filter: imageFilter,
        }}
      />
    </button>
  );
});

/**
 * Candidate Selector Component - Optimized
 * Grid of candidate images for selection with rectangular cards
 */
export const CandidateSelector = memo(function CandidateSelector({
  selectedCandidates,
  onCandidateClick,
  lockSelection = false,
}: CandidateSelectorProps) {
  // Media queries for responsive dimensions
  const isSmScreen = useMediaQuery("(min-width: 640px)");
  const isLgScreen = useMediaQuery("(min-width: 1024px)");

  const isDisabled = useCallback(
    (candidate: Candidate) => !candidate.dataKey,
    []
  );

  const isLocked = useCallback(
    (candidateId: string) =>
      lockSelection && selectedCandidates.includes(candidateId),
    [lockSelection, selectedCandidates]
  );

  const handleClick = useCallback(
    (candidate: Candidate) => {
      if (isDisabled(candidate)) return;
      if (isLocked(candidate.id)) return;
      onCandidateClick(candidate.id);
    },
    [isDisabled, isLocked, onCandidateClick]
  );

  const getBackgroundColor = useCallback(
    (candidateId: string, candidate: Candidate) => {
      if (isDisabled(candidate)) return "#2a2a2a";
      const index = selectedCandidates.indexOf(candidateId);
      if (index === 0) return SELECTION_COLORS.first;
      if (index === 1) return SELECTION_COLORS.second;
      return "#48484840";
    },
    [isDisabled, selectedCandidates]
  );

  const getImageFilter = useCallback(
    (candidate: Candidate) => {
      const brightness = (candidate.brightness ?? 1) * (candidate.shadows ?? 1);
      const contrast = candidate.contrast ?? 1;
      const saturate = candidate.saturate ?? 1;
      const sepia = candidate.sepia ?? 0;

      if (isDisabled(candidate)) {
        return `grayscale(1) brightness(0.5) contrast(${contrast})`;
      }

      const isSelected = selectedCandidates.includes(candidate.id);
      if (isSelected) {
        return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) sepia(${sepia})`;
      }
      return `grayscale(1) brightness(${brightness}) contrast(${contrast})`;
    },
    [isDisabled, selectedCandidates]
  );

  // Memoized dimension getters
  const getMobileDimensions = useCallback(
    (candidate: Candidate) => {
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
    },
    [isSmScreen]
  );

  const getMobileOffset = useCallback(
    (candidate: Candidate) => {
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
    },
    [isSmScreen]
  );

  const getDesktopDimensions = useCallback(
    (candidate: Candidate) => {
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
    },
    [isLgScreen]
  );

  const getDesktopOffset = useCallback(
    (candidate: Candidate) => {
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
    },
    [isLgScreen]
  );

  // Pre-compute candidate data for mobile grid
  const mobileGridData = useMemo(
    () =>
      CANDIDATES.map((candidate) => ({
        candidate,
        isDisabled: isDisabled(candidate),
        isLocked: isLocked(candidate.id),
        backgroundColor: getBackgroundColor(candidate.id, candidate),
        imageFilter: getImageFilter(candidate),
        dimensions: getMobileDimensions(candidate),
        offset: getMobileOffset(candidate),
      })),
    [
      isDisabled,
      isLocked,
      getBackgroundColor,
      getImageFilter,
      getMobileDimensions,
      getMobileOffset,
    ]
  );

  // Pre-compute candidate data for desktop grid
  const desktopGridData = useMemo(
    () =>
      CANDIDATES.map((candidate) => ({
        candidate,
        isDisabled: isDisabled(candidate),
        isLocked: isLocked(candidate.id),
        backgroundColor: getBackgroundColor(candidate.id, candidate),
        imageFilter: getImageFilter(candidate),
        dimensions: getDesktopDimensions(candidate),
        offset: getDesktopOffset(candidate),
      })),
    [
      isDisabled,
      isLocked,
      getBackgroundColor,
      getImageFilter,
      getDesktopDimensions,
      getDesktopOffset,
    ]
  );

  return (
    <>
      {/* Mobile/SM: Grid 5x2 */}
      <div className="grid grid-cols-5 grid-rows-2 gap-1.5 w-full max-w-[360px] sm:max-w-[420px] xl:hidden mt-8 px-4 sm:px-0">
        {mobileGridData.map((data) => (
          <CandidateButton
            key={data.candidate.id}
            candidate={data.candidate}
            isDisabled={data.isDisabled}
            isLocked={data.isLocked}
            backgroundColor={data.backgroundColor}
            imageFilter={data.imageFilter}
            dimensions={data.dimensions}
            offset={data.offset}
            onClick={() => handleClick(data.candidate)}
          />
        ))}
      </div>

      {/* MD and up: Grid 2 columns */}
      <div className="hidden xl:grid grid-cols-2 gap-3 w-full max-w-[350px] xl:max-w-[420px]">
        {desktopGridData.map((data) => (
          <DesktopCandidateButton
            key={data.candidate.id}
            candidate={data.candidate}
            isDisabled={data.isDisabled}
            isLocked={data.isLocked}
            backgroundColor={data.backgroundColor}
            imageFilter={data.imageFilter}
            dimensions={data.dimensions}
            offset={data.offset}
            onClick={() => handleClick(data.candidate)}
          />
        ))}
      </div>
    </>
  );
});

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
