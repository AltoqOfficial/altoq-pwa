import { Typography } from "@/components/atoms";
import Image from "next/image";

export function AIPromotionSection() {
  return (
    <div className="flex gap-12 justify-center items-center">
      <div>
        <Image
          src="/ia_promotion.webp"
          width={700}
          height={700}
          alt="Priority"
        />
      </div>
      <div className="gap-14 flex flex-col">
        <h3 className="font-semibold font-sohne-breit max-w-xl text-5xl">
          Analiza tu perfil, tus{" "}
          <span className="text-primary-600">prioridades</span> y las compara
          con datos reales.
        </h3>
        <div>
          <Typography className="text-[#868686] max-w-lg">
            La IA de Altoq cruza tus respuestas con información verificada sobre
            candidatos y partidos.
          </Typography>
          <Typography className="text-[#868686] max-w-lg">
            Evalúa afinidad, coincidencia temática y cercanía de valores para
            mostrarte opciones transparentes y explicadas.
          </Typography>
          <Typography className="text-[#868686] max-w-lg">
            Sin influir en tu decisión, solo revelando quién se acerca más a lo
            que piensas
          </Typography>
        </div>
      </div>
    </div>
  );
}
