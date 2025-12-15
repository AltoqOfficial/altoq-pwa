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
    title: "Conoce tu perfil",
    description:
      "Responde un breve cuestionario sobre tus intereses, valores y orientación política. Analizará tu perfil como ciudadano con total privacidad.",
  },
  {
    stepNumber: 2,
    icon: <QuestionIcon />,
    title: "Define lo que te importa",
    description:
      "Selecciona hasta 3 temas prioritarios como educación, seguridad, trabajo, igualdad, salud, ambiente, etc. La IA los usará para afinar tu coincidencia con las propuestas de los candidatos.",
  },
  {
    stepNumber: 3,
    icon: <CandidatesIcon />,
    title: "Sugerencia Final",
    description:
      "Verás los 4 candidatos con mayor afinidad a tu perfil, analizados con IA según tus respuestas y prioridades. Cada uno con su porcentaje de coincidencia y explicación.",
  },
];

export function StepsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-8 py-16 md:px-16 lg:px-32">
      {STEPS_DATA.map((step) => (
        <StepCard
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          icon={step.icon}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
}
