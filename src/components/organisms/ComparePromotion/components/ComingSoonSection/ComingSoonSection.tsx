import { Typography } from "@/components/atoms";

export function ComingSoonSection() {
  return (
    <article className="flex flex-col gap-6">
      <Typography
        variant="p"
        weight="300"
        className="tracking-widest uppercase"
        align="center"
      >
        Próximamente
      </Typography>

      <div className="w-full mx-auto flex flex-col items-center justify-center gap-3.5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center">
          Mi Candidato <span className="text-primary-600">Ideal</span>
        </h2>

        <Typography variant="p" className="max-w-2xl" align="center">
          Si aún no te decides, ¡tranqui! Deja que la{" "}
          <Typography variant="span" className="text-primary-600">
            Inteligencia Artificial
          </Typography>{" "}
          te conozca y te muestra qué candidatos se parecen más a ti.
        </Typography>
      </div>
    </article>
  );
}
