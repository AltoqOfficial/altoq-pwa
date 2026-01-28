"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CandidateComparisonData, ControversyData } from "@/data";
import { Typography } from "@/components/atoms";
import { SourceTooltip } from "../components/shared";

interface DynamicSectionProps {
  leftCandidate: CandidateComparisonData | null;
  rightCandidate: CandidateComparisonData | null;
}

const CATEGORIES = [
  { key: "antecedentes", label: "ANTECEDENTES" },
  { key: "procesosJudiciales", label: "PROCESOS JUDICIALES" },
  { key: "declaraciones", label: "DECLARACIONES O HECHOS PÚBLICOS" },
  { key: "observaciones", label: "OBSERVACIONES ADMIN. O FINANCIERAS" },
] as const;

interface ControversyDetailProps {
  data: ControversyData;
  color: string;
  showBadge?: boolean;
  // align: "left" | "right"; // Removed
}

function ControversyDetail({
  data,
  color,
  showBadge = false,
}: ControversyDetailProps) {
  // Diseño unificado: Barra a la izquierda, texto izquierda
  return (
    <div className="flex flex-row items-stretch gap-0 w-full">
      {/* Barra lateral de color siempre a la izquierda */}
      <div
        className="w-[6px] shrink-0 bg-noise-pattern"
        style={{ backgroundColor: color }}
      />

      {/* Contenido */}
      <div className="flex flex-col text-left pl-3 w-full">
        {/* Badge de Estado si existe Y si está habilitado para esta sección */}
        {showBadge && data.estado && (
          <div className="flex justify-start mb-1">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-medium text-black font-atName"
              style={{
                backgroundColor:
                  data.estado.toLowerCase().includes("curso") ||
                  data.estado.toLowerCase().includes("ejercicio")
                    ? "#FFDD55"
                    : "#DADADA",
              }}
            >
              {data.estado}
            </span>
          </div>
        )}

        {/* Título/Descripción con SourceTooltip */}
        <SourceTooltip source={data.source}>
          <Typography
            color="white"
            className="text-sm lg:text-base font-atName font-medium leading-tight"
          >
            {data.titulo}
          </Typography>
        </SourceTooltip>
      </div>
    </div>
  );
}

