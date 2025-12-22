import { CandidateFormHero } from "@/components/organisms/CandidateFormHero";
import { generateMetadata } from "@/lib/config/seo";

/**
 * Candidate Form Page
 * Route: /formulario-candidato
 *
 * This page allows users to find their ideal candidate by answering a set of questions.
 */
export const metadata = generateMetadata({
  title: "Encuentra tu Candidato Ideal | Altoq",
  description:
    "Responde nuestro cuestionario y descubre qué candidato presidencial se alinea mejor con tus valores, intereses y prioridades políticas para las Elecciones 2026.",
  path: "formulario-candidato",
});

export default function CandidateFormPage() {
  return (
    <>
      {/* Hero Section with Candidate Gallery */}
      <CandidateFormHero />

      {/* Main Form container will be added here later */}
    </>
  );
}
