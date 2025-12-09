"use client";

import { useMemo, useId, useCallback } from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import { useCandidateSelection, useSectionNavigation } from "@/hooks";
import {
  SectionNavbar,
  CandidateSelector,
  SectionWrapper,
  HorizontalSections,
} from "./components";
import {
  getCandidateDataKey,
  getCandidateById,
} from "./components/CandidateSelector";
import { NAV_ITEMS } from "./constants";
import { getCandidateData } from "@/data";
import type { CandidateComparisonData } from "@/data";
import { ALL_SECTIONS_CONFIG } from "./config";

// Import all section components
import {
  PerfilGeneralSection,
  ExperienciaPoliticaSection,
  ExperienciaGestionSection,
  IdeologiaPoliticaSection,
  PropuestasPrincipalesSection,
  CoherenciaConElPlanSection,
  ControversiasSection,
  TransparenciaSection,
  CompetenciasPersonalesSection,
  PercepcionPublicaSection,
  InnovacionYVisionSection,
  HistorialLegislativoSection,
} from "./sections";

/**
 * Section component mapping for dynamic rendering
 */
const SECTION_COMPONENTS: Record<
  string,
  React.ComponentType<{
    leftCandidate: CandidateComparisonData | null;
    rightCandidate: CandidateComparisonData | null;
  }>
> = {
  PerfilGeneral: PerfilGeneralSection,
  ExperienciaPolitica: ExperienciaPoliticaSection,
  ExperienciadeGestion: ExperienciaGestionSection,
  IdeologiaPolitica: IdeologiaPoliticaSection,
  PropuestasPrincipales: PropuestasPrincipalesSection,
  CoherenciaconelPlan: CoherenciaConElPlanSection,
  Controversias: ControversiasSection,
  Transparencia: TransparenciaSection,
  Competenciaspersonales: CompetenciasPersonalesSection,
  PercepcionPublica: PercepcionPublicaSection,
  InnovacionyVision: InnovacionYVisionSection,
  HistorialLegislativo: HistorialLegislativoSection,
};

/**
 * ComparisonHero Component (Organism)
 * Hero section for the Compare Candidates page
 *
 * Uses PageHero molecule for consistent hero section pattern
 * Allows selecting two candidates to compare:
 * - First selection: Red background (#FF2727)
 * - Second selection: Blue background (#3E4692)
 *
 * Sections are displayed horizontally and slide left/right on navigation
 * Content is dynamically loaded based on selected candidates
 */
