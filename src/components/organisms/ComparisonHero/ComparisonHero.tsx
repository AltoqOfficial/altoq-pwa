"use client";

import { useMemo, useId, useCallback, lazy, Suspense, memo } from "react";
import Image from "next/image";
import { Typography } from "@/components/atoms";
import { useCandidateSelection, useSectionNavigation } from "@/hooks";
import {
  SectionNavbar,
  CandidateSelector,
  SectionWrapper,
  HorizontalSections,
  SVGFilters,
  getFilterIds,
} from "./components";
import {
  getCandidateDataKey,
  getCandidateById,
} from "./components/CandidateSelector";
import { NAV_ITEMS } from "./constants";
import { getCandidateData } from "@/data";
import type { CandidateComparisonData } from "@/data";
import { ALL_SECTIONS_CONFIG } from "./config";

// Lazy load section components for better initial load performance
const PerfilGeneralSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.PerfilGeneralSection }))
);
const ExperienciaPoliticaSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.ExperienciaPoliticaSection }))
);
const ExperienciaGestionSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.ExperienciaGestionSection }))
);
const IdeologiaPoliticaSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.IdeologiaPoliticaSection }))
);
const PropuestasPrincipalesSection = lazy(() =>
  import("./sections").then((m) => ({
    default: m.PropuestasPrincipalesSection,
  }))
);
const CoherenciaConElPlanSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.CoherenciaConElPlanSection }))
);
const ControversiasSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.ControversiasSection }))
);
const TransparenciaSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.TransparenciaSection }))
);
const CompetenciasPersonalesSection = lazy(() =>
  import("./sections").then((m) => ({
    default: m.CompetenciasPersonalesSection,
  }))
);
const PercepcionPublicaSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.PercepcionPublicaSection }))
);
const InnovacionYVisionSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.InnovacionYVisionSection }))
);
const HistorialLegislativoSection = lazy(() =>
  import("./sections").then((m) => ({ default: m.HistorialLegislativoSection }))
);

/**
 * Section component mapping for dynamic rendering (lazy loaded)
 */
const SECTION_COMPONENTS: Record<
  string,
  React.LazyExoticComponent<
    React.ComponentType<{
      leftCandidate: CandidateComparisonData | null;
      rightCandidate: CandidateComparisonData | null;
    }>
  >
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
 * Loading fallback for lazy loaded sections
 */
const SectionLoadingFallback = memo(function SectionLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-400/30" />
        <div className="h-4 w-32 bg-neutral-400/30 rounded" />
      </div>
    </div>
  );
});

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
      className={`font-sohne-schmal font-black text-center flex items-center justify-center relative ${className}`}
    >
      <span className="bg-linear-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent">
        A COMPARAR
      </span>
      <span className="bg-linear-to-b from-[#A90003] to-[#FF2F2F] bg-clip-text text-transparent -translate-y-2 sm:-translate-y-3 md:-translate-y-4">
        !
      </span>
    </h1>
  );
});

/**
 * VS Badge Component - Memoized
 */
const VSBadge = memo(function VSBadge({
  gradientId,
  filterId,
  className = "",
}: {
  gradientId: string;
  filterId: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
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
        fill={`url(#${gradientId})`}
        filter={`url(#${filterId})`}
        fontFamily="var(--font-kenyan-coffee)"
        fontWeight="600"
        fontSize="60"
      >
        VS
      </text>
    </svg>
  );
});

/**
 * Candidate Image Component - Optimized with priority loading for hero images
 */
