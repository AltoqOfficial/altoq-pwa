import { useState } from "react";
import { Typography } from "@/components/atoms";
import { SECTION_ICONS } from "./SectionIcons";
import { useComparisonContext } from "../context";
import { NAV_ITEMS } from "../constants";

interface SectionHeaderProps {
  title: string;
  sectionId: string;
}

/**
 * Section Header Component
 * Displays a section title with roman numeral SVG indicator
 * On mobile, it acts as a sticky header with a hamburger menu
 */
export function SectionHeader({ title, sectionId }: SectionHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { onNavClick, activeNavIndex } = useComparisonContext();

  // Normalize sectionId to match SECTION_ICONS keys (remove spaces and special chars)
  const normalizedId = sectionId.replace(/[\s-]/g, "");
  const icon = SECTION_ICONS[normalizedId];

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 md:gap-4 lg:gap-6 items-center">
          {icon && <div className="shrink-0">{icon}</div>}
          <div className="flex flex-col">
            <Typography
              font="sohneBreit"
              color="primary"
              weight="800"
              variant="h6"
              align="left"
              className="text-xs md:text-sm lg:text-base"
            >
              SECCIÓN
            </Typography>
            <Typography
              font="sohneBreit"
              color="white"
              weight="800"
              variant="h1"
              align="left"
              className="text-xl md:text-2xl lg:text-4xl"
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
        <div className="fixed inset-0 z-100 bg-[#1A1A1A] flex flex-col md:hidden animate-fade-in">
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
          <div className="flex-1 overflow-y-auto py-4">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  onNavClick(index);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-4 border-b border-white/5 last:border-0 ${
                  activeNavIndex === index
                    ? "bg-white/5 text-red-500"
                    : "text-white hover:bg-white/5"
                }`}
              >
                <Typography
                  variant="h4"
                  font="kenyan"
                  className="uppercase text-2xl"
                >
                  {item}
                </Typography>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
