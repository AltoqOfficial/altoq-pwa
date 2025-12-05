/**
 * Constants for ComparisonHero component
 */

export const NAV_ITEMS = [
  "Perfil General",
  "Experiencia Política",
  "Experiencia de Gestión",
  "Ideología Política",
  "Propuestas Principales",
  "Coherencia con el Plan",
  "Controversias",
  "Transparencia",
  "Competencias personales",
  "Percepción Pública",
  "Innovación y Visión",
  "Historial Legislativo",
] as const;

export interface Candidate {
  id: string;
  src: string;
  name: string; // Full name to display (also used as alt text)
  dataKey: string; // Key to lookup in candidatesData
}

export const CANDIDATES: Candidate[] = [
  {
    id: "adadada",
    src: "/candidatos/1.webp",
    name: "Candidato 1",
    dataKey: "",
  },
  {
    id: "cerron",
    src: "/candidatos/2.webp",
    name: "Vladimir Cerrón",
    dataKey: "",
  },
  { id: "x2", src: "/candidatos/3.webp", name: "Candidato 3", dataKey: "" },
  { id: "acuna", src: "/candidatos/4.webp", name: "César Acuña", dataKey: "" },
  {
    id: "keiko",
    src: "/candidatos/5.webp",
    name: "Keiko Fujimori",
    dataKey: "keiko",
  },
  { id: "niidea", src: "/candidatos/6.webp", name: "Candidato 6", dataKey: "" },
  { id: "philip", src: "/candidatos/7.webp", name: "Candidato 7", dataKey: "" },
  {
    id: "lopez",
    src: "/candidatos/8.webp",
    name: "Rafael López Aliaga",
    dataKey: "lopez",
  },
  { id: "asd", src: "/candidatos/9.webp", name: "Candidato 9", dataKey: "" },
  {
    id: "alvarez",
    src: "/candidatos/10.webp",
    name: "Candidato 10",
    dataKey: "",
  },
];

export const SELECTION_COLORS = {
  first: "#FF2727",
  second: "#3E4692",
} as const;

// Section IDs (derived from NAV_ITEMS without spaces)
export const SECTION_IDS = NAV_ITEMS.map((item) =>
  item.replace(/\s+/g, "")
) as readonly string[];
