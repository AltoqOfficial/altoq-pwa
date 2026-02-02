import { useState, useCallback } from "react";

/**
 * Custom hook for managing candidate selection
 * Allows selecting up to 2 candidates for comparison
 * Flow: First selection is "red" (left), second selection is "blue" (right)
 */
export function useCandidateSelection(
  maxSelections = 2,
  initialSelection: string[] = []
) {
  const [selectedCandidates, setSelectedCandidates] =
    useState<string[]>(initialSelection);

  const handleCandidateClick = useCallback(
    (candidateId: string) => {
      setSelectedCandidates((prev) => {
        // If already selected, deselect it
        if (prev.includes(candidateId)) {
          return prev.filter((id) => id !== candidateId);
        }
        // If max selections reached, replace the second one (blue)
        if (prev.length >= maxSelections) {
          return [prev[0], candidateId];
        }
        // Add new candidate (first = red, second = blue)
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
