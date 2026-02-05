import { StepCard } from "../StepCard";
import { ProfileIcon, QuestionIcon, CandidatesIcon } from "../icons";
import type { ReactNode } from "react";

interface StepData {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
}

const STEPS_DATA: StepData[] = [
  {
    stepNumber: 1,
    icon: <ProfileIcon />,
    title: "1. Define tus Posturas",
    description:
      "Toma el control. Responde un test rápido sobre tus ideas y valores fundamentales.",
  },
  {
    stepNumber: 2,
    icon: <QuestionIcon />,
    title: "2. Opina sobre lo Importante",
    description:
      "Seguridad, economía, corrupción. Dinos qué piensas sobre los temas que definen el futuro.",
  },
  {
    stepNumber: 3,
    icon: <CandidatesIcon />,
    title: "3. Obtén tu Ranking Personal",
    description:
      "Recibe un análisis imparcial basado en datos oficiales que te muestra quién te representa mejor.",
  },
];

export function StepsGrid() {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-8 md:px-16 lg:px-32">
      {/* Decorative Line Connector (Desktop only) */}
      <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 -z-10" />

      {STEPS_DATA.map((step) => (
        <div key={step.stepNumber} className="relative group">
          {/* Connector Dot for Desktop */}
          <div className="hidden lg:block absolute top-[22px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-neutral-300 rounded-full z-0 group-hover:border-primary-500 transition-colors duration-300" />

          <div
            className={
              step.stepNumber === 3
                ? "relative bg-primary-50/50 rounded-2xl p-2 -m-2 border border-primary-100/50"
                : ""
            }
          >
            <StepCard
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