const CandidateImage = memo(function CandidateImage({
  candidate,
  side,
  isHero = false,
}: {
  candidate: {
    name?: string;
    fullName?: string;
    image: string;
    brightness: number;
    contrast: number;
    saturate: number;
    sepia: number;
    shadows: number;
  };
  side: "left" | "right";
  isHero?: boolean;
}) {
  const filterStyle = `brightness(${candidate.brightness * candidate.shadows}) contrast(${candidate.contrast}) saturate(${candidate.saturate}) sepia(${candidate.sepia})`;

  if (isHero) {
    return (
      <div
        className={`relative w-full h-[220px] sm:h-[220px] md:h-[300px] xl:h-[700px] 2xl:h-[86vh] xl:translate-y-20`}
      >
        <Image
          src={candidate.image}
          alt={candidate.name || candidate.fullName || "Candidato"}
          fill
          priority
          className={`object-cover ${side === "left" ? "object-right" : "object-left"} z-10 animate-candidate-appear xl:scale-100 2xl:scale-108`}
          style={{ filter: filterStyle }}
        />
        {candidate.fullName && (
          <div className="absolute hidden xl:flex xl:top-[59vh] 2xl:top-[65vh] left-1/2 -translate-x-1/2 bg-neutral-500 justify-center px-6 py-4 z-20 whitespace-nowrap">
            <span className="text-white xl:text-lg 2xl:text-xl font-semibold">
              {candidate.fullName}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={candidate.image}
      alt={candidate.name || candidate.fullName || "Candidato"}
      width={140}
      height={80}
      loading="lazy"
      className="w-16 h-auto 2xl:w-[200px] 2xl:h-auto animate-slide-in-left hidden md:block"
    />
  );
});

/**
 * ComparisonHero Component (Organism) - Optimized
 * Hero section for the Compare Candidates page
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

  // Get candidate info for hero display - memoized
  const leftCandidateInfo = useMemo(() => {
    const leftId = selectedCandidates[0];
    if (!leftId) return null;

    const candidateData = getCandidateById(leftId);

    if (leftCandidate) {
      return {
        name: leftCandidate.fullName || leftCandidate.name || "Candidato",
        fullName: leftCandidate.fullName || leftCandidate.name,
        shortName: leftCandidate.shortName || leftCandidate.name,
        image: leftCandidate.image,
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
  }, [selectedCandidates, leftCandidate]);

  const rightCandidateInfo = useMemo(() => {
    const rightId = selectedCandidates[1];
    if (!rightId) return null;

    const candidateData = getCandidateById(rightId);

    if (rightCandidate) {
      return {
        name: rightCandidate.fullName || rightCandidate.name || "Candidato",
        fullName: rightCandidate.fullName || rightCandidate.name,
        shortName: rightCandidate.shortName || rightCandidate.name,
        image: rightCandidate.image,
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
  }, [selectedCandidates, rightCandidate]);

  const hasSelectedCandidates = leftCandidateInfo || rightCandidateInfo;

  // Scroll to comparison navbar
  const scrollToComparison = useCallback(() => {
    const navbarElement = document.getElementById("comparison-navbar");
    if (navbarElement) {
      navbarElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Render a section dynamically based on config - memoized
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
          <Suspense fallback={<SectionLoadingFallback />}>
            <SectionComponent
              leftCandidate={leftCandidate}
              rightCandidate={rightCandidate}
            />
          </Suspense>
        </SectionWrapper>
      );
    },
    [leftCandidate, rightCandidate]
  );

  return (
    <div className="bg-neutral-500 flex justify-center flex-col items-center space-y-6 xl:space-y-18 py-2">
      {/* Centralized SVG Filters - rendered once */}
      <SVGFilters uniqueId={uniqueId} />

      {/* Title for mobile/tablet/lg */}
      <HeroTitle className="xl:hidden text-5xl sm:text-6xl md:text-7xl [&>span:last-child]:text-[80px] [&>span:last-child]:sm:text-[100px] [&>span:last-child]:md:text-[120px]" />

      {/* Hero Section */}
      <div className="w-full">
        <div className="flex justify-center items-center flex-col w-full h-[220px] md:h-full">
          <div className="flex gap-2 h-full xl:gap-15 2xl:gap-30 w-full">
            {/* Left Candidate */}
            <div className="relative w-full max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-1 overflow-hidden">
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
                  fill={`url(#${filterIds.gradientRed})`}
                  filter={`url(#${filterIds.noiseFilter})`}
                />
              </svg>
              {leftCandidateInfo && (
                <CandidateImage
                  candidate={leftCandidateInfo}
                  side="left"
                  isHero
                />
              )}
            </div>

            {/* Center Content */}
            <div className="flex flex-col gap-6 xl:gap-12 order-1 xl:order-2 -mt-8 max-w-sm mx-auto md:max-w-132">
              <div className="mx-auto px-1 sm:px-4 md:px-0 w-full flex flex-col items-center">
                <HeroTitle className="hidden xl:flex text-7xl 2xl:text-8xl [&>span:last-child]:text-[120px] [&>span:last-child]:2xl:text-[140px] [&>span:last-child]:-translate-y-4 [&>span:last-child]:2xl:-translate-y-5" />
                <span className="text-[#fefefe] font-sohne-breit text-xs sm:text-[12px] md:text-lg lg:text-sm text-center block w-29 sm:w-40 md:w-100 mx-auto lg:-my-4">
                  Una comparación política basada en datos reales. Explora quién
                  propone más, quién tiene resultados y quién aún no los
                  demuestra.
                </span>
              </div>
              <div className="hidden xl:flex">
                <CandidateSelector
                  selectedCandidates={selectedCandidates}
                  onCandidateClick={handleCandidateClick}
                  lockSelection={false}
                />
              </div>
            </div>

            {/* Right Candidate */}
            <div className="relative w-full max-w-[280px] xl:max-w-none xl:flex-1 xl:h-full mx-auto xl:mx-0 order-3 overflow-hidden">
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
                  fill={`url(#${filterIds.gradientBlue})`}
                  filter={`url(#${filterIds.noiseFilter})`}
                />
              </svg>
              {rightCandidateInfo && (
                <CandidateImage
                  candidate={rightCandidateInfo}
                  side="right"
                  isHero
                />
              )}
            </div>
          </div>

          {hasSelectedCandidates && (
            <button
              onClick={scrollToComparison}
              className="cursor-pointer hover:scale-110 transition-transform duration-300 animate-fade-in hidden xl:block xl:translate-y-8 2xl:-translate-y-11"
              aria-label="Ir a comparación"
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

        {/* Mobile candidate names */}
        <div className="flex gap-4 justify-center items-center w-full xl:px-6 xl:hidden overflow-hidden">
          <div className="relative flex items-center justify-center">
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
                <h3 className="relative text-white font-bold text-4xl animate-slide-in-left animation-delay-100 font-kenyan py-2 px-4">
                  {leftCandidateInfo.shortName}
                </h3>
              </>
            ) : (
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
            <VSBadge
              gradientId={filterIds.gradientVS}
              filterId={filterIds.noiseFilter}
              className="w-[100px] h-auto md:w-[140px] xl:w-[180px]"
            />
          </div>

          <div className="relative flex items-center justify-center xl:justify-end overflow-visible">
            {rightCandidateInfo ? (
              <>
                <svg
                  className="absolute top-0 bottom-0 left-0 h-full"
                  style={{ width: "calc(100% + 1.5rem)", right: "-1.5rem" }}
                  preserveAspectRatio="none"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#${filterIds.gradientRightName})`}
                    filter={`url(#${filterIds.noiseFilter})`}
                  />
                </svg>
                <h3 className="relative text-white font-bold text-4xl animate-slide-in-right animation-delay-100 font-kenyan text-end py-2 px-4">
                  {rightCandidateInfo.shortName}
                </h3>
              </>
            ) : (
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

      {/* Mobile Candidate Selector */}
      <div className="flex xl:hidden">
        <CandidateSelector
          selectedCandidates={selectedCandidates}
          onCandidateClick={handleCandidateClick}
          lockSelection={false}
        />
      </div>

      {hasSelectedCandidates && (
        <>
          {/* Desktop candidate names bar */}
          <div className="hidden xl:flex gap-4 xl:gap-12 justify-center 2xl:justify-between items-center w-full xl:max-w-336 2xl:max-w-500 px-4 xl:px-12">
            <div className="flex items-center justify-center xl:justify-start gap-4 xl:gap-12">
              {leftCandidateInfo ? (
                <>
                  <CandidateImage candidate={leftCandidateInfo} side="left" />
                  <h3 className="text-white font-bold text-4xl xl:text-5xl 2xl:text-7xl text-start animate-slide-in-left animation-delay-100 font-kenyan">
                    {leftCandidateInfo.shortName}
                  </h3>
                </>
              ) : (
                <Typography
                  font="kenyan"
                  className="text-white/50 font-bold text-xl xl:text-4xl"
                  variant="h1"
                >
                  Selecciona candidato
                </Typography>
              )}
            </div>

            <div className="flex items-center justify-center xl:order-0 xl:scale-80 2xl:scale-110 2xl:px-32">
              <VSBadge
                gradientId={filterIds.gradientVS}
                filterId={filterIds.noiseFilter}
                className="w-[100px] h-auto md:w-[140px] xl:w-[180px]"
              />
            </div>

            <div className="flex items-center justify-center xl:justify-end gap-4 xl:gap-12">
              {rightCandidateInfo ? (
                <>
                  <h3 className="text-white font-bold text-4xl xl:text-5xl 2xl:text-7xl animate-slide-in-left animation-delay-100 font-kenyan text-end">
                    {rightCandidateInfo.shortName}
                  </h3>
                  <CandidateImage candidate={rightCandidateInfo} side="right" />
                </>
              ) : (
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

          {/* Horizontal Sections Container - Rendered dynamically with lazy loading */}
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
