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
        <Typography
          as="h2"
          align="center"
          variant="h3"
          className="flex gap-3"
          weight="600"
        >
          Mi Candidato{" "}
          <Typography as="span" variant="h3" color="primary">
            Ideal
          </Typography>
        </Typography>

        <Typography variant="p" className="max-w-2xl" align="center">
          Si aún no te decides, ¡tranqui! Deja que la Inteligencia Artificial te
          conozca y te dirá qué candidatos se alinean más contigo.
        </Typography>
      </div>
    </article>
  );
}