export function ControversiasSection({
  leftCandidate,
  rightCandidate,
}: DynamicSectionProps) {
  // Solo una categoría abierta a la vez (acordeón exclusivo)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "antecedentes"
  );

  const toggleCategory = (key: string) => {
    // Si la categoría ya está abierta, la cerramos; si no, la abrimos y cerramos las demás
    setExpandedCategory((prev) => (prev === key ? null : key));
  };

  return (
    <div className="relative w-full py-8 lg:py-12">
      {/* Imágenes de candidatos alineadas con el contenido */}
      <div className="relative mb-12 px-4 lg:px-8 pl-10 lg:pl-24">
        <div className="grid grid-cols-2 gap-20 lg:gap-160 relative">
          <div className="flex justify-end pr-2 lg:pr-4">
            {leftCandidate?.image && (
              <div className="relative">
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#FF2727]">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={leftCandidate.image}
                      alt={leftCandidate.fullName || "Candidato"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-start pl-2 lg:pl-4">
            {rightCandidate?.image && (
              <div className="relative">
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full p-1 bg-[#4E58B4]">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={rightCandidate.image}
                      alt={rightCandidate.fullName || "Candidato"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 mt-1 pointer-events-none">
            <Typography
              className="font-kenyan font-bold text-[30px] lg:text-[40px] leading-none bg-noise-pattern bg-clip-text text-transparent"
              style={{ backgroundColor: "#FF2727" }}
            >
              VS
            </Typography>
          </div>
        </div>
      </div>

      <div className="relative space-y-8 px-4 lg:px-8">
        {CATEGORIES.map((category, index) => {
          const isExpanded = expandedCategory === category.key;
          const isLast = index === CATEGORIES.length - 1;
          const showBadge = category.key === "procesosJudiciales";

          const leftData = leftCandidate?.controversias?.[category.key];
          const rightData = rightCandidate?.controversias?.[category.key];

          const leftItems = Array.isArray(leftData)
            ? (leftData as ControversyData[])
            : [];
          const rightItems = Array.isArray(rightData)
            ? (rightData as ControversyData[])
            : [];

          const maxItems = Math.max(leftItems.length, rightItems.length);
          const hasContent = maxItems > 0;

          return (
            <div key={category.key} className="relative pl-6 lg:pl-12">
              <div className="flex flex-col gap-6">
                {/* HEADLINE DE CATEGORÍA */}
                <div className="flex items-center relative z-10 box-border">
                  {/* Botón Izquierda */}
                  <div className="absolute -left-6 lg:-left-12 top-0">
                    <button
                      onClick={() => toggleCategory(category.key)}
                      className="w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors shrink-0 cursor-pointer shadow-lg z-20"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3 lg:w-5 lg:h-5 text-black" />
                      ) : (
                        <ChevronDown className="w-3 h-3 lg:w-5 lg:h-5 text-black" />
                      )}
                    </button>
                  </div>

                  {/* Título de Categoría */}
                  <div className="pl-4">
                    <Typography
                      color="white"
                      className="font-atName font-black text-xs lg:text-base uppercase tracking-wider text-left"
                    >
                      {category.label}
                    </Typography>
                  </div>
                </div>

                {/* CONTENIDO DE CATEGORÍA */}
                {isExpanded && (
                  <div className="w-full relative pt-2 pb-4 ml-px">
                    {/* Conectar con la siguiente categoría si no es la última */}
                    {!isLast && (
                      <div
                        className="absolute left-[calc(-1.5rem+11px)] lg:left-[calc(-3rem+19px)] w-[2px] bg-white -bottom-8 lg:-bottom-8 z-0"
                        style={{ top: "0", height: "calc(100% + 2rem)" }}
                      />
                    )}
                    {/* Si es el último, la línea termina en el botón (no hay línea bajando) */}

                    {/* Mostrar contenido o mensaje de sin evidencia por cada lado */}
                    <div className="flex flex-col gap-8 lg:gap-10 pl-2 lg:pl-4">
                      {/* Si ambos lados no tienen datos, mostrar mensaje en ambos */}
                      {!hasContent ? (
                        <div className="grid grid-cols-2 gap-4 lg:gap-16 relative z-10">
                          <div className="flex justify-start pr-2 lg:pr-4">
                            <Typography
                              color="white"
                              className="text-xs font-atName opacity-50"
                            >
                              NO SE ENCONTRÓ EVIDENCIA
                            </Typography>
                          </div>
                          <div className="flex justify-start pl-2 lg:pl-4">
                            <Typography
                              color="white"
                              className="text-xs font-atName opacity-50"
                            >
                              NO SE ENCONTRÓ EVIDENCIA
                            </Typography>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Renderizar los items - mostrando mensaje en primera fila si un lado está vacío */}
                          {Array.from({ length: maxItems }).map((_, i) => {
                            const lItem = leftItems[i];
                            const rItem = rightItems[i];
                            const showLeftEmptyMessage =
                              i === 0 && leftItems.length === 0;
                            const showRightEmptyMessage =
                              i === 0 && rightItems.length === 0;

                            return (
                              <div
                                key={i}
                                className="grid grid-cols-2 gap-4 lg:gap-16 relative z-10"
                              >
                                <div className="flex justify-start pr-2 lg:pr-4">
                                  {lItem ? (
                                    <ControversyDetail
                                      data={lItem}
                                      color="#FF2727"
                                      showBadge={showBadge}
                                    />
                                  ) : showLeftEmptyMessage ? (
                                    <Typography
                                      color="white"
                                      className="text-xs font-atName opacity-50"
                                    >
                                      NO SE ENCONTRÓ EVIDENCIA
                                    </Typography>
                                  ) : null}
                                </div>
                                <div className="flex justify-start pl-2 lg:pl-4">
                                  {rItem ? (
                                    <ControversyDetail
                                      data={rItem}
                                      color="#4E58B4"
                                      showBadge={showBadge}
                                    />
                                  ) : showRightEmptyMessage ? (
                                    <Typography
                                      color="white"
                                      className="text-xs font-atName opacity-50"
                                    >
                                      NO SE ENCONTRÓ EVIDENCIA
                                    </Typography>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Línea passthrough si está colapsado */}
                {!isExpanded && !isLast && (
                  <div
                    className="absolute left-[11px] lg:left-[19px] w-[2px] bg-white bottom-0 z-0"
                    style={{
                      top: "1.5rem",
                      height: "calc(100% - 1.5rem + 2rem)", // +2rem para cubrir el gap hasta el siguiente
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
