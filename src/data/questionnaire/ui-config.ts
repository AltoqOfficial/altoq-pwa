import { AnswerValue } from "@/components/organisms/CandidateFormWizard/types";

export interface QuestionUIConfig {
  layout: "cards" | "buttons";
  images?: Record<AnswerValue, string>;
  descriptionOverrides?: string;
}

export const VISUAL_CONFIG: Record<string, QuestionUIConfig> = {
  // Section 1: Corrupción
  Q1: {
    layout: "cards",
    images: {
      A: "/images/iconsForm/VectorImg 1.png",
      B: "/images/iconsForm/VectorImg (1) 1.png",
      C: "/images/iconsForm/VectorImg (2) 1.png",
      D: "/images/iconsForm/VectorImg (3) 1.png",
      E: "/images/iconsForm/VectorImg (4) 1.png",
      "": "/images/iconsForm/VectorImg 1.png", // Fallback
    },
  },

  // Section 2: Seguridad (Using old Q4_1 images)
  Q5: {
    layout: "cards",
    images: {
      A: "/images/iconsForm/VectorImg (5) 1.png",
      B: "/images/iconsForm/VectorImg (6) 1.png",
      C: "/images/iconsForm/VectorImg (8) 1.png",
      D: "/images/iconsForm/VectorImg (19) 1.png",
      E: "/images/iconsForm/VectorImg (9) 1.png",
      "": "/images/iconsForm/VectorImg (5) 1.png",
    },
  },

  // Section 4: Economía (Using old Q2_1 images for generic econ theme)
  // Mapping to Q13 (Informalidad/Emprendimiento)
  Q13: {
    layout: "cards",
    images: {
      A: "/images/iconsForm/VectorImg (17) 1.png",
      B: "/images/iconsForm/image 44.png",
      C: "/images/iconsForm/VectorImg (18) 1.png",
      D: "/images/iconsForm/image 45.png",
      E: "/images/iconsForm/image 46.png",
      "": "/images/iconsForm/VectorImg (17) 1.png",
    },
  },

  // Section 5: Visión de País (Using old Q5_1 images)
  // Mapping to Q17 (Rol del Estado)
  Q17: {
    layout: "cards",
    images: {
      A: "/images/iconsForm/Rectangle 334.png",
      B: "/images/iconsForm/Rectangle 334 (1).png",
      C: "/images/iconsForm/Rectangle 334 (2).png",
      D: "/images/iconsForm/Rectangle 334 (3).png",
      E: "/images/iconsForm/VectorImg (25) 1.png",
      "": "/images/iconsForm/Rectangle 334.png",
    },
  },
};
