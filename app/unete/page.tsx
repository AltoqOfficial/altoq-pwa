import { Metadata } from "next";

import { JoinHeroSection } from "@/components/organisms/JoinHeroSection";
import { VolunteerForm } from "@/components/organisms/VolunteerForm";

export const metadata: Metadata = {
  title: "Únete a Nosotros | Altoq",
  description:
    "Únete como voluntario a Altoq y ayuda a construir una plataforma que marca la diferencia",
};

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
