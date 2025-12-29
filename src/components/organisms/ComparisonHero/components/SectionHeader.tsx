import { useState } from "react";
import { Typography } from "@/components/atoms";
// import { SECTION_ICONS } from "./SectionIcons"; // Unused
import { useComparisonContext } from "../context";
import { NAV_ITEMS } from "../constants";
import {
  IdCard,
  Landmark,
  BriefcaseBusiness,
  Globe,
  Pin,
  Glasses,
  Scale,
} from "lucide-react";

interface SectionHeaderProps {
  title: string;
  // sectionId is no longer used for dynamic icons
  sectionId?: string;
}

/**
 * Section Header Component
 * Displays a section title with roman numeral SVG indicator
 * On mobile, it acts as a sticky header with a hamburger menu
 */
export function SectionHeader({ title }: SectionHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { onNavClick, activeNavIndex } = useComparisonContext();

  // Static icon for all sections (Single Red Bar)
  const SingleBarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="72"
      viewBox="0 0 23 72"
      fill="none"
      className="h-12 md:h-16 lg:h-[72px] w-auto shrink-0"
    >
      <g filter="url(#perfilGeneral-a)">
        <path d="M22.7 0v71.8H0V0z" fill="#ff2727" />
      </g>
      <defs>
        <filter
          id="perfilGeneral-a"
          x="0"
          y="0"
          width="22.699"
          height="71.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90909087657928467 0.90909087657928467"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="8137"
          />
          <feComponentTransfer in="noise" result="coloredNoise1">
            <feFuncR type="linear" slope="2" intercept="-.5" />
            <feFuncG type="linear" slope="2" intercept="-.5" />
            <feFuncB type="linear" slope="2" intercept="-.5" />
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feComponentTransfer in="noise1Clipped" result="color1">
            <feFuncA type="table" tableValues="0 0.5" />
          </feComponentTransfer>
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );

  return (
    <>
      <div className="sticky top-0 z-30 bg-neutral-500 flex items-center justify-between w-full border-b-2 border-white pb-6 pt-4 shadow-md">
        <div className="flex gap-3 md:gap-4 lg:gap-6 items-center">
          {SingleBarIcon}
          <div className="flex flex-col">
            <Typography
              font="sohneBreit"
              color="primary"
              weight="800"
              variant="h6"
              align="left"
              className="text-[12px] lg:text-[16px]"
            >
              SECCIÓN
            </Typography>
            <Typography
              font="sohneBreit"
              color="white"
              weight="800"
              variant="h1"
              align="left"
              className="text-[20px] lg:text-[32px]"
            >
              {title}
            </Typography>
          </div>
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white focus:outline-none"
          aria-label="Abrir menú"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Full Screen Menu Overlay - Mobile Only */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-100 bg-neutral-500 flex flex-col md:hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-6 border-b border-white/10">
            <Typography
              font="sohneBreit"
              color="white"
              weight="800"
              className="text-xl"
            >
              SECCIONES
            </Typography>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-8">
            <div className="flex flex-col ml-10">
              <div className="border-l border-white/10">
                {NAV_ITEMS.map((item, index) => {
                  const normalizedKey = item
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[\s-]/g, "");

                  // Mapping for Lucide icons
                  const MENU_ICONS: Record<string, React.ReactNode> = {
                    PerfilGeneral: (
                      <IdCard className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    ExperienciaPolitica: (
                      <Landmark className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    ExperienciaProfesional: (
                      <BriefcaseBusiness
                        className="w-6 h-6"
                        strokeWidth={1.5}
                      />
                    ),
                    IdeologiaPolitica: (
                      <Globe className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    PropuestasPrincipales: (
                      <Pin className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    CoherenciaconelPlan: (
                      <Glasses className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    Controversias: (
                      <Scale className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    // Extended mapping for remaining items
                    Transparencia: (
                      <Scale className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    Competenciaspersonales: (
                      <Glasses className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    PercepcionPublica: (
                      <Globe className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    InnovacionyVision: (
                      <Pin className="w-6 h-6" strokeWidth={1.5} />
                    ),
                    HistorialLegislativo: (
                      <Landmark className="w-6 h-6" strokeWidth={1.5} />
                    ),
                  };

                  const icon = MENU_ICONS[normalizedKey];
                  const isActive = activeNavIndex === index;

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        onNavClick(index);
                        setIsMenuOpen(false);
                      }}
                      className={`relative w-full flex items-center gap-5 text-left pl-8 py-5 transition-colors duration-300 ${
                        isActive
                          ? "text-[#FF2727]"
                          : "text-white hover:text-white/80"
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute -left-[2.5px] top-1/2 -translate-y-1/2 h-8 w-[4px] bg-[#FF2727]" />
                      )}

                      {icon && (
                        <div className="shrink-0 flex justify-center">
                          {icon}
                        </div>
                      )}

                      <Typography
                        variant="p"
                        font="sohneBreit"
                        weight="200"
                        className="uppercase text-lg leading-none pt-1"
                      >
                        {item}
                      </Typography>
                    </button>
                  );
                })}
              </div>

              {/* Additional Menu Section */}
              <div className="mt-10 mb-10">
                <Typography
                  variant="p"
                  font="sohneBreit"
                  weight="400"
                  className="text-white text-lg uppercase mb-6 pl-8"
                >
                  ACERCA DE LOS PARTIDOS
                </Typography>

                <div className="border-l border-white/10">
                  <button className="relative w-full flex items-center gap-5 text-left pl-8 py-2 text-white hover:text-white/80 transition-colors duration-300">
                    <div className="shrink-0 flex justify-center">
                      <Scale className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <Typography
                      variant="p"
                      font="sohneBreit"
                      weight="200"
                      className="uppercase text-lg leading-none pt-1"
                    >
                      Proyectos de Ley
                    </Typography>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
