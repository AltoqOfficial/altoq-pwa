import { Typography } from "@/components/atoms";

export function ComingSoonSection() {
  return (
    <article className="flex flex-col gap-6">
      <div className="w-full mx-auto flex flex-col items-center justify-center gap-3.5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center">
          Encuentra tu <span className="text-primary-600">Match</span>
        </h2>

        <Typography variant="p" className="max-w-2xl" align="center">
          Sin sesgos ni opiniones. Cruzamos tus ideas con los Planes de Gobierno
          oficiales para mostrarte qué candidatos coinciden más contigo.
        </Typography>
      </div>
    </article>
  );
}
