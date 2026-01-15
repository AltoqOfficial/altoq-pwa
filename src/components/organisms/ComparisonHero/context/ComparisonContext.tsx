"use client";

import { createContext, useContext } from "react";

interface ComparisonContextType {
  activeNavIndex: number;
  onNavClick: (index: number) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined
);

export function useComparisonContext() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error(
      "useComparisonContext must be used within a ComparisonProvider"
    );
  }
  return context;
}

export const ComparisonProvider = ComparisonContext.Provider;
