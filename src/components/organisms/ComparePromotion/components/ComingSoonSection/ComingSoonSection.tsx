import { Typography } from "@/components/atoms";

export function ComingSoonSection() {
  return (
    <div className="flex flex-col gap-6">
      <Typography
        variant="p"
        weight="300"
        className="tracking-widest"
        align="center"
      >
        PRÓXIMAMENTE
      </Typography>
      <div className="w-full mx-auto flex flex-col items-center justify-center gap-3.5">
        <Typography
          align="center"
          variant="h3"
          className="flex gap-3"
          weight="600"
        >
          Mi Candidato{" "}
          <Typography align="center" variant="h3" color="primary">
            Ideal
          </Typography>
        </Typography>
        <Typography variant="p" className="max-w-2xl" align="center">
          Si aún no te decices, ¡tranqui!. Deja que la Inteligencia Artificial
          te conozca y te dirá qué candidatos se alinean más contigo.
        </Typography>
      </div>
    </div>
  );
}
