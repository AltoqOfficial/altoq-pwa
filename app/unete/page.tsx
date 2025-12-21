import { JoinHeroSection } from "@/components/organisms/JoinHeroSection";
import { VolunteerForm } from "@/components/organisms/VolunteerForm";
import { generateMetadata } from "@/lib/config/seo";

export const metadata = generateMetadata({
  title: "Únete como Voluntario",
  description:
    "Sé parte del equipo de Altoq. Únete como voluntario y ayuda a promover el voto informado en las Elecciones 2026 del Perú. Contribuye a la democracia y participación ciudadana.",
  keywords: [
    "voluntario altoq",
    "voluntariado electoral",
    "participación ciudadana",
    "únete altoq",
    "voluntario elecciones 2026",
    "activismo político",
  ],
  path: "/unete",
  type: "website",
});

/**
 * Join Us Page (Únete a Nosotros)
 * Route: /unete
 *
 * Sections:
 * 1. Hero Section - "ÚNETE A NOSOTROS" title + description
 * 2. Volunteer Form - Form with image on the left
 */
export default function JoinPage() {
  return (
    <>
      {/* Hero Section */}
      <JoinHeroSection />

      {/* Volunteer Form Section */}
      <VolunteerForm />
    </>
  );
}
