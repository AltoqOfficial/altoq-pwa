"use client";

import { useMemo, useId, useCallback, memo, useEffect } from "react";

import { Typography } from "@/components/atoms";
import { Header } from "@/components/organisms/Header/Header";
import { useCandidateSelection } from "@/hooks";
import {
  CandidateSelector,
  SVGFilters,
  getFilterIds,
  VSBadge,
  CandidateImage,
} from "./components";
import {
  getCandidateDataKey,
  getCandidateById,
} from "./components/CandidateSelector";
import { ComparisonProvider } from "./context";
import { CANDIDATES } from "./constants";
import { getCandidateData } from "@/data";
import type { CandidateComparisonData } from "@/data";

import { ComparisonContent } from "./ComparisonContent";

/**
 * Hero Title Component - Memoized for performance
 */
const HeroTitle = memo(function HeroTitle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <h1
      className={`font-sohne-schmal font-black text-center flex items-center justify-center relative text-[#FF2727] ${className}`}
    >
      <span>A COMPARAR !</span>
    </h1>
  );
});

/**
 * ComparisonHero Component (Organism) - Optimized
 * Hero section for the Compare Candidates page
 */
export function ComparisonHero() {
  const { selectedCandidates, handleCandidateClick, clearSelection } =
    useCandidateSelection();

  // Unique IDs for SVG filters
  const uniqueId = useId();
  const filterIds = useMemo(() => getFilterIds(uniqueId), [uniqueId]);

  // Get candidate data based on selection - memoized
  const { leftCandidate, rightCandidate } = useMemo(() => {
    const leftId = selectedCandidates[0];
    const rightId = selectedCandidates[1];

    const leftDataKey = leftId ? getCandidateDataKey(leftId) : "";
    const rightDataKey = rightId ? getCandidateDataKey(rightId) : "";

    return {
      leftCandidate: leftDataKey ? getCandidateData(leftDataKey) : null,
      rightCandidate: rightDataKey ? getCandidateData(rightDataKey) : null,
    };
  }, [selectedCandidates]);

  // Helper function to normalize candidate display data
  const getCandidateDisplayInfo = useCallback(
    (
      candidateId: string | undefined,
      fullCandidateData: CandidateComparisonData | null
    ) => {
      if (!candidateId) return null;

      const candidateData = getCandidateById(candidateId);

      if (fullCandidateData) {
        return {
          name: fullCandidateData.fullName,
          fullName: fullCandidateData.fullName,
          shortName: fullCandidateData.shortName,
          image: fullCandidateData.image,
          brightness: candidateData?.brightness ?? 1,
          contrast: candidateData?.contrast ?? 1,
          saturate: candidateData?.saturate ?? 1,
          sepia: candidateData?.sepia ?? 0,
          shadows: candidateData?.shadows ?? 1,
        };
      }

      if (candidateData) {
        return {
          name: candidateData.name,
          image: candidateData.src,
          brightness: candidateData.brightness ?? 1,
          contrast: candidateData.contrast ?? 1,
          saturate: candidateData.saturate ?? 1,
          sepia: candidateData.sepia ?? 0,
          shadows: candidateData.shadows ?? 1,
        };
      }

      return null;
    },
    []
  );

  // Get candidate info for hero display - memoized
  const { leftCandidateInfo, rightCandidateInfo } = useMemo(() => {
    return {
      leftCandidateInfo: getCandidateDisplayInfo(
        selectedCandidates[0],
        leftCandidate
      ),
      rightCandidateInfo: getCandidateDisplayInfo(
        selectedCandidates[1],
        rightCandidate
      ),
    };
  }, [
    selectedCandidates,
    leftCandidate,
    rightCandidate,
    getCandidateDisplayInfo,
  ]);

  // Show hero only if NOT both candidates are selected
  // Once both are selected, we hide the hero and just show the comparison
  const showHero = !(leftCandidateInfo && rightCandidateInfo);

  // Auto-scroll to top when comparison starts (hero hidden)
  useEffect(() => {
    if (!showHero) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showHero]);
  const placeholders = useMemo(() => {
    const keiko = CANDIDATES.find((c) => c.id === "keiko");
    const lopez = CANDIDATES.find((c) => c.id === "lopez");

    const mapToDisplay = (c: (typeof CANDIDATES)[0]) => ({
      name: c.name,
      fullName: c.name,
      image: c.src,
      brightness: c.brightness ?? 1,
      contrast: c.contrast ?? 1,
      saturate: c.saturate ?? 1,
      sepia: c.sepia ?? 0,
      shadows: c.shadows ?? 1,
    });

    return {
      left: keiko ? mapToDisplay(keiko) : null,
      right: lopez ? mapToDisplay(lopez) : null,
    };
  }, []);

  // Scroll to comparison section
  const scrollToComparison = useCallback(() => {
    const element = document.getElementById("comparison-start");
    if (element) {
      const offset = 80; // Offset for header overlap
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Auto-scroll when both candidates are selected
  useEffect(() => {
    if (leftCandidateInfo && rightCandidateInfo) {
      // Small timeout to allow render
      const timer = setTimeout(() => {
        scrollToComparison();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [leftCandidateInfo, rightCandidateInfo, scrollToComparison]);

  return (
    <ComparisonProvider value={{ activeNavIndex: 0, onNavClick: () => {} }}>
      <div
        className={`bg-neutral-500 relative flex justify-center flex-col items-center md:mt-0 ${
          showHero ? "py-2" : ""
        }`}
      >
        {/* Centralized SVG Filters - rendered once */}
        <SVGFilters uniqueId={uniqueId} />

        {showHero && (
          <>
            <Header
              forceShow={true}
              className="hidden md:flex absolute top-0 w-full z-50 mb-4"
            />
            {/* Hero Section */}
            <div className="w-full">
              <div className="relative flex justify-center items-center flex-col w-full h-[380px] md:h-full">
                <div className="flex gap-2 h-full xl:gap-15 2xl:gap-30 w-full relative">
                  {/* Left Candidate */}
                  <div className="absolute  left-0 bottom-0 h-1/2 w-[35%] sm:w-[40%] xl:static xl:w-auto max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-1 overflow-hidden z-1">
                    {/* Red gradient background with noise */}
                    <svg
                      className={`absolute top-0 left-auto xl:right-0 transition-all duration-500 ease-out xl:w-[450px] w-full h-full hidden xl:block ${
                        leftCandidateInfo
                          ? "opacity-100 scale-100"
                          : "opacity-40 scale-100"
                      }`}
                      preserveAspectRatio="none"
                    >
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#${filterIds.gradientBlue})`}
                        filter={`url(#${filterIds.noiseFilter})`}
                      />
                    </svg>
                    {leftCandidateInfo ? (
                      <CandidateImage
                        candidate={leftCandidateInfo}
                        side="left"
                        isHero
                      />
                    ) : (
                      placeholders.left && (
                        <div
                          onClick={() => handleCandidateClick("keiko")}
                          title="Seleccionar Keiko Fujimori"
                          className="cursor-pointer"
                        >
                          <CandidateImage
                            candidate={placeholders.left}
                            side="left"
                            isHero
                            isPlaceholder
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* Center Content */}
                  <div className="relative z-10 flex flex-col justify-start xl:justify-center gap-6 order-1 xl:order-2 max-w-sm mx-auto xl:max-w-none xl:h-full w-full xl:w-auto pointer-events-none xl:pointer-events-auto">
                    <Header
                      forceShow={true}
                      className="md:hidden static! bg-transparent! p-0! py-2! pointer-events-auto"
                    />
                    <div className="mx-auto px-1 sm:px-4 md:px-0 w-full flex flex-col items-center pointer-events-auto">
                      <HeroTitle className="flex text-5xl sm:text-6xl md:text-7xl xl:text-7xl 2xl:text-8xl [&>span:last-child]:text-5xl [&>span:last-child]:sm:text-[100px] [&>span:last-child]:md:text-[120px] [&>span:last-child]:xl:text-[60px] [&>span:last-child]:2xl:text-[60px] [&>span:last-child]:xl:translate-y-0" />
                      <span className="text-[#fefefe] font-sohne-breit text-xs pt-4 sm:text-[12px] md:text-lg lg:text-[12px] text-center block w-40 sm:w-40 md:w-100 mx-auto drop-shadow-md">
                        Una comparación política basada en datos reales. Explora
                        quién propone más, quién tiene resultados y quién aún no
                        los demuestra.
                      </span>
                    </div>
                    <div className="hidden xl:flex justify-center pointer-events-auto">
                      <CandidateSelector
                        selectedCandidates={selectedCandidates}
                        onCandidateClick={handleCandidateClick}
                        lockSelection={true}
                      />
                    </div>
                  </div>

                  {/* Right Candidate */}
                  <div className="absolute right-0 bottom-0 h-1/2 w-[35%] sm:w-[40%] xl:static xl:w-auto max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-3 overflow-hidden z-0">
                    <svg
                      className={`absolute top-0 right-auto xl:left-0 transition-all duration-500 ease-out xl:w-[450px] xl:h-full w-full h-full hidden xl:block ${
                        rightCandidateInfo
                          ? "opacity-100 scale-100"
                          : "opacity-70 scale-100"
                      }`}
                      preserveAspectRatio="none"
                    >
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#${filterIds.gradientRed})`}
                        filter={`url(#${filterIds.noiseFilter})`}
                      />
                    </svg>
                    {rightCandidateInfo ? (
                      <CandidateImage
                        candidate={rightCandidateInfo}
                        side="right"
                        isHero
                      />
                    ) : (
                      placeholders.right && (
                        <div
                          onClick={() => handleCandidateClick("lopez")}
                          title="Seleccionar Rafael López Aliaga"
                          className="cursor-pointer"
                        >
                          <CandidateImage
                            candidate={placeholders.right}
                            side="right"
                            isHero
                            isPlaceholder
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile candidate names */}
              <div className="flex gap-1 justify-center items-center w-full px-2 xl:px-6 xl:hidden overflow-hidden mt-4">
                <div className="relative flex-1 flex items-center justify-center">
                  {leftCandidateInfo ? (
                    <>
                      <svg
                        className="absolute inset-0 -left-6 right-1/2 w-[calc(100%+1.5rem)] h-full opacity-80"
                        preserveAspectRatio="none"
                      >
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#${filterIds.gradientLeftName})`}
                          filter={`url(#${filterIds.noiseFilter})`}
                        />
                      </svg>
                      <h3 className="relative text-white font-bold text-[20px] sm:text-4xl animate-slide-in-left animation-delay-100 font-kenyan py-2 px-2 flex flex-col leading-none wrap-break-word w-full text-center">
                        <span>
                          {(leftCandidateInfo.shortName || "").split(" ")[0]}
                        </span>
                        <span className="whitespace-normal">
                          {(leftCandidateInfo.shortName || "")
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                        </span>
                      </h3>
                    </>
                  ) : (
                    <Typography
                      font="kenyan"
                      className="text-white/50 font-bold text-lg xl:text-4xl text-center leading-tight"
                      variant="h1"
                    >
                      Selecciona
                    </Typography>
                  )}
                </div>

                <div className="flex shrink-0 items-center justify-center xl:order-0 scale-75 md:scale-90 w-auto">
                  <VSBadge
                    gradientId={filterIds.gradientVS}
                    filterId={filterIds.noiseFilter}
                    className="w-[80px] h-auto md:w-[140px] xl:w-[180px]"
                  />
                </div>

                <div className="relative flex-1 flex items-center justify-center xl:justify-end overflow-visible">
                  {rightCandidateInfo ? (
                    <>
                      <svg
                        className="absolute top-0 bottom-0 left-0 h-full"
                        style={{
                          width: "calc(100% + 1.5rem)",
                          right: "-1.5rem",
                        }}
                        preserveAspectRatio="none"
                      >
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#${filterIds.gradientRightName})`}
                          filter={`url(#${filterIds.noiseFilter})`}
                        />
                      </svg>
                      <h3 className="relative text-white font-bold text-[20px] sm:text-4xl animate-slide-in-right animation-delay-100 font-kenyan text-end py-2 px-2 flex flex-col items-end leading-none wrap-break-word w-full">
                        <span>
                          {(rightCandidateInfo.shortName || "").split(" ")[0]}
                        </span>
                        <span className="whitespace-normal">
                          {(rightCandidateInfo.shortName || "")
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                        </span>
                      </h3>
                    </>
                  ) : (
                    <Typography
                      font="kenyan"
                      className="text-white/50 font-bold text-lg xl:text-4xl px-2 text-center leading-tight"
                      variant="h1"
                      align="right"
                    >
                      Selecciona
                    </Typography>
                  )}
                </div>
              </div>

              {/* Mobile Candidate Selector */}
            </div>{" "}
            {/* Closing the w-full div from line 196 */}
            <div className="flex xl:hidden pt-5 pb-10">
              <CandidateSelector
                selectedCandidates={selectedCandidates}
                onCandidateClick={handleCandidateClick}
                lockSelection={true}
              />
            </div>
          </>
        )}
        {/* Show sections only when BOTH candidates are selected */}
        {!showHero && (
          <ComparisonContent
            leftCandidateInfo={leftCandidateInfo!}
            rightCandidateInfo={rightCandidateInfo!}
            leftCandidate={leftCandidate}
            rightCandidate={rightCandidate}
            filterIds={filterIds}
            onBack={clearSelection}
          />
        )}
      </div>
    </ComparisonProvider>
  );
}
