import Image from "next/image";
import { CANDIDATES, SELECTION_COLORS, type Candidate } from "../constants";

interface CandidateSelectorProps {
  selectedCandidates: string[];
  onCandidateClick: (candidateId: string) => void;
}

/**
 * Candidate Selector Component
 * Grid of candidate images for selection with rectangular cards
 */
export function CandidateSelector({
  selectedCandidates,
  onCandidateClick,
}: CandidateSelectorProps) {
  const getBackgroundStyle = (candidateId: string) => {
    const index = selectedCandidates.indexOf(candidateId);
    if (index === 0) return `bg-[${SELECTION_COLORS.first}]`;
    if (index === 1) return `bg-[${SELECTION_COLORS.second}]`;
    return "bg-[#484848]";
  };

  const getImageStyle = (candidateId: string) => {
    const isSelected = selectedCandidates.includes(candidateId);
    if (isSelected) return "grayscale-0";
    return "grayscale";
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-[280px] md:max-w-[350px] lg:max-w-[420px]">
      {CANDIDATES.map((candidate) => (
        <button
          key={candidate.id}
          onClick={() => onCandidateClick(candidate.id)}
          className={`relative cursor-pointer transition-all duration-300 overflow-hidden border-2 border-[#CECECE] w-full aspect-[2.2/1] md:h-18 lg:h-22 flex justify-center items-center ${getBackgroundStyle(candidate.id)}`}
        >
          <Image
            src={candidate.src}
            alt={candidate.name}
            width={160}
            height={100}
            className={`relative z-10 translate-y-4 md:translate-y-5 lg:translate-y-6 transition-all duration-300 object-cover w-[80%] md:w-[85%] lg:w-auto ${getImageStyle(candidate.id)}`}
          />
        </button>
      ))}
    </div>
  );
}

/**
 * Get candidate data key from selection
 */
export function getCandidateDataKey(candidateId: string): string {
  const candidate = CANDIDATES.find((c) => c.id === candidateId);
  return candidate?.dataKey || "";
}

/**
 * Get candidate by ID from CANDIDATES array
 */
export function getCandidateById(candidateId: string) {
  return CANDIDATES.find((c) => c.id === candidateId) || null;
}
