import { memo } from "react";
import Image from "next/image";

interface CandidateImageProps {
  candidate: {
    name: string;
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
  isPlaceholder?: boolean;
}

/**
 * Candidate Image Component - Optimized with priority loading for hero images
 */
export const CandidateImage = memo(function CandidateImage({
  candidate,
  side,
  isHero = false,
  isPlaceholder = false,
}: CandidateImageProps) {
  const filterStyle = `brightness(${candidate.brightness * candidate.shadows}) contrast(${candidate.contrast}) saturate(${candidate.saturate}) sepia(${candidate.sepia})`;

  // For placeholders: start grayscale, animate to color on hover.
  // For real candidates: use defined filter style styling.
  const heroImageClasses = isPlaceholder
    ? `object-cover ${side === "left" ? "object-right" : "object-left"} z-10 animate-candidate-appear xl:scale-100 2xl:scale-108 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer`
    : `object-cover ${side === "left" ? "object-right" : "object-left"} z-10 animate-candidate-appear xl:scale-100 2xl:scale-108`;

  if (isHero) {
    return (
      <div
        className={`relative w-full h-[220px] sm:h-[220px] md:h-[300px] xl:h-[700px] 2xl:h-[86vh] xl:translate-y-20`}
      >
        <Image
          src={candidate.image}
          alt={candidate.name}
          fill
          priority
          className={heroImageClasses}
          style={isPlaceholder ? undefined : { filter: filterStyle }}
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
      alt={candidate.name}
      width={140}
      height={80}
      loading="lazy"
      className="w-8 md:w-16 h-auto 2xl:w-[200px] 2xl:h-auto animate-slide-in-left block"
    />
  );
});