export function ComparisonHero() {
  const { selectedCandidates, handleCandidateClick } = useCandidateSelection();
  const {
    activeNavIndex,
    scrollDirection,
    navContainerRef,
    scrollNav,
    handleNavClick,
  } = useSectionNavigation({
    sections: [...NAV_ITEMS],
  });

  // Unique IDs for SVG filters
  const uniqueId = useId();
  const noiseFilterRedId = `noiseFilterRed${uniqueId}`;
  const noiseFilterBlueId = `noiseFilterBlue${uniqueId}`;
  const noiseFilterVSId = `noiseFilterVS${uniqueId}`;
  const gradientVSId = `gradientVS${uniqueId}`;
  const gradientLeftNameId = `gradientLeftName${uniqueId}`;
  const gradientRightNameId = `gradientRightName${uniqueId}`;
  const noiseFilterTitleId = `noiseFilterTitle${uniqueId}`;
  const gradientTitleId = `gradientTitle${uniqueId}`;

  // Get candidate data based on selection
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

  // Get candidate info for hero display (uses CANDIDATES data as fallback)
  const leftCandidateInfo = useMemo(() => {
    const leftId = selectedCandidates[0];
    if (!leftId) return null;

    // Get candidate from CANDIDATES array for filters
    const candidateData = getCandidateById(leftId);

    // First try to get from full candidate data
    if (leftCandidate) {
      return {
        name: leftCandidate.fullName,
        image: leftCandidate.image,
        brightness: candidateData?.brightness ?? 1,
        contrast: candidateData?.contrast ?? 1,
        saturate: candidateData?.saturate ?? 1,
        sepia: candidateData?.sepia ?? 0,
        shadows: candidateData?.shadows ?? 1,
      };
    }

    // Fallback to CANDIDATES array
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
  }, [selectedCandidates, leftCandidate]);

  const rightCandidateInfo = useMemo(() => {
    const rightId = selectedCandidates[1];
    if (!rightId) return null;

    // Get candidate from CANDIDATES array for filters
    const candidateData = getCandidateById(rightId);

    // First try to get from full candidate data
    if (rightCandidate) {
      return {
        name: rightCandidate.fullName,
        image: rightCandidate.image,
        brightness: candidateData?.brightness ?? 1,
        contrast: candidateData?.contrast ?? 1,
        saturate: candidateData?.saturate ?? 1,
        sepia: candidateData?.sepia ?? 0,
        shadows: candidateData?.shadows ?? 1,
      };
    }

    // Fallback to CANDIDATES array
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
  }, [selectedCandidates, rightCandidate]);

  // Check if at least one candidate is selected
  const hasSelectedCandidates = leftCandidateInfo || rightCandidateInfo;

  // Scroll to comparison navbar
  const scrollToComparison = useCallback(() => {
    const navbarElement = document.getElementById("comparison-navbar");
    if (navbarElement) {
      navbarElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Render a section dynamically based on config
  const renderSection = useCallback(
    (config: (typeof ALL_SECTIONS_CONFIG)[0]) => {
      const SectionComponent = SECTION_COMPONENTS[config.id];
      if (!SectionComponent) return null;

      return (
        <SectionWrapper
          key={config.id}
          id={config.id}
          title={config.title}
          sectionId={config.navId}
        >
          <SectionComponent
            leftCandidate={leftCandidate}
            rightCandidate={rightCandidate}
          />
        </SectionWrapper>
      );
    },
    [leftCandidate, rightCandidate]
  );

  return (
    <div className="bg-neutral-500 flex justify-center flex-col items-center space-y-6 xl:space-y-18 min-h-screen py-2">
      {/* SVG Filters for Noise Effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Gradient for Red background */}
          <linearGradient
            id={`gradientRed${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF272780" />
            <stop offset="100%" stopColor="#202020" />
          </linearGradient>

          {/* Gradient for Blue background */}
          <linearGradient
            id={`gradientBlue${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3E469240" />
            <stop offset="100%" stopColor="#202020" />
          </linearGradient>

          {/* Gradient for Left candidate name (horizontal) */}
          <linearGradient
            id={gradientLeftNameId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FF2727" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Gradient for Right candidate name (horizontal) */}
          <linearGradient
            id={gradientRightNameId}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3E4692" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Noise filter for Red */}
          <filter
            id={noiseFilterRedId}
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

          {/* Noise filter for Blue */}
          <filter
            id={noiseFilterBlueId}
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

          {/* Gradient for VS text */}
          <linearGradient id={gradientVSId} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#A90003" />
            <stop offset="100%" stopColor="#FF2F2F" />
          </linearGradient>

          {/* Noise filter for VS */}
          <filter
            id={noiseFilterVSId}
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

          {/* Gradient for Title */}
          <linearGradient
            id={gradientTitleId}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#A90003" />
            <stop offset="100%" stopColor="#FF2F2F" />
          </linearGradient>

          {/* Noise filter for Title */}
          <filter
            id={noiseFilterTitleId}
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

      {/* Title for mobile/tablet/lg */}
      <h1 className="xl:hidden font-sohne-schmal font-black text-5xl sm:text-6xl md:text-7xl text-center flex items-center justify-center relative">
        <span className="bg-gradient-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent">
          A COMPARAR
        </span>
        <span className="bg-gradient-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent text-[80px] sm:text-[100px] md:text-[120px] -translate-y-2 sm:-translate-y-3 md:-translate-y-4">
          !
        </span>
        <span
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </h1>
      {/* Hero Section */}
      <div className="w-full">
        <div className="flex justify-center items-center flex-col w-full  h-[220px] md:h-full">
          {/* Mobile/Tablet: Vertical layout, Desktop: 3-column grid */}
          <div className="flex gap-2 h-full xl:gap-18 w-full">
            {/* Left Candidate - Mobile: smaller, centered */}
            <div className="relative w-full max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-1 overflow-hidden ">
              {/* Red gradient background square with noise */}
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
                  fill={`url(#gradientRed${uniqueId})`}
                  filter={`url(#${noiseFilterRedId})`}
                />
              </svg>
              {/* Candidate image on top */}
              {leftCandidateInfo ? (
                <div className="relative w-full h-[220px] sm:h-[220px] md:h-[300px] xl:h-[600px] 2xl:h-screen xl:translate-y-8">
                  <Image
                    src={leftCandidateInfo.image}
                    alt={leftCandidateInfo.name}
                    fill
                    className="object-cover object-right z-10 animate-candidate-appear xl:scale-108"
                    style={{
                      filter: `brightness(${leftCandidateInfo.brightness * leftCandidateInfo.shadows}) contrast(${leftCandidateInfo.contrast}) saturate(${leftCandidateInfo.saturate}) sepia(${leftCandidateInfo.sepia})`,
                    }}
                  />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-6 xl:gap-12 order-1 xl:order-2 xl:py-12 2xl:py-0 max-w-sm mx-auto md:max-w-132">
              <div className="mx-auto px-1 sm:px-4 md:px-0 w-full flex flex-col items-center">
                {/* Title for xl+ */}
                <h1 className="hidden xl:flex font-sohne-schmal font-black text-7xl 2xl:text-8xl text-center items-center justify-center relative">
                  <span className="bg-gradient-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent">
                    A COMPARAR
                  </span>
                  <span className="bg-gradient-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent text-[120px] 2xl:text-[140px] -translate-y-4 2xl:-translate-y-5">
                    !
                  </span>
                  <span
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </h1>
                <span className="text-[#fefefe] font-sohne-breit text-xs sm:text-[12px] md:text-lg text-center block w-29 sm:w-40 md:w-100 mx-auto">
                  Una comparación política basada en datos reales. Explora quién
                  propone más, quién tiene resultados y quién aún no los
                  demuestra.
                </span>
              </div>
              <div className="hidden xl:flex">
                <CandidateSelector
                  selectedCandidates={selectedCandidates}
                  onCandidateClick={handleCandidateClick}
                  lockSelection={true}
                />
              </div>
            </div>
            {/* Right Candidate */}
            <div className="relative w-full max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-3 overflow-hidden">
              {/* Blue gradient background square with noise */}
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
                  fill={`url(#gradientBlue${uniqueId})`}
                  filter={`url(#${noiseFilterBlueId})`}
                />
              </svg>
              {/* Candidate image on top */}
              {rightCandidateInfo ? (
                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[300px] xl:h-[600px] 2xl:h-screen xl:translate-y-8">
                  <Image
                    src={rightCandidateInfo.image}
                    alt={rightCandidateInfo.name}
                    fill
                    className="object-cover object-left z-10 animate-candidate-appear xl:scale-108"
                    style={{
                      filter: `brightness(${rightCandidateInfo.brightness * rightCandidateInfo.shadows}) contrast(${rightCandidateInfo.contrast}) saturate(${rightCandidateInfo.saturate}) sepia(${rightCandidateInfo.sepia})`,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
          {hasSelectedCandidates && (
            <button
              onClick={scrollToComparison}
              className="cursor-pointer hover:scale-110 transition-transform duration-300 animate-fade-in  hidden xl:block -translate-y-30S"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="17"
                viewBox="0 0 45 17"
                fill="none"
              >
                <path
                  d="M43 0L22.6852 13L2.5 0L0 2.02381L22.6852 17L45 2.02381L43 0Z"
                  fill="#FEFEFE"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex gap-4 justify-center items-center w-full xl:px-6 xl:hidden overflow-hidden">
          <div className="relative flex items-center justify-center">
            {leftCandidateInfo && (
              <>
                <div>{rightCandidate.fullName}</div>
                <svg
                  className="absolute inset-0 -left-6 right-1/2 w-[calc(100%+1.5rem)] h-full opacity-80"
                  preserveAspectRatio="none"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${gradientLeftNameId})`}
                    filter={`url(#${noiseFilterRedId})`}
                  />
                </svg>
                <h3 className="relative text-white font-bold text-4xl animate-slide-in-left animation-delay-100 font-kenyan py-2 px-4">
                  {leftCandidateInfo.name}
                </h3>
              </>
            )}
            {!leftCandidateInfo && (
              <Typography
                font="kenyan"
                className="text-white/50 font-bold text-xl xl:text-4xl px-8"
                variant="h1"
              >
                Selecciona candidato
              </Typography>
            )}
          </div>
          <div className="flex items-center justify-center xl:order-0 scale-150 md:scale-90 w-1/2">
            <svg
              viewBox="0 0 120 80"
              className="w-[100px] h-auto md:w-[140px] xl:w-[180px]"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="VS"
              role="img"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fill={`url(#${gradientVSId})`}
                filter={`url(#${noiseFilterVSId})`}
                fontFamily="var(--font-kenyan-coffee)"
                fontWeight="600"
                fontSize="60"
              >
                VS
              </text>
            </svg>
          </div>
          <div className="relative flex items-center justify-center xl:justify-end overflow-visible">
            {rightCandidateInfo && (
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
                    fill={`url(#${gradientRightNameId})`}
                    filter={`url(#${noiseFilterBlueId})`}
                  />
                </svg>
                <h3 className="relative text-white font-bold text-4xl animate-slide-in-right animation-delay-100 font-kenyan text-end py-2 px-4">
                  {rightCandidateInfo.name}
                </h3>
              </>
            )}
            {!rightCandidateInfo && (
              <Typography
                font="kenyan"
                className="text-white/50 font-bold text-xl xl:text-4xl px-8"
                variant="h1"
                align="right"
              >
                Selecciona candidato
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="flex xl:hidden">
        <CandidateSelector
          selectedCandidates={selectedCandidates}
          onCandidateClick={handleCandidateClick}
          lockSelection={true}
        />
      </div>
      {hasSelectedCandidates && (
        <>
          <div className="hidden xl:flex gap-4 xl:gap-12 justify-center 2xl:justify-between items-center w-full xl:max-w-336 2xl:max-w-500 px-4 xl:px-12">
            <div className="flex items-center justify-center xl:justify-start gap-4 xl:gap-12">
              {leftCandidateInfo && (
                <>
                  <Image
                    src={leftCandidateInfo.image}
                    alt={leftCandidateInfo.name}
                    width={140}
                    height={80}
                    className="w-16 h-auto 2xl:w-[200px] 2xl:h-auto animate-slide-in-left hidden md:block"
                  />
                  <h3 className="text-white font-bold text-4xl xl:text-5xl 2xl:text-7xl text-start animate-slide-in-left animation-delay-100 font-kenyan">
                    {leftCandidateInfo.name}
                  </h3>
                </>
              )}
              {!leftCandidateInfo && (
                <Typography
                  font="kenyan"
                  className="text-white/50 font-bold text-xl xl:text-4xl"
                  variant="h1"
                >
                  Selecciona candidato
                </Typography>
              )}
            </div>
            <div className="flex items-center justify-center xl:order-0 xl:scale-80 2xl:scale-110  2xl:px-32 ">
              <svg
                viewBox="0 0 120 80"
                className="w-[100px] h-auto md:w-[140px] xl:w-[180px]"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="VS"
                role="img"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fill={`url(#${gradientVSId})`}
                  filter={`url(#${noiseFilterVSId})`}
                  fontFamily="var(--font-kenyan-coffee)"
                  fontWeight="600"
                  fontSize="60"
                >
                  VS
                </text>
              </svg>
            </div>

            <div className="flex items-center justify-center xl:justify-end gap-4 xl:gap-12 ">
              {rightCandidateInfo && (
                <>
                  <h3 className="text-white font-bold text-4xl xl:text-5xl 2xl:text-7xl animate-slide-in-left animation-delay-100 font-kenyan text-end">
                    {rightCandidateInfo.name}
                  </h3>
                  <Image
                    src={rightCandidateInfo.image}
                    alt={rightCandidateInfo.name}
                    width={140}
                    height={80}
                    className="w-16 h-auto 2xl:w-[200px] 2xl:h-auto animate-slide-in-left hidden md:block"
                  />
                </>
              )}
              {!rightCandidateInfo && (
                <Typography
                  font="kenyan"
                  className="text-white/50 font-bold text-xl xl:text-4xl"
                  variant="h1"
                  align="right"
                >
                  Selecciona candidato
                </Typography>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <SectionNavbar
            activeNavIndex={activeNavIndex}
            navContainerRef={navContainerRef}
            onNavClick={handleNavClick}
            onScrollNav={scrollNav}
          />

          {/* Horizontal Sections Container - Rendered dynamically */}
          <HorizontalSections
            activeIndex={activeNavIndex}
            direction={scrollDirection}
          >
            {ALL_SECTIONS_CONFIG.map(renderSection)}
          </HorizontalSections>
        </>
      )}
    </div>
  );
}
