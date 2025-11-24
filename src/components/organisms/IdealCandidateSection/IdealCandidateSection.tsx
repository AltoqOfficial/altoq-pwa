import { Typography } from "@/components/atoms/Typography";

/**
 * IdealCandidateSection Component (Organism)
 * "Mi Candidato Ideal" feature showcase
 *
 * Features:
 * - Phone mockup with Altoq app (left side)
 * - Feature steps (right side)
 * - Step 1: Conoce tu perfil
 * - Step 2: Define lo que te importa
 * - Step 3: Encuentra tu candidato ideal
 */
export function IdealCandidateSection() {
  const steps = [
    {
      number: "1",
      title: "Conoce tu perfil",
      description:
        "Responde un test de valores políticos para descubrir tu perfil ideológico y lo que realmente te importa.",
    },
    {
      number: "2",
      title: "Define lo que te importa",
      description:
        "Selecciona los temas que más te interesan: economía, educación, salud, seguridad y más.",
    },
    {
      number: "3",
      title: "Encuentra tu candidato ideal",
      description:
        "Te mostraremos qué candidatos se alinean mejor con tus valores y prioridades con base en sus propuestas.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Typography
            variant="small"
            className="mb-2 uppercase tracking-widest text-neutral-600"
          >
            Próximamente
          </Typography>
          <Typography variant="h2" className="mb-4">
            Mi Candidato <span className="text-primary-600">Ideal</span>
          </Typography>
          <Typography
            variant="p"
            className="mx-auto max-w-2xl text-neutral-600"
          >
            Descubre qué candidatos se alinean mejor con tu perfil ideológico y
            tus prioridades. Toma decisiones informadas para el futuro del Perú.
          </Typography>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[3rem] border-8 border-neutral-900 bg-white shadow-2xl">
                {/* Screen Content */}
                <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 p-8">
                  {/* Logo */}
                  <div className="mb-8">
                    <Typography
                      variant="h2"
                      className="text-primary-600"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Altoq
                    </Typography>
                  </div>

                  {/* Placeholder Content */}
                  <div className="space-y-4 text-center">
                    <div className="mx-auto h-24 w-24 rounded-full bg-primary-100" />
                    <div className="h-4 w-48 rounded bg-neutral-300" />
                    <div className="h-4 w-40 rounded bg-neutral-300" />
                    <div className="h-4 w-44 rounded bg-neutral-300" />
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl">
                <div className="h-full w-full rounded-full bg-primary-600/20" />
              </div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                {/* Step Number */}
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
                    <Typography variant="h5" weight="bold">
                      {step.number}
                    </Typography>
                  </div>
                </div>

                {/* Step Content */}
                <div>
                  <Typography variant="h4" className="mb-2">
                    {step.title}
                  </Typography>
                  <Typography variant="p" className="text-neutral-600">
                    {step.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
