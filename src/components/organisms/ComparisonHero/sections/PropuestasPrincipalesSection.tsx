"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CandidateComparisonData, ProposalData } from "@/data";
import { Typography } from "@/components/atoms";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

// Categorías disponibles para el filtro
const CATEGORIES = [
  { value: "institucional", label: "Institucional" },
  { value: "economico", label: "Económico" },
  { value: "social", label: "Social" },
  { value: "ambiental", label: "Ambiental" },
  { value: "educativo", label: "Educativo" },
  { value: "salud", label: "Salud" },
  { value: "seguridad", label: "Seguridad" },
] as const;

type CategoryValue = (typeof CATEGORIES)[number]["value"];

interface ProposalDetailProps {
  data: ProposalData;
  color: string;
  align: "left" | "right";
}

/**
 * Componente reutilizable para mostrar los detalles de una propuesta
 */
function ProposalDetail({ data, color, align }: ProposalDetailProps) {
  const textAlign = align === "left" ? "text-right" : "text-left";
  const padding = align === "left" ? "pr-4 lg:pr-8" : "pl-4 lg:pl-8";

  return (
    <div className={`${textAlign} space-y-4 ${padding}`}>
      {/* Descripción */}
      <div>
        <Typography
          color="white"
          className={`text-[9px] lg:text-xs font-atName font-black uppercase mb-2 ${textAlign}`}
          style={{ color }}
        >
          DESCRIPCIÓN
        </Typography>
        <Typography
          color="white"
          className={`text-[8px] lg:text-[11px] font-atName font-light leading-tight ${textAlign}`}
        >
          {data.descripcion || "Sin información disponible"}
        </Typography>
      </div>

      {/* Viabilidad */}
      <div>
        <Typography
          color="white"
          className={`text-[9px] lg:text-xs font-atName font-black uppercase mb-2 ${textAlign}`}
          style={{ color }}
        >
          VIABILIDAD
        </Typography>
        <Typography
          color="white"
          className={`text-[8px] lg:text-[11px] font-atName font-light leading-tight ${textAlign}`}
        >
          {data.viabilidad || "Sin información disponible"}
        </Typography>
      </div>

      {/* Respaldado por */}
      <div>
        <Typography
          color="white"
          className={`text-[9px] lg:text-xs font-atName font-black uppercase mb-2 ${textAlign}`}
          style={{ color }}
        >
          RESPALDADO POR
        </Typography>
        <Typography
          color="white"
          className={`text-[8px] lg:text-[11px] font-atName font-light leading-tight ${textAlign}`}
        >
          {data.respaldo || "Sin información disponible"}
        </Typography>
      </div>
    </div>
  );
}

/**
 * Propuestas Principales Section
 * Diseño con filtro por rubro y círculo central expandible
 */
