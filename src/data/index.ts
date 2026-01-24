/**
 * Data exports for the application
 */

// Types
export * from "./types";

// Candidate Data
import keikoFujimoriData from "./candidates/keikoFujimori.json";
import rafaelLopezData from "./candidates/rafaelLopez.json";
import marioVizcarraData from "./candidates/marioVizcarra.json";
import enriqueValderramaData from "./candidates/enriqueValderrama.json";
import yonhyLescanoData from "./candidates/yonhyLescano.json";
import fernandoOliveraData from "./candidates/fernandoOlivera.json";
import georgeForsythData from "./candidates/georgeForsyth.json";
import carlosEspaData from "./candidates/carlosEspa.json";
import alfonsoLopezChauData from "./candidates/alfonsoLopezChau.json";
import vladimirCerronData from "./candidates/vladimirCerron.json";
import cesarAcunaData from "./candidates/cesarAcuna.json";
import robertoSanchezData from "./candidates/robertoSanchez.json";
import type { CandidateComparisonData } from "./types";

export const candidatesData: Record<string, CandidateComparisonData> = {
  keiko: keikoFujimoriData as CandidateComparisonData,
  lopez: rafaelLopezData as CandidateComparisonData,
  "mario-vizcarra": marioVizcarraData as CandidateComparisonData,
  "enrique-valderrama": enriqueValderramaData as CandidateComparisonData,
  "yonhy-lescano": yonhyLescanoData as CandidateComparisonData,
  "fernando-olivera": fernandoOliveraData as CandidateComparisonData,
  "george-forsyth": georgeForsythData as CandidateComparisonData,
  "carlos-espa": carlosEspaData as CandidateComparisonData,
  "alfonso-lopez-chau": alfonsoLopezChauData as CandidateComparisonData,
  "vladimir-cerron": vladimirCerronData as CandidateComparisonData,
  "cesar-acuna": cesarAcunaData as CandidateComparisonData,
  "roberto-sanchez": robertoSanchezData as CandidateComparisonData,
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
