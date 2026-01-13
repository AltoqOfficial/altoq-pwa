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
      "Responde un test corto sobre tus ideas y valores. No pedimos datos personales.",
  },
  {
    stepNumber: 2,
    icon: <QuestionIcon />,
    title: "Elige lo que te importa",
    description:
      "Escoge hasta 3 temas clave: educación, trabajo, seguridad, salud, ambiente y más.",
  },
  {
    stepNumber: 3,
    icon: <CandidatesIcon />,
    title: "Resultado con IA",
    description:
      "La IA compara tus preferencias con las propuestas de los planes de gobierno y te muestra los candidatos con mayor coincidencia.",
  },
];

export function StepsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-8 md:px-16 lg:px-32">
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
