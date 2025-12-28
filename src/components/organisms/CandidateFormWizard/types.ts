export type AnswerValue = "A" | "B" | "C" | "D" | "E" | "";

export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: AnswerValue;
    description: string;
    image?: string;
  }[];
  layout: "cards" | "buttons";
}

export interface Section {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface CandidateFormData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    professionalSummary: string;
  };
  education: {
    highestDegree: string;
    institution: string;
    graduationYear: string;
  };
  experience: {
    recentRole: string;
    recentCompany: string;
    yearsOfExperience: string;
  };
  skills: {
    technicalSkills: string[];
    softSkills: string[];
  };
  documents: {
    cvUrl: string;
    portfolioUrl: string;
  };
  responses: Record<string, AnswerValue>;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;
