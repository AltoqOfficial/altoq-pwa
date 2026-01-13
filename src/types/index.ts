/**
 * Global Types for Altoq
 * These types are used across the entire application
 */

export interface Candidate {
  id: string;
  fullName: string;
  party: string;
  position: string;
  imageUrl?: string;
  biography?: string;
  proposals?: Proposal[];
  socialMedia?: SocialMedia;
}

export interface Proposal {
  id: string;
  category: ProposalCategory;
  title: string;
  description: string;
  source?: string;
}

export enum ProposalCategory {
  ECONOMY = "economy",
  EDUCATION = "education",
  HEALTH = "health",
  SECURITY = "security",
  ENVIRONMENT = "environment",
  INFRASTRUCTURE = "infrastructure",
  TECHNOLOGY = "technology",
  SOCIAL = "social",
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface ElectionData {
  id: string;
  name: string;
  date: Date;
  description: string;
  candidates: Candidate[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  theme: "light" | "dark" | "auto";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status?: number;
  reasons?: string[];
}
