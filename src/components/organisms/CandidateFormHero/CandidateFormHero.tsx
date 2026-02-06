import Image from "next/image";
import { Typography } from "@/components/atoms/Typography";
import { Header } from "@/components/organisms/Header";
import { cn } from "@/lib/utils";

/**
 * CandidateFormHero Component (Organism)
 * Hero section with "Zero-Click" Start
 *
 * Features:
 * - Direct engagement with Question 1
 * - Gallery of candidates
 */
interface CandidateFormHeroProps {
  onStartClick?: () => void; // Optional or deprecated
  onOptionSelect: (value: string) => void;
}

export function CandidateFormHero({ onOptionSelect }: CandidateFormHeroProps) {
  const candidates = [
    { id: 1, image: "/images/iconsForm/candidato1.png", overlayType: "lead" },
    { id: 2, image: "/images/iconsForm/candidato2.png", overlayType: "red" },
    { id: 3, image: "/images/iconsForm/candidato3.png", overlayType: "lead" },
    { id: 4, image: "/images/iconsForm/candidato4.png", overlayType: "red" },
    { id: 5, image: "/images/iconsForm/candidato5.png", overlayType: "lead" },
  ];

  const q1Options = [
    {
      key: "A",
      text: "Que los altos funcionarios sean seleccionados por mérito técnico",
    },
    {
      key: "B",
      text: "Que el Congreso tenga mayor control político sobre los altos cargos",
    },
    {
      key: "C",
      text: "Que los funcionarios tengan estabilidad mínima para asegurar continuidad",
    },
    {
      key: "D",
      text: "Que se eliminen los cargos de confianza y solo exista carrera pública",
    },
    {
      key: "E",
      text: "Que el Ejecutivo tenga mayor control para tomar decisiones rápidas",
    },
  ];

  return (
    <>
      <Header position="static" />
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex flex-col overflow-hidden bg-[#202020]">
        <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24 text-left pt-5 mb-10">
          <Typography
            variant="h3"
            weight="700"
            align="left"
            className="mb-8 max-w-4xl text-white text-3xl md:text-5xl leading-tight font-flexo-bold"
          >
            Para reducir la corrupción, ¿qué es más importante para ti?
          </Typography>

          <div className="flex flex-col gap-3 max-w-3xl">
            {q1Options.map((option) => (
              <button
                key={option.key}
                onClick={() => onOptionSelect(option.key)}
                className={cn(
                  "w-full px-6 py-4 rounded-xl text-sm font-normal border-2 transition-all duration-300 text-left",
                  "bg-[#2C2C2C] border-transparent text-white hover:border-neutral-500 hover:bg-[#353535]"
                )}
              >
                <span className="font-bold mr-1 text-white">{option.key})</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Gallery */}
        <div className="flex w-full mt-auto mb-0 overflow-x-auto md:overflow-hidden no-scrollbar opacity-30 hover:opacity-100 transition-opacity duration-500">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="relative flex-none w-[25%] md:flex-1 aspect-[3/4] group overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
            >
              <Image
                src={candidate.image}
                alt={`Candidato ${candidate.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 20vw"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
