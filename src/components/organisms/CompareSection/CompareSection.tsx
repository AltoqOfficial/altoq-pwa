import Link from "next/link";

import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";

/**
 * CompareSection Component (Organism)
 * Preview of candidate comparison feature
 *
 * Features:
 * - VS layout (candidates side by side)
 * - Preview of comparison feature
 * - CTA to full comparison page
 * - Red background with candidate images
 */
export function CompareSection() {
  return (
    <section className="relative overflow-hidden bg-primary-600 py-20">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <Typography variant="h2" className="mb-4 text-white">
            Compara Candidatos
          </Typography>
          <Typography variant="p" className="mx-auto max-w-2xl text-white/90">
            Toma decisiones informadas. Compara las propuestas, trayectorias y
            antecedentes de los candidatos presidenciales.
          </Typography>
        </div>

        {/* VS Layout */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
            {/* Left Candidate */}
            <div className="flex flex-col items-center">
              <div className="mb-4 h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-neutral-800">
                {/* TODO: Add candidate image */}
                <div className="flex h-full items-center justify-center text-white">
                  Candidato 1
                </div>
              </div>
              <Typography variant="h4" className="text-center text-white">
                Candidato A
              </Typography>
              <Typography variant="small" className="text-white/80">
                Partido Político
              </Typography>
            </div>

            {/* VS Divider */}
            <div className="flex items-center justify-center">
              <Typography
                variant="h1"
                className="text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
              >
                VS
              </Typography>
            </div>

            {/* Right Candidate */}
            <div className="flex flex-col items-center">
              <div className="mb-4 h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-neutral-800">
                {/* TODO: Add candidate image */}
                <div className="flex h-full items-center justify-center text-white">
                  Candidato 2
                </div>
              </div>
              <Typography variant="h4" className="text-center text-white">
                Candidato B
              </Typography>
              <Typography variant="small" className="text-white/80">
                Partido Político
              </Typography>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 text-center">
            <Typography variant="p" className="mb-6 text-white/90">
              Compara perfiles, propuestas, trayectorias políticas, antecedentes
              e investigaciones, y más.
            </Typography>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/compara">Comparar Ahora</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>
    </section>
  );
}
