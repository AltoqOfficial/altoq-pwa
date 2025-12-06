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
  imageHeight?: number; // Image height in pixels (default: 100, used as mobile/tablet base)
  imageWidth?: number; // Image width in pixels (default: auto, used as mobile/tablet base)
  imageHeightLg?: number; // Image height on desktop/lg breakpoint
  imageWidthLg?: number; // Image width on desktop/lg breakpoint
  offsetY?: number; // Y-axis offset in pixels (default: 16)
  offsetX?: number; // X-axis offset in pixels (default: 0)
}

export const CANDIDATES: Candidate[] = [
  {
    id: "acuna",
    src: "/candidatos/4.webp",
    name: "César Acuña",
    dataKey: "",
    imageHeightLg: 145,
    imageWidthLg: 145,
    imageHeight: 120,
    imageWidth: 120,
    offsetY: 30,
    offsetX: 11,
  },
  {
    id: "cerron",
    src: "/candidatos/2.webp",
    name: "Vladimir Cerrón",
    dataKey: "",
    imageHeightLg: 135,
    imageWidthLg: 135,
    imageHeight: 110,
    imageWidth: 110,
    offsetY: 16,
  },
  {
    id: "x2",
    src: "/candidatos/3.webp",
    name: "Candidato 3",
    dataKey: "",
    imageHeightLg: 105,
    imageWidthLg: 105,
    imageHeight: 80,
    imageWidth: 80,
    offsetY: 2,
  },
  {
    id: "alvarez",
    src: "/candidatos/10.webp",
    name: "Candidato 10",
    dataKey: "",
    imageHeightLg: 165,
    imageWidthLg: 165,
    imageHeight: 140,
    imageWidth: 140,
    offsetY: 30,
  },
  {
    id: "keiko",
    src: "/candidatos/5.webp",
    name: "Keiko Fujimori",
    dataKey: "keiko",
    imageHeightLg: 105,
    imageWidthLg: 105,
    imageHeight: 80,
    imageWidth: 80,
    offsetY: 6,
  },
  {
    id: "asd",
    src: "/candidatos/9.webp",
    name: "Candidato 9",
    dataKey: "",
    imageHeightLg: 135,
    imageWidthLg: 135,
    imageHeight: 110,
    imageWidth: 110,
    offsetY: 20,
  },
  {
    id: "philip",
    src: "/candidatos/7.webp",
    name: "Candidato 7",
    dataKey: "",
    imageHeightLg: 165,
    imageWidthLg: 165,
    imageHeight: 140,
    imageWidth: 140,
    offsetY: 32,
  },
  {
    id: "niidea",
    src: "/candidatos/6.webp",
    name: "Candidato 6",
    dataKey: "",
    imageHeightLg: 145,
    imageWidthLg: 145,
    imageHeight: 120,
    imageWidth: 120,
    offsetY: 23,
  },
  {
    id: "lopez",
    src: "/candidatos/8.webp",
    name: "Rafael López Aliaga",
    dataKey: "lopez",
    imageHeightLg: 115,
    imageWidthLg: 115,
    imageHeight: 90,
    imageWidth: 90,
    offsetY: 12,
  },
  {
    id: "adadada",
    src: "/candidatos/1.webp",
    name: "Candidato 1",
    dataKey: "",
    imageHeightLg: 135,
    imageWidthLg: 135,
    imageHeight: 110,
    imageWidth: 110,
    offsetY: 17,
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
