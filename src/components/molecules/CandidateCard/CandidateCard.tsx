import Image from "next/image";

import { Typography } from "@/components/atoms/Typography";
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
   * Size of the photo
   */
  photoSize?: "sm" | "md" | "lg";
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
 * Displays a candidate with photo, info, and optional selector
 *
 * This molecule combines:
 * - Circular candidate photo with fallback
 * - Candidate name and party
 * - Optional dropdown selector
 *
 * Features:
 * - Image error handling with fallback
 * - Multiple photo sizes
 * - Optional selector dropdown
 * - Centered layout
 * - Responsive design
 *
 * @example
 * ```tsx
 * <CandidateCard
 *   candidate={candidateData}
 *   allCandidates={allCandidates}
 *   selectedId="keiko-fujimori"
 *   onChange={(id) => handleChange(id)}
 *   photoSize="lg"
 *   showSelector={true}
 * />
 *
 * <CandidateCard
 *   candidate={candidateData}
 *   allCandidates={[]}
 *   selectedId={null}
 *   onChange={() => {}}
 *   showSelector={false}
 * />
 * ```
 */
export function CandidateCard({
  candidate,
  allCandidates,
  selectedId,
  onChange,
  photoSize = "lg",
  showSelector = true,
  className,
}: CandidateCardProps) {
  const photoSizes = {
    sm: "h-32 w-32",
    md: "h-40 w-40",
    lg: "h-48 w-48",
  };

  return (
    <div className={className || "flex flex-col items-center"}>
      {/* Candidate Photo */}
      <div
        className={`relative mb-6 overflow-hidden rounded-full border-4 border-neutral-200 bg-neutral-100 shadow-lg ${photoSizes[photoSize]}`}
      >
        {candidate ? (
          <Image
            src={candidate.photo}
            alt={candidate.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Typography variant="h5" className="text-neutral-400">
              ?
            </Typography>
          </div>
        )}
        {/* Fallback background if image fails */}
        {candidate && (
          <div className="absolute inset-0 -z-10 flex items-center justify-center bg-linear-to-br from-primary-100 to-primary-200">
            <Typography variant="h2" className="text-primary-600">
              {candidate.name.charAt(0)}
            </Typography>
          </div>
        )}
      </div>

      {/* Candidate Info */}
      {candidate && (
        <div className="mb-4 text-center">
          <Typography variant="h4" className="mb-1">
            {candidate.name}
          </Typography>
          <Typography variant="small" className="text-neutral-600">
            {candidate.party}
          </Typography>
        </div>
      )}

      {/* Dropdown Selector */}
      {showSelector && (
        <div className="w-full max-w-xs">
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
