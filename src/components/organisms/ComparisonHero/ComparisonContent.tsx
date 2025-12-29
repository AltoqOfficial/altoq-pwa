"use client";

import { useCallback, lazy, Suspense, memo, useRef } from "react";
import { useSectionNavigation } from "@/hooks";
import {
  SectionNavbar,
  SectionWrapper,
  HorizontalSections,
  ComparisonHeader,
} from "./components";
import { Header } from "../Header/Header";
import type { CandidateComparisonData } from "@/data";
import { ALL_SECTIONS_CONFIG } from "./config";
import { NAV_ITEMS } from "./constants";
import { ComparisonProvider } from "./context";

// Lazy load section components
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
 * Section component mapping
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
  ExperienciaProfesional: ExperienciaGestionSection,
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

interface CandidateDisplayInfo {
  name: string;
  fullName?: string;
  shortName?: string;
  image: string;
  brightness: number;
  contrast: number;
  saturate: number;
  sepia: number;
  shadows: number;
}

interface FilterIds {
  noiseFilter: string;
  gradientRed: string;
  gradientBlue: string;
  gradientLeftName: string;
  gradientRightName: string;
  gradientVS: string;
  gradientTitle: string;
}

interface ComparisonContentProps {
  leftCandidateInfo: CandidateDisplayInfo;
  rightCandidateInfo: CandidateDisplayInfo;
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
  filterIds: FilterIds;
  onBack: () => void;
}

export function ComparisonContent({
  leftCandidateInfo,
  rightCandidateInfo,
  leftCandidate,
  rightCandidate,
  filterIds,
  onBack,
}: ComparisonContentProps) {
  const {
    activeNavIndex,
    scrollDirection,
    navContainerRef,
    scrollNav,
    handleNavClick,
  } = useSectionNavigation({
    sections: [...NAV_ITEMS],
  });

  // Scroll container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleNavClickWrapper = useCallback(
    (index: number) => {
      handleNavClick(index);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    [handleNavClick]
  );

  return (
    <ComparisonProvider
      value={{
        activeNavIndex,
        onNavClick: handleNavClickWrapper,
      }}
    >
      <div className="flex flex-col h-dvh overflow-hidden bg-neutral-500">
        {/* Fixed Header Area */}
        <div className="flex-none z-50 flex flex-col w-full shadow-lg">
          <Header forceShow className="static shadow-none" />
          <ComparisonHeader
            leftCandidateInfo={leftCandidateInfo}
            rightCandidateInfo={rightCandidateInfo}
            filterIds={filterIds}
            onBack={onBack}
            className="static shadow-none"
          />
        </div>

        {/* Main Layout Area */}
        <div className="flex flex-1 min-h-0 relative">
          {/* Fixed Sidebar */}
          <div className="hidden xl:block w-72 shrink-0 h-full border-r border-white/10 bg-black/20 backdrop-blur-[20px] overflow-hidden z-40">
            <SectionNavbar
              activeNavIndex={activeNavIndex}
              navContainerRef={navContainerRef}
              onNavClick={handleNavClickWrapper}
              onScrollNav={scrollNav}
            />
          </div>

          {/* Scrollable Content Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden scroll-smooth"
            id="comparison-content-scroll-container"
          >
            <div
              className="w-full flex justify-center min-h-full"
              id="comparison-content-start"
            >
              <div className="w-full max-w-[100vw] xl:max-w-336 2xl:max-w-500 px-4 xl:px-12 pb-20 pt-8">
                <HorizontalSections
                  activeIndex={activeNavIndex}
                  direction={scrollDirection}
                >
                  {ALL_SECTIONS_CONFIG.map(renderSection)}
                </HorizontalSections>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComparisonProvider>
  );
}
