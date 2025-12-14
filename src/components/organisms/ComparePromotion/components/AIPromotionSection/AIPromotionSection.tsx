import { Typography } from "@/components/atoms";
import Image from "next/image";

const FEATURES = [
  "La IA de Altoq cruza tus respuestas con información verificada sobre candidatos y partidos.",
  "Evalúa afinidad, coincidencia temática y cercanía de valores para mostrarte opciones transparentes y explicadas.",
  "Sin influir en tu decisión, solo revelando quién se acerca más a lo que piensas.",
] as const;

export function AIPromotionSection() {
  return (
    <article className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16">
      <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
        <Image
          src="/ia_promotion.webp"
          width={700}
          height={700}
          alt="Ilustración de inteligencia artificial analizando candidatos"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>

      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
        <h3 className="font-semibold font-sohne-breit max-w-xs sm:max-w-md lg:max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left">
          Analiza tu perfil, tus{" "}
          <span className="text-primary-600">prioridades</span> y las compara
          con datos reales.
        </h3>

        <div className="space-y-2 sm:space-y-3">
          {FEATURES.map((feature, index) => (
            <Typography
              key={index}
              className="text-neutral-500 max-w-xs sm:max-w-md lg:max-w-lg text-sm sm:text-base text-center lg:text-left"
            >
              {feature}
            </Typography>
          ))}
        </div>
      </div>
    </article>
  );
}
