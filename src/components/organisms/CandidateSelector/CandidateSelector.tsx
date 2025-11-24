"use client";

import { useState } from "react";
import Image from "next/image";

import { Typography } from "@/components/atoms/Typography";

// Mock candidate data - TODO: Replace with actual data from API/database
interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  age: number;
}

const mockCandidates: Candidate[] = [
  {
    id: "keiko-fujimori",
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    photo: "/images/candidates/keiko.jpg",
    age: 48,
  },
  {
    id: "rafael-lopez-aliaga",
    name: "Rafael López Aliaga",
    party: "Renovación Popular",
    photo: "/images/candidates/rafael.jpg",
    age: 60,
  },
  {
    id: "veronika-mendoza",
    name: "Verónika Mendoza",
    party: "Juntos por el Perú",
    photo: "/images/candidates/veronika.jpg",
    age: 43,
  },
  {
    id: "cesar-acuna",
    name: "César Acuña",
    party: "Alianza para el Progreso",
    photo: "/images/candidates/cesar.jpg",
    age: 61,
  },
];

export interface CandidateSelectorProps {
  onSelectionChange?: (leftId: string | null, rightId: string | null) => void;
}

/**
 * CandidateSelector Component (Organism)
 * VS-style candidate selector with dropdown
 *
 * Features:
 * - Two-column layout with VS divider
 * - Dropdown selectors for each side
 * - Candidate photos and info display
 * - Selection state management
 * - Prevents selecting same candidate on both sides
 */
export function CandidateSelector({
  onSelectionChange,
}: CandidateSelectorProps) {
  const [leftCandidate, setLeftCandidate] = useState<string | null>(
    mockCandidates[0].id
  );
  const [rightCandidate, setRightCandidate] = useState<string | null>(
    mockCandidates[1].id
  );

  const handleLeftChange = (candidateId: string) => {
    // Prevent selecting the same candidate on both sides
    if (candidateId === rightCandidate) {
      // Swap candidates
      setRightCandidate(leftCandidate);
    }
    setLeftCandidate(candidateId);
    onSelectionChange?.(candidateId, rightCandidate);
  };

  const handleRightChange = (candidateId: string) => {
    // Prevent selecting the same candidate on both sides
    if (candidateId === leftCandidate) {
      // Swap candidates
      setLeftCandidate(rightCandidate);
    }
    setRightCandidate(candidateId);
    onSelectionChange?.(leftCandidate, candidateId);
  };

  const getCandidate = (id: string | null) => {
    return mockCandidates.find((c) => c.id === id) || null;
  };

  const leftCandidateData = getCandidate(leftCandidate);
  const rightCandidateData = getCandidate(rightCandidate);

  return (
    <section className="border-b border-neutral-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            {/* Left Candidate */}
            <CandidateCard
              candidate={leftCandidateData}
              allCandidates={mockCandidates}
              selectedId={leftCandidate}
              onChange={handleLeftChange}
              side="left"
            />

            {/* VS Divider */}
            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 shadow-lg">
                <Typography variant="h3" className="font-bold text-white">
                  VS
                </Typography>
              </div>
            </div>

            {/* Right Candidate */}
            <CandidateCard
              candidate={rightCandidateData}
              allCandidates={mockCandidates}
              selectedId={rightCandidate}
              onChange={handleRightChange}
              side="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface CandidateCardProps {
  candidate: Candidate | null;
  allCandidates: Candidate[];
  selectedId: string | null;
  onChange: (id: string) => void;
  side: "left" | "right";
}

function CandidateCard({
  candidate,
  allCandidates,
  selectedId,
  onChange,
  side,
}: CandidateCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Candidate Photo */}
      <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-neutral-200 bg-neutral-100 shadow-lg">
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
      <div className="w-full max-w-xs">
        <select
          value={selectedId || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50"
        >
          <option value="" disabled>
            Selecciona candidato
          </option>
          {allCandidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {c.party}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
