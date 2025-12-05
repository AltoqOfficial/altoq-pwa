import { useState, useCallback } from "react";

/**
 * Custom hook for managing candidate selection
 * Allows selecting up to 2 candidates for comparison
 */
export function useCandidateSelection(maxSelections = 2) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleCandidateClick = useCallback(
    (candidateId: string) => {
      setSelectedCandidates((prev) => {
        // If already selected, deselect it
        if (prev.includes(candidateId)) {
          return prev.filter((id) => id !== candidateId);
        }
        // If max selections reached, replace the last one
        if (prev.length >= maxSelections) {
          return [prev[0], candidateId];
        }
        // Add new candidate
        return [...prev, candidateId];
      });
    },
    [maxSelections]
  );

  const getSelectionIndex = useCallback(
    (candidateId: string) => {
      return selectedCandidates.indexOf(candidateId);
    },
    [selectedCandidates]
  );

  const isSelected = useCallback(
    (candidateId: string) => {
      return selectedCandidates.includes(candidateId);
    },
    [selectedCandidates]
  );

  const clearSelection = useCallback(() => {
    setSelectedCandidates([]);
  }, []);

  return {
    selectedCandidates,
    handleCandidateClick,
    getSelectionIndex,
    isSelected,
    clearSelection,
  };
}
