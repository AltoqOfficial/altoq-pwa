import questionnaireData from "./questionnaire.json";
import { VISUAL_CONFIG } from "./ui-config";
import {
  Section,
  Question,
  AnswerValue,
} from "@/components/organisms/CandidateFormWizard/types";

// Interfaces mirroring the questionnaire.json structure
interface RawChoice {
  key: string;
  text: string;
}

interface RawQuestion {
  id: string;
  text: string;
  choices: RawChoice[];
}

interface RawSection {
  title: string;
  intro: string;
  questions: RawQuestion[];
}

interface RawQuestionnaire {
  sections: RawSection[];
}

const RAW_DATA = questionnaireData as RawQuestionnaire;

export const getFormSections = (): Section[] => {
  return RAW_DATA.sections.map((section: RawSection, index: number) => {
    return {
      id: index + 1,
      title: section.title,
      description: section.intro,
      questions: section.questions.map((q: RawQuestion) => {
        const config = VISUAL_CONFIG[q.id];

        return {
          id: q.id,
          text: q.text,
          layout: config ? config.layout : "buttons",
          options: q.choices.map((choice: RawChoice) => ({
            value: choice.key as AnswerValue,
            label: choice.key, // Using Key as Label like "A", "B"...
            description: choice.text, // The actual text is the description in this UI
            image: config?.images?.[choice.key as AnswerValue],
          })),
        } as Question;
      }),
    };
  });
};