export function PropuestasPrincipalesSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("institucional");
  const [expandedProposals, setExpandedProposals] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleProposal = (key: string) => {
    setExpandedProposals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Obtener propuestas de la categoría seleccionada (pueden ser arrays o objetos)
  const leftProposals = leftCandidate?.propuestasPrincipales?.[
    selectedCategory
  ] as ProposalData | ProposalData[] | undefined;
  const rightProposals = rightCandidate?.propuestasPrincipales?.[
    selectedCategory
  ] as ProposalData | ProposalData[] | undefined;

  // Convertir a arrays si no lo son
  const leftProposalsArray: ProposalData[] = Array.isArray(leftProposals)
    ? leftProposals
    : leftProposals
      ? [leftProposals]
      : [];
  const rightProposalsArray: ProposalData[] = Array.isArray(rightProposals)
    ? rightProposals
    : rightProposals
      ? [rightProposals]
      : [];

  // Determinar el número máximo de propuestas para mostrar todas
  const maxProposals = Math.max(
    leftProposalsArray.length,
    rightProposalsArray.length
  );

  return (
    <div className="relative w-full py-8 lg:py-12">
      {/* Filtro de categorías */}
      <div className="flex justify-center items-center gap-4 mb-12 px-4">
        <Typography color="white" className="text-sm lg:text-base font-atName">
          Selecciona un rubro
        </Typography>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as CategoryValue)
            }
            className="appearance-none bg-transparent border border-white/30 text-white pl-4 pr-10 py-2 rounded-md font-atName text-sm lg:text-base focus:outline-none focus:border-white/60 transition-colors cursor-pointer w-full"
          >
            {CATEGORIES.map((cat) => (
              <option
                key={cat.value}
                value={cat.value}
                className="bg-[#1a1a1a]"
              >
                {cat.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
        </div>
      </div>

      {/* Imágenes de candidatos */}
      <div className="relative flex justify-between items-start mb-12 px-2 lg:px-8">
        {/* Candidato Izquierda */}
        <div className="flex-1 flex justify-end pr-4 lg:pr-12">
          {leftCandidate?.image && (
            <div className="relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#FF2727]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={leftCandidate.image}
                    alt={leftCandidate.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidato Derecha */}
        <div className="flex-1 flex justify-start pl-4 lg:pl-12">
          {rightCandidate?.image && (
            <div className="relative">
              <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#4E58B4]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={rightCandidate.image}
                    alt={rightCandidate.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Línea vertical central - se ajusta dinámicamente */}
      {/* Propuestas con círculo en medio - Múltiples propuestas */}
      <div className="relative space-y-12 lg:space-y-16 px-4 lg:px-8">
        {Array.from({ length: maxProposals }).map((_, index) => {
          const leftProposal = leftProposalsArray[index] || {};
          const rightProposal = rightProposalsArray[index] || {};
          const proposalKey = `${selectedCategory}-${index}`;
          const isFirst = index === 0;
          const isLast = index === maxProposals - 1;

          return (
            <div key={proposalKey} className="relative">
              {/* Línea SUPERIOR: Conecta con el anterior (cubre el gap) */}
              {!isFirst && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-white -top-12 lg:-top-16 z-0"
                  style={{
                    height: "calc(3rem + 1rem)", // Mobile: gap (3rem) + mitad circulo (1rem)
                  }}
                >
                  {/* Desktop Override */}
                  <div
                    className="hidden lg:block w-full bg-white absolute top-0 left-0"
                    style={{ height: "calc(4rem + 1.25rem)" }}
                  ></div>
                </div>
              )}

              {/* Línea INFERIOR: Conecta con el fondo del ítem actual */}
              {(!isLast || expandedProposals[proposalKey]) && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-white bottom-0 z-0"
                  style={{
                    top: "1rem", // Mobile: centro del círculo
                  }}
                >
                  <div
                    className="hidden lg:block w-full bg-white absolute bottom-0 left-0"
                    style={{ top: "1.25rem" }}
                  ></div>
                </div>
              )}

              {/* Layout horizontal: Título izq - Círculo - Título der */}
              {/* Usamos items-start para alineación predecible */}
              <div className="flex items-start justify-between gap-4">
                {/* Título candidato izquierda */}
                <div className="flex-1 flex justify-end pr-4">
                  <div className="text-right">
                    <Typography
                      color="white"
                      className="text-[10px] lg:text-sm font-atName font-semibold uppercase tracking-wider text-right"
                    >
                      {leftProposal.titulo || "—"}
                    </Typography>
                    <Typography
                      color="white"
                      className="text-[8px] lg:text-xs font-atName font-black text-right mt-1"
                      style={{ color: "#FF2727" }}
                    >
                      {leftProposal.titulo ? "PROPUESTA" : ""}
                    </Typography>
                  </div>
                </div>

                {/* Círculo central sobre la línea */}
                <button
                  onClick={() => toggleProposal(proposalKey)}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors z-20 shrink-0"
                  aria-label={
                    expandedProposals[proposalKey]
                      ? "Colapsar propuesta"
                      : "Expandir propuesta"
                  }
                  disabled={!leftProposal.titulo && !rightProposal.titulo}
                >
                  {expandedProposals[proposalKey] ? (
                    <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                  )}
                </button>

                {/* Título candidato derecha */}
                <div className="flex-1 flex justify-start pl-4">
                  <div className="text-left">
                    <Typography
                      color="white"
                      className="text-[10px] lg:text-sm font-atName font-semibold uppercase tracking-wider text-left"
                    >
                      {rightProposal.titulo || "—"}
                    </Typography>
                    <Typography
                      color="white"
                      className="text-[8px] lg:text-xs font-atName font-black text-left mt-1"
                      style={{ color: "#4E58B4" }}
                    >
                      {rightProposal.titulo ? "PROPUESTA" : ""}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Contenido expandible */}
              {expandedProposals[proposalKey] && (
                <div className="grid grid-cols-2 gap-4 lg:gap-12 mt-8">
                  {/* Contenido izquierda */}
                  <ProposalDetail
                    data={leftProposal}
                    color="#FF2727"
                    align="left"
                  />

                  {/* Contenido derecha */}
                  <ProposalDetail
                    data={rightProposal}
                    color="#4E58B4"
                    align="right"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
