import { Typography } from "@/components/atoms";
import { NAV_ITEMS } from "../constants";

interface SectionNavbarProps {
  activeNavIndex: number;
  navContainerRef: React.RefObject<HTMLDivElement | null>;
  onNavClick: (index: number) => void;
  onScrollNav: (direction: "left" | "right") => void;
}

/**
 * Section Navbar Component
 * Horizontal scrollable navigation for comparison sections
 */
export function SectionNavbar({
  activeNavIndex,
  navContainerRef,
  onNavClick,
  onScrollNav,
}: SectionNavbarProps) {
  return (
    <div
      id="comparison-navbar"
      className="bg-linear-to-r from-[#FF2727] to-[#2F356E] w-full sticky top-0 z-50"
    >
      <nav className="flex items-center">
        <button
          onClick={() => onScrollNav("left")}
          className="shrink-0 p-2 md:p-3 lg:p-4 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            className="w-2 h-3 md:w-3 md:h-4 lg:w-[13px] lg:h-5"
          >
            <path
              d="M12.12 2.12 4.24 10l7.88 7.88L10 20 0 10 10 0z"
              fill="#FEFEFE"
            />
          </svg>
        </button>

        <div
          ref={navContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-1 md:gap-2 py-2 md:py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              onClick={() => onNavClick(index)}
              className={`shrink-0 px-3 md:px-5 lg:px-8 py-2 md:py-3 cursor-pointer transition-all duration-300 ${
                activeNavIndex === index
                  ? "opacity-100 scale-105"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <Typography
                font="kenyan"
                weight="600"
                variant="h4"
                color="white"
                className="uppercase whitespace-nowrap text-xs md:text-sm lg:text-base"
              >
                {item}
              </Typography>
            </button>
          ))}
        </div>

        <button
          onClick={() => onScrollNav("right")}
          className="shrink-0 p-2 md:p-3 lg:p-4 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            className="w-2 h-3 md:w-3 md:h-4 lg:w-[13px] lg:h-5"
          >
            <path
              d="M0 2.12 7.88 10 0 17.88 2.12 20l10-10-10-10z"
              fill="#FEFEFE"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
