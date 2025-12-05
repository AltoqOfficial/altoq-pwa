/**
 * Data exports for the application
 */

// Types
export * from "./types";

// Candidate Data
import keikoFujimoriData from "./candidates/keikoFujimori.json";
import rafaelLopezData from "./candidates/rafaelLopez.json";
import type { CandidateComparisonData } from "./types";

export const candidatesData: Record<string, CandidateComparisonData> = {
  keiko: keikoFujimoriData as CandidateComparisonData,
  lopez: rafaelLopezData as CandidateComparisonData,
};

/**
 * Get candidate data by ID
 */
export function getCandidateData(id: string): CandidateComparisonData | null {
  return candidatesData[id] || null;
}

/**
 * Get all candidate IDs
 */
export function getAllCandidateIds(): string[] {
  return Object.keys(candidatesData);
}
