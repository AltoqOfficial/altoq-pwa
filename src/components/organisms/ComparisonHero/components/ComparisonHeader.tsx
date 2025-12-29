import { useState, useEffect } from "react";
import { Typography } from "@/components/atoms";
import { VSBadge, CandidateImage } from "./shared";
import { cn } from "@/lib/utils";

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

interface ComparisonHeaderProps {
  leftCandidateInfo: CandidateDisplayInfo | null;
  rightCandidateInfo: CandidateDisplayInfo | null;
  filterIds: FilterIds;
  onBack: () => void;
  className?: string;
}

/**
 * ComparisonHeader Component
 * Sticky header showing selected candidates during comparison scrolling
 */
export function ComparisonHeader({
  leftCandidateInfo,
  rightCandidateInfo,
  filterIds,
  onBack,
  className,
}: ComparisonHeaderProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled comfortably past the hero area (approx 400px)
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex gap-2 xl:gap-12 justify-between items-center w-full bg-gradient-noise-candidates py-2 sticky top-0 shadow-md transition-all duration-300",
          className
        )}
      >
        <div className="flex items-center justify-between xl:justify-start gap-2 xl:gap-12 px-2 xl:px-12 xl:max-w-336 2xl:max-w-500 w-full mx-auto">
          {/* Left Candidate */}
          <div className="flex items-center justify-start gap-2 xl:gap-12 flex-1">
            {leftCandidateInfo ? (
              <>
                <CandidateImage candidate={leftCandidateInfo} side="left" />
                <h3 className="text-white font-bold text-xs sm:text-lg xl:text-5xl 2xl:text-7xl text-start animate-slide-in-left animation-delay-100 font-kenyan flex flex-col leading-[0.9]">
                  <span>
                    {(leftCandidateInfo.shortName || "").split(" ")[0]}
                  </span>
                  <span className="whitespace-nowrap">
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
                className="text-white/50 font-bold text-xs xl:text-4xl"
                variant="h1"
              >
                Selecciona
              </Typography>
            )}
          </div>

          {/* VS Badge */}
          <div className="flex items-center justify-center shrink-0 scale-50 sm:scale-75 xl:scale-80 2xl:scale-110 xl:px-0 2xl:px-32">
            <VSBadge
              gradientId={filterIds.gradientVS}
              filterId={filterIds.noiseFilter}
              className="w-[100px] h-auto md:w-[140px] xl:w-[180px]"
            />
          </div>

          {/* Right Candidate */}
          <div className="flex items-center justify-end gap-2 xl:gap-12 flex-1">
            {rightCandidateInfo ? (
              <>
                <h3 className="text-white font-bold text-xs sm:text-lg xl:text-5xl 2xl:text-7xl animate-slide-in-left animation-delay-100 font-kenyan text-end flex flex-col items-end leading-[0.9]">
                  <span>
                    {(rightCandidateInfo.shortName || "").split(" ")[0]}
                  </span>
                  <span className="whitespace-nowrap">
                    {(rightCandidateInfo.shortName || "")
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </span>
                </h3>
                <CandidateImage candidate={rightCandidateInfo} side="right" />
              </>
            ) : (
              <Typography
                font="kenyan"
                className="text-white/50 font-bold text-xs xl:text-4xl"
                variant="h1"
                align="right"
              >
                Selecciona
              </Typography>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onBack();
        }}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#FF2727] hover:bg-[#E50000] text-white shadow-lg transition-all duration-300 transform ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
        aria-label="Volver arriba"
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
    </>
  );
}
