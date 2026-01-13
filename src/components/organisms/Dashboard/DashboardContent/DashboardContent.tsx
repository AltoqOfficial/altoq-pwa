"use client";

import { FeatureCard } from "./FeatureCard";
import { PoliticalPartiesCard } from "./PoliticalPartiesCard";
import { ElectoralNewsCard } from "./ElectoralNewsCard";
import { useUserProfile } from "@/hooks/useUserProfile";

export function DashboardContent() {
  const { user, isLoading } = useUserProfile();

  // Get first name for greeting
  const firstName = isLoading
    ? "..."
    : user?.fullName?.split(" ")[0] || "Usuario";

  return (
    <div className="flex-1 min-h-screen bg-[#FEFEFE] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Welcome Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Bienvenido, {firstName}
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Toma decisiones informadas sobre los candidatos y partidos políticos
            de Perú con Altoq.
          </p>
        </header>

        {/* Compare Candidates Section */}
        <section className="mb-5 sm:mb-6">
          <div className="bg-[#E8E8E8] rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">
              Comparar candidatos
            </h2>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Compare Candidates Card */}
              <FeatureCard
                title="Comparar candidatos"
                description="Compara propuestas, trayectorias y posturas de los candidatos en un solo lugar, usando datos claros y verificables."
                imageSrc="/dashboard/compararCandidatos.webp"
                imageAlt="Comparar candidatos"
                buttonText="Ir a comparaciones"
                buttonHref="/compara"
              />

              {/* Political Match Card */}
              <FeatureCard
                title="Tu Match Político"
                description="Analizamos tus preferencias y las comparamos con las propuestas de los planes de gobierno para mostrarte qué candidatos coinciden más contigo."
                imageSrc="/dashboard/matchPolitico.webp"
                imageAlt="Tu Match Político"
                buttonText="Continuar"
                buttonHref="/formulario-candidato"
                variant="bordered"
              />
            </div>
          </div>
        </section>

        {/* Bottom Section - Political Parties & Electoral News */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <PoliticalPartiesCard />
          <ElectoralNewsCard />
        </section>
      </div>
    </div>
  );
}
