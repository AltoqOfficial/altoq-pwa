import Image from "next/image";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

/**
 * CandidateFormHero Component (Organism)
 * Hero section for the Candidate Form page
 *
 * Features:
 * - Catchy title
 * - Description text
 * - CTA button
 * - Gallery of candidates with artistic filters
 */
interface CandidateFormHeroProps {
  onStartClick: () => void;
}

export function CandidateFormHero({ onStartClick }: CandidateFormHeroProps) {
  const candidates = [
    { id: 1, image: "/images/iconsForm/candidato1.png", overlayType: "lead" },
    { id: 2, image: "/images/iconsForm/candidato2.png", overlayType: "red" },
    { id: 3, image: "/images/iconsForm/candidato3.png", overlayType: "lead" },
    { id: 4, image: "/images/iconsForm/candidato4.png", overlayType: "red" },
    { id: 5, image: "/images/iconsForm/candidato5.png", overlayType: "lead" },
  ];

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex flex-col overflow-hidden bg-[#202020] -mt-34.5 md:-mt-20 lg:-mt-34.5">
      <div className="container relative z-10 mx-auto px-12 md:px-16 lg:px-24 text-left pt-40 md:pt-52 lg:pt-64 mb-20">
        <Typography
          variant="h3"
          font="sohneBreit"
          weight="700"
          align="left"
          className="mb-6 max-w-4xl text-white"
        >
          Encuentra tu candidato ideal
        </Typography>

        <Typography
          variant="p"
          font="sohneBreit"
          weight="400"
          align="left"
          className="mb-6 max-w-md md:max-w-3xl text-white leading-relaxed text-sm md:text-base"
        >
          Descubre al candidato presidencial que realmente conecta con tus
          intereses políticos, valores y prioridades. Compara propuestas e
          identifica afinidades clave.
        </Typography>

        <Button
          variant="primary"
          size="lg"
          onClick={onStartClick}
          className="rounded-md px-10 h-10 w-full md:w-66 text-base md:text-lg hover:scale-105 transition-transform"
        >
          Probar Ahora
        </Button>
      </div>

      {/* Candidate Gallery */}
      <div className="flex w-full mt-auto mb-10 overflow-x-auto md:overflow-hidden no-scrollbar">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="relative flex-none w-[33%] md:flex-1 aspect-[3/4] group overflow-hidden"
          >
            <Image
              src={candidate.image}
              alt={`Candidato ${candidate.id}`}
              fill
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 contrast-150 brightness-110"
              sizes="(max-width: 768px) 20vw, 20vw"
            />

            {/* Alternating Overlay Filter (Pure Vibrant Red / Light Gray) */}
            <div
              className={cn(
                "absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 mix-blend-color",
                candidate.overlayType === "red"
                  ? "bg-[#FF0000]"
                  : "bg-[#E0E0E0]"
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
