"use client";

import { useMemo, useId } from "react";
import { PageHero } from "@/components/molecules/PageHero";
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

    // First try to get from full candidate data
    if (leftCandidate) {
      return {
        name: leftCandidate.fullName,
        image: leftCandidate.image,
      };
    }

    // Fallback to CANDIDATES array
    const candidate = getCandidateById(leftId);
    if (candidate) {
      return {
        name: candidate.name,
        image: candidate.src,
      };
    }

    return null;
  }, [selectedCandidates, leftCandidate]);

  const rightCandidateInfo = useMemo(() => {
    const rightId = selectedCandidates[1];
    if (!rightId) return null;

    // First try to get from full candidate data
    if (rightCandidate) {
      return {
        name: rightCandidate.fullName,
        image: rightCandidate.image,
      };
    }

    // Fallback to CANDIDATES array
    const candidate = getCandidateById(rightId);
    if (candidate) {
      return {
        name: candidate.name,
        image: candidate.src,
      };
    }

    return null;
  }, [selectedCandidates, rightCandidate]);

  // Check if at least one candidate is selected
  const hasSelectedCandidates = leftCandidateInfo || rightCandidateInfo;

  return (
    <div className="bg-neutral-500 flex justify-center flex-col items-center space-y-8 md:space-y-12 lg:space-y-18">
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
        </defs>
      </svg>

      {/* Hero Section */}
      <div className="flex justify-center items-center flex-col w-full">
        {/* Mobile/Tablet: Vertical layout, Desktop: 3-column grid */}
        <div className="flex flex-col lg:flex-row p-4 md:p-8 lg:p-0 gap-12 w-full lg:h-[700px] lg:gap-0">
          {/* Left Candidate - Mobile: smaller, centered */}
          <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-none lg:flex-1 h-[350px] md:h-[450px] lg:h-full mx-auto lg:mx-0 order-2 lg:order-1 overflow-hidden">
            {/* Red gradient background square with noise */}
            <svg
              className={`absolute top-0 left-auto lg:right-0 transition-all duration-500 ease-out lg:w-[450px] lg:h-full w-full h-full ${
                leftCandidateInfo
                  ? "opacity-100 scale-100"
                  : "opacity-70 scale-100"
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
              <Image
                src={leftCandidateInfo.image}
                alt={leftCandidateInfo.name}
                fill
                className="relative object-cover object-center lg:object-left z-10 animate-candidate-appear"
              />
            ) : null}
          </div>
          {/* Center Content - Selector */}
          <div className="flex justify-center flex-col items-center gap-6 md:gap-8 lg:gap-12 order-1 lg:order-2 lg:px-8 lg:py-12">
            <PageHero
              title="A COMPARAR!"
              description="Una comparación política basada en datos reales. Explora quién propone más, quién tiene resultados y quién aún no lo demuestra."
              className="bg-neutral-500 text-center max-w-md md:max-w-lg"
            />
            <CandidateSelector
              selectedCandidates={selectedCandidates}
              onCandidateClick={handleCandidateClick}
            />
          </div>
          {/* Right Candidate */}
          <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-none lg:flex-1 h-[350px] md:h-[450px] lg:h-full mx-auto lg:mx-0 order-3 overflow-hidden">
            {/* Blue gradient background square with noise */}
            <svg
              className={`absolute top-0 right-auto lg:left-0 transition-all duration-500 ease-out lg:w-[450px] lg:h-full w-full h-full ${
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
              <Image
                src={rightCandidateInfo.image}
                alt={rightCandidateInfo.name}
                fill
                className="relative object-cover object-center lg:object-right z-10 animate-candidate-appear"
              />
            ) : null}
          </div>
        </div>
        {hasSelectedCandidates && (
          <button
            onClick={() => {
              const navbarElement =
                document.getElementById("comparison-navbar");
              if (navbarElement) {
                navbarElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-300 animate-fade-in"
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

      {/* VS Section, Navigation Bar and Comparison Sections - Only show when candidates are selected */}
      {hasSelectedCandidates && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-0 w-full max-w-7xl px-4 md:px-8 lg:px-12">
            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 lg:gap-12">
              {leftCandidateInfo && (
                <>
                  <Image
                    src={leftCandidateInfo.image}
                    alt={leftCandidateInfo.name}
                    width={140}
                    height={80}
                    className="w-16 h-auto md:w-24 lg:w-[140px] animate-slide-in-left"
                  />
                  <Typography
                    font="kenyan"
                    className="text-white font-bold text-2xl md:text-3xl lg:text-5xl animate-slide-in-left animation-delay-100"
                    variant="h1"
                  >
                    {leftCandidateInfo.name}
                  </Typography>
                </>
              )}
              {!leftCandidateInfo && (
                <Typography
                  font="kenyan"
                  className="text-white/50 font-bold text-xl md:text-2xl lg:text-4xl"
                  variant="h1"
                >
                  Selecciona candidato
                </Typography>
              )}
            </div>
            <div className="flex items-center justify-center order-first md:order-0">
              <svg
                viewBox="0 0 120 80"
                className="w-[100px] h-auto md:w-[140px] lg:w-[180px]"
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
            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-6 lg:gap-12">
              {rightCandidateInfo && (
                <>
                  <Typography
                    font="kenyan"
                    className="text-white font-bold text-2xl md:text-3xl lg:text-5xl md:order-1 order-2 animate-slide-in-right animation-delay-100"
                    variant="h1"
                    align="right"
                  >
                    {rightCandidateInfo.name}
                  </Typography>
                  <Image
                    src={rightCandidateInfo.image}
                    alt={rightCandidateInfo.name}
                    width={140}
                    height={80}
                    className="w-16 h-auto md:w-24 lg:w-[140px] md:order-2 order-1 animate-slide-in-right"
                  />
                </>
              )}
              {!rightCandidateInfo && (
                <Typography
                  font="kenyan"
                  className="text-white/50 font-bold text-xl md:text-2xl lg:text-4xl"
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

          {/* Horizontal Sections Container */}
          <HorizontalSections
            activeIndex={activeNavIndex}
            direction={scrollDirection}
          >
            {/* Perfil General Section */}
            <SectionWrapper
              id="PerfilGeneral"
              title="PERFIL GENERAL"
              sectionId="PerfilGeneral"
            >
              <PerfilGeneralSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Experiencia Política Section */}
            <SectionWrapper
              id="ExperienciaPolitica"
              title="EXPERIENCIA POLÍTICA"
              sectionId="ExperienciaPolitica"
            >
              <ExperienciaPoliticaSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Experiencia de Gestión Section */}
            <SectionWrapper
              id="ExperienciadeGestion"
              title="EXPERIENCIA DE GESTIÓN"
              sectionId="ExperienciadeGestion"
            >
              <ExperienciaGestionSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Ideología Política Section */}
            <SectionWrapper
              id="IdeologiaPolitica"
              title="IDEOLOGÍA POLÍTICA"
              sectionId="IdeologiaPolitica"
            >
              <IdeologiaPoliticaSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Propuestas Principales Section */}
            <SectionWrapper
              id="PropuestasPrincipales"
              title="PROPUESTAS PRINCIPALES"
              sectionId="PropuestasPrincipales"
            >
              <PropuestasPrincipalesSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Coherencia con el Plan Section */}
            <SectionWrapper
              id="CoherenciaconelPlan"
              title="COHERENCIA CON EL PLAN"
              sectionId="CoherenciaconelPlan"
            >
              <CoherenciaConElPlanSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Controversias Section */}
            <SectionWrapper
              id="Controversias"
              title="CONTROVERSIAS"
              sectionId="Controversias"
            >
              <ControversiasSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Transparencia Section */}
            <SectionWrapper
              id="Transparencia"
              title="TRANSPARENCIA"
              sectionId="Transparencia"
            >
              <TransparenciaSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Competencias Personales Section */}
            <SectionWrapper
              id="Competenciaspersonales"
              title="COMPETENCIAS PERSONALES"
              sectionId="Competenciaspersonales"
            >
              <CompetenciasPersonalesSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Percepción Pública Section */}
            <SectionWrapper
              id="PercepcionPublica"
              title="PERCEPCIÓN PÚBLICA"
              sectionId="PercepcionPublica"
            >
              <PercepcionPublicaSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Innovación y Visión Section */}
            <SectionWrapper
              id="InnovacionyVision"
              title="INNOVACIÓN Y VISIÓN"
              sectionId="InnovacionyVision"
            >
              <InnovacionYVisionSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>

            {/* Historial Legislativo Section */}
            <SectionWrapper
              id="HistorialLegislativo"
              title="HISTORIAL LEGISLATIVO"
              sectionId="HistorialLegislativo"
            >
              <HistorialLegislativoSection
                leftCandidate={leftCandidate}
                rightCandidate={rightCandidate}
              />
            </SectionWrapper>
          </HorizontalSections>
        </>
      )}
    </div>
  );
}
