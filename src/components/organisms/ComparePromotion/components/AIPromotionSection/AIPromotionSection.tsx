"use client";

import { Typography, Button } from "@/components/atoms";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAnalytics } from "@/hooks/useAnalytics";

export function AIPromotionSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserProfile();
  const { track } = useAnalytics();
  const isAuthenticated = !!user;

  return (
    <article
      id="como-funciona"
      className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16"
    >
      {/* ... (existing image and text content) */}
      <div className="shrink-0 w-full lg:w-auto flex justify-center">
        <Image
          src="/promotion/stack_papers.jpg"
          width={700}
          height={700}
          alt="Análisis de documentos con IA"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
        <h3 className="font-semibold font-flexo-medium max-w-xs sm:max-w-md lg:max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left">
          Tu voto, fundamentado en{" "}
          <span className="text-primary-600">Datos</span>
        </h3>

        <div className="space-y-3 sm:space-y-4">
          <Typography className="text-neutral-500 max-w-xs sm:max-w-md lg:max-w-lg text-sm sm:text-base text-center lg:text-left">
            <strong>Fuentes Confiables:</strong> Cruzamos información oficial
            del JNE, planes de gobierno y verificación de medios serios. No
            inventamos nada, solo sintetizamos lo que ya existe.
          </Typography>
          <Typography className="text-neutral-500 max-w-xs sm:max-w-md lg:max-w-lg text-sm sm:text-base text-center lg:text-left">
            <strong>Transparencia Total:</strong> Te mostramos el sustento real
            de cada coincidencia. Verás la propuesta o cita textual que valida
            tu resultado.
          </Typography>
          <Typography className="text-neutral-500 max-w-xs sm:max-w-md lg:max-w-lg text-sm sm:text-base text-center lg:text-left">
            <strong>Sin Sesgos:</strong> No te decimos por quién votar. Solo te
            mostramos quién se acerca más a lo que tú ya piensas.
          </Typography>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <Button
            variant="primary"
            size="lg"
            shape="pill"
            className="w-full sm:w-auto px-8"
            onClick={() => {
              track({
                name: "match_started",
                properties: { source: "home_hero" },
              });

              const destination = isAuthenticated
                ? "/"
                : "/formulario-candidato";
              // Preserve params
              const queryString = searchParams.toString();
              const url = queryString
                ? `${destination}?${queryString}`
                : destination;

              router.push(url);
            }}
          >
            {isAuthenticated ? "Ir al Dashboard" : "Encuentra tu Match"}
          </Button>
        </div>

        <p className="text-xs text-neutral-400 mt-6 text-center lg:text-left max-w-xs sm:max-w-md lg:max-w-lg">
          Altoq no apoya a ningún candidato o partido político.
        </p>
      </div>
    </article>
  );
}
