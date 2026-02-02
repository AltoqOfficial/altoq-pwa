"use client";

import { Typography, Logo } from "@/components/atoms";
import { NAV_ITEMS } from "../constants";
import {
  IdCard,
  Landmark,
  BriefcaseBusiness,
  Globe,
  Pin,
  Glasses,
  Scale,
  HatGlasses,
} from "lucide-react";

interface SectionNavbarProps {
  activeNavIndex: number;
  navContainerRef?: React.RefObject<HTMLDivElement | null>;
  onNavClick: (index: number) => void;
  onScrollNav?: (direction: "left" | "right") => void;
}

/**
 * Section Navbar Component (Sidebar)
 * Vertical navigation for comparison sections, mimicking the hamburger menu style on desktop
 */
export function SectionNavbar({
  activeNavIndex,
  onNavClick,
  navContainerRef,
}: SectionNavbarProps) {
  // Mapping for Lucide icons
  const MENU_ICONS: Record<string, React.ReactNode> = {
    PerfilGeneral: (
      <IdCard className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    ExperienciaPolitica: (
      <Landmark className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    ExperienciaProfesional: (
      <BriefcaseBusiness className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    IdeologiaPolitica: (
      <Globe className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    PropuestasPrincipales: (
      <Pin className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    CoherenciaconelPlan: (
      <Glasses className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    Controversias: (
      <HatGlasses className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    Transparencia: (
      <Scale className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    Competenciaspersonales: (
      <Glasses className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    PercepcionPublica: (
      <Globe className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    InnovacionyVision: (
      <Pin className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
    HistorialLegislativo: (
      <Landmark className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
    ),
  };

  return (
    <nav
      className="flex flex-col w-full pl-6 pr-6"
      id="comparison-navbar"
      ref={navContainerRef}
    >
      {/* Logo Section */}
      <div className="pl-6 py-6 w-full mb-4 mt-6">
        <Logo variant="default" asLink priority />
      </div>

      <div className="flex flex-col gap-1 w-full border-l border-white/10 pl-6">
        {NAV_ITEMS.map((item, index) => {
          if (item === "Proyectos de Ley") return null;

          const normalizedKey = item
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\s-]/g, "");

          const icon = MENU_ICONS[normalizedKey];
          const isActive = activeNavIndex === index;

          return (
            <button
              key={item}
              onClick={() => onNavClick(index)}
              className={`relative w-full flex items-center gap-4 text-left py-3 transition-colors duration-300 group ${
                isActive ? "text-[#FF2727]" : "text-white hover:text-white/80"
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -left-[26px] top-1/2 -translate-y-1/2 h-8 w-[4px] bg-[#FF2727]" />
              )}

              {/* Hover Indicator */}
              <div
                className={`absolute -left-[26px] top-1/2 -translate-y-1/2 h-0 w-[4px] bg-[#FF2727]/50 transition-all duration-300 group-hover:h-6 ${isActive ? "opacity-0" : "opacity-100"}`}
              />

              {icon && (
                <div className="shrink-0 flex justify-center">{icon}</div>
              )}

              <Typography
                variant="p"
                font="sohneBreit"
                weight={isActive ? "600" : "200"}
                className="text-sm xl:text-base leading-none pt-1"
              >
                {item}
              </Typography>
            </button>
          );
        })}
      </div>

      {/* Additional Menu Section - Projects */}
      {/* <div className="mt-8">
        <Typography
          variant="p"
          font="sohneBreit"
          weight="400"
          className="text-white text-sm xl:text-base mb-4 pl-6"
        >
          ACERCA DE LOS PARTIDOS
        </Typography>

        <div className="border-l border-white/10 pl-6">
          <button
            onClick={() => projectsIndex !== -1 && onNavClick(projectsIndex)}
            className={`relative w-full flex items-center gap-4 text-left py-2 transition-colors duration-300 group ${
              activeNavIndex === projectsIndex
                ? "text-[#FF2727]"
                : "text-white hover:text-white/80"
            }`}
          >
            {activeNavIndex === projectsIndex && (
              <div className="absolute -left-[26px] top-1/2 -translate-y-1/2 h-8 w-[4px] bg-[#FF2727]" />
            )}
            <div
              className={`absolute -left-[26px] top-1/2 -translate-y-1/2 h-0 w-[4px] bg-[#FF2727]/50 transition-all duration-300 group-hover:h-6 ${
                activeNavIndex === projectsIndex ? "opacity-0" : "opacity-100"
              }`}
            />
            <div className="shrink-0 flex justify-center">
              <Scale className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
            </div>
            <Typography
              variant="p"
              font="sohneBreit"
              weight={activeNavIndex === projectsIndex ? "600" : "200"}
              className="text-sm xl:text-base leading-none pt-1"
            >
              Proyectos de Ley
            </Typography>
          </button>
        </div>
      </div> */}
    </nav>
  );
}
