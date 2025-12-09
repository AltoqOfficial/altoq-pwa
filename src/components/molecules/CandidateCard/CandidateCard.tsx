import Image from "next/image";

import { Select } from "@/components/atoms/Select";

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  age?: number;
}

export interface CandidateCardProps {
  /**
   * Selected candidate data
   */
  candidate: Candidate | null;
  /**
   * All available candidates for the dropdown
   */
  allCandidates: Candidate[];
  /**
   * Currently selected candidate ID
   */
  selectedId: string | null;
  /**
   * Callback when selection changes
   */
  onChange: (id: string) => void;
  /**
   * Whether the candidate is selected (for color effect)
   */
  isSelected?: boolean;
  /**
   * Whether to show the dropdown selector
   */
  showSelector?: boolean;
  /**
   * Custom className for the card wrapper
   */
  className?: string;
}

/**
 * CandidateCard Component (Molecule)
 * Displays a candidate with photo in a rectangular card with border
 *
 * This molecule combines:
 * - Rectangular candidate photo with gray border
 * - Grayscale effect when not selected
 * - Color effect when selected
 * - Optional dropdown selector
 *
 * Features:
 * - Image error handling with fallback
 * - Grayscale/color transition on selection
 * - Rectangular card design with border
 * - Optional selector dropdown
 * - Responsive design
 *
 * @example
 * ```tsx
 * <CandidateCard
 *   candidate={candidateData}
 *   allCandidates={allCandidates}
 *   selectedId="keiko-fujimori"
 *   onChange={(id) => handleChange(id)}
 *   isSelected={true}
 *   showSelector={true}
 * />
 *
 * <CandidateCard
 *   candidate={candidateData}
 *   allCandidates={[]}
 *   selectedId={null}
 *   onChange={() => {}}
 *   isSelected={false}
 *   showSelector={false}
 * />
 * ```
 */
export function CandidateCard({
  candidate,
  allCandidates,
  selectedId,
  onChange,
  isSelected = false,
  showSelector = true,
  className,
}: CandidateCardProps) {
  return (
    <div className={className || "flex flex-col items-center"}>
      {/* Candidate Photo Card */}
      <div className="relative aspect-4/3 w-full max-w-[200px] overflow-hidden border-[6px] border-[#CECECE] bg-neutral-800 transition-all duration-300">
        {candidate ? (
          <Image
            src={candidate.photo}
            alt={candidate.name}
            fill
            className={`object-cover transition-all duration-300 ${
              isSelected ? "grayscale-0" : "grayscale"
            }`}
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400 text-4xl">
            ?
          </div>
        )}
      </div>

      {/* Dropdown Selector */}
      {showSelector && (
        <div className="mt-4 w-full max-w-[200px]">
          <Select
            value={selectedId || ""}
            onChange={(e) => onChange(e.target.value)}
            variant="default"
            size="md"
            placeholder="Selecciona candidato"
          >
            {allCandidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.party}
              </option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
