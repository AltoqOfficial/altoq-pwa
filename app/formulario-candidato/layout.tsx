import { generateMetadata } from "@/lib/config/seo";

export const metadata = generateMetadata({
  title: "Haz tu Match Político | Altoq",
  description:
    "Responde nuestro cuestionario y descubre qué candidato presidencial se alinea mejor con tus valores, intereses y prioridades políticas para las Elecciones 2026.",
  path: "formulario-candidato",
});

export default function CandidateFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
