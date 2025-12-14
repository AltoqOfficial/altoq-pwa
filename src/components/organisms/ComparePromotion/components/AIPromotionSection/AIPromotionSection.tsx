import { Typography } from "@/components/atoms";
import Image from "next/image";

const FEATURES = [
  "La IA de Altoq cruza tus respuestas con información verificada sobre candidatos y partidos.",
  "Evalúa afinidad, coincidencia temática y cercanía de valores para mostrarte opciones transparentes y explicadas.",
  "Sin influir en tu decisión, solo revelando quién se acerca más a lo que piensas.",
] as const;

export function AIPromotionSection() {
  return (
    <article className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center px-8 py-16 md:px-16 lg:px-32">
      <div className="flex-shrink-0">
        <Image
          src="/ia_promotion.webp"
          width={700}
          height={700}
          alt="Ilustración de inteligencia artificial analizando candidatos"
          className="w-full max-w-md lg:max-w-lg"
        />
      </div>

      <div className="flex flex-col gap-10 lg:gap-14">
        <h3 className="font-semibold font-sohne-breit max-w-xl text-3xl md:text-4xl lg:text-5xl">
          Analiza tu perfil, tus{" "}
          <span className="text-primary-600">prioridades</span> y las compara
          con datos reales.
        </h3>

        <div className="space-y-2">
          {FEATURES.map((feature, index) => (
            <Typography key={index} className="text-neutral-500 max-w-lg">
              {feature}
            </Typography>
          ))}
        </div>
      </div>
    </article>
  );
}
