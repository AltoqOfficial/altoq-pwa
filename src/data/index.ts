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
  keiko: keikoFujimoriData as unknown as CandidateComparisonData,
  lopez: rafaelLopezData as unknown as CandidateComparisonData,
  "mario-vizcarra": marioVizcarraData as unknown as CandidateComparisonData,
  "enrique-valderrama":
    enriqueValderramaData as unknown as CandidateComparisonData,
  "yonhy-lescano": yonhyLescanoData as unknown as CandidateComparisonData,
  "fernando-olivera": fernandoOliveraData as unknown as CandidateComparisonData,
  "george-forsyth": georgeForsythData as unknown as CandidateComparisonData,
  "carlos-espa": carlosEspaData as unknown as CandidateComparisonData,
  "alfonso-lopez-chau":
    alfonsoLopezChauData as unknown as CandidateComparisonData,
  "vladimir-cerron": vladimirCerronData as unknown as CandidateComparisonData,
  "cesar-acuna": cesarAcunaData as unknown as CandidateComparisonData,
  "roberto-sanchez": robertoSanchezData as unknown as CandidateComparisonData,
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
