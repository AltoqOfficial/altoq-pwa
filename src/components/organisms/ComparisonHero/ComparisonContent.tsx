import {
  useCallback,
  lazy,
  Suspense,
  memo,
  useRef,
  useState,
  useEffect,
} from "react";
import { useSectionNavigation } from "@/hooks";
import { Header } from "@/components/organisms/Header/Header";
import {
  SectionNavbar,
  SectionWrapper,
  HorizontalSections,
} from "./components";

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

interface ComparisonContentProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
  onBack: () => void;
}

export function ComparisonContent({
  leftCandidate,
  rightCandidate,
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor Scroll for Header
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
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
      <div className="flex flex-col h-dvh overflow-hidden bg-neutral-500 w-full relative">
        {/* Fixed Header synced with container scroll */}
        <div className="absolute top-0 left-0 right-0 z-[60]">
          <Header
            forceShow={true}
            variant="transparent"
            isScrolled={isScrolled}
            className="absolute w-full"
          />
        </div>

        {/* Main Layout Area */}
        <div className="flex flex-1 min-h-0 relative pt-20">
          {/* Fixed Sidebar */}
          <div className="hidden xl:block w-72 shrink-0 h-full border-r border-white/10 bg-neutral-500 shadow-[10px_0_30px_-10px_rgba(0,0,0,3)] overflow-y-auto scrollbar-hide z-40 pb-32">
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
            style={{ scrollBehavior: "smooth" }}
            data-lenis-prevent="true"
          >
            <div
              className="w-full flex justify-center min-h-full"
              id="comparison-content-start"
            >
              <div className="w-full max-w-[100vw] px-4 xl:px-12 pb-32 pt-4">
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
        {/* Floating Scroll to Top / Back Button */}
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
            onBack();
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#FF2727] hover:scale-105 text-white shadow-lg transition-all duration-300 transform translate-y-0 opacity-100"
          aria-label="Volver al inicio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>
    </ComparisonProvider>
  );
}
