import { Typography } from "@/components/atoms";

export function ComingSoonSection() {
  return (
    <article className="flex flex-col gap-6">
      <div className="w-full mx-auto flex flex-col items-center justify-center gap-3.5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center">
          Tu Match <span className="text-primary-600">Político</span>
        </h2>

        <Typography variant="p" className="max-w-2xl" align="center">
          Analizamos tus preferencias y las comparamos con las propuestas de los
          planes de gobierno para mostrarte qué candidatos coinciden más
          contigo.
        </Typography>
      </div>
    </article>
  );
}
