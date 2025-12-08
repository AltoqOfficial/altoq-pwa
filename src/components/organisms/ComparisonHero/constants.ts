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
  // Image dimensions per breakpoint (mobile/default, sm, md, lg)
  imageWidth?: number; // Default/mobile width (grid 5x2)
  imageHeight?: number; // Default/mobile height (grid 5x2)
  imageWidthSm?: number; // SM breakpoint width
  imageHeightSm?: number; // SM breakpoint height
  imageWidthMd?: number; // MD breakpoint width (grid 2 cols)
  imageHeightMd?: number; // MD breakpoint height (grid 2 cols)
  imageWidthLg?: number; // LG+ breakpoint width
  imageHeightLg?: number; // LG+ breakpoint height
  // Offset per breakpoint
  offsetY?: number; // Y-axis offset default (default: 16)
  offsetX?: number; // X-axis offset default (default: 0)
  offsetYSm?: number; // Y-axis offset for SM
  offsetXSm?: number; // X-axis offset for SM
  offsetYMd?: number; // Y-axis offset for MD
  offsetXMd?: number; // X-axis offset for MD
  // Image filters (CSS filter values)
  brightness?: number; // Exposición/luces (default: 1, >1 más brillante, <1 más oscuro)
  contrast?: number; // Contraste (default: 1, >1 más contraste)
  saturate?: number; // Saturación (default: 1, >1 más saturado, <1 desaturado)
  sepia?: number; // Temperatura/calidez (default: 0, 0.1-0.4 = cálido, 0 = neutral)
  shadows?: number; // Sombras (default: 1, >1 = levanta sombras, <1 = oscurece sombras)
}

export const CANDIDATES: Candidate[] = [
  {
    id: "acuna",
    src: "/candidatos/4.webp",
    name: "César Acuña",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 110,
    imageHeight: 110,
    imageWidthSm: 150,
    imageHeightSm: 150,
    imageWidthMd: 120,
    imageHeightMd: 120,
    imageWidthLg: 145,
    imageHeightLg: 145,
    // Offsets per breakpoint
    offsetY: 25,
    offsetX: 5,
    offsetYSm: 35,
    offsetXSm: 5,
    offsetYMd: 30,
    offsetXMd: 11,
    // Filters
    brightness: 1,
    contrast: 1.2,
    saturate: 0.4,
    sepia: 0.1,
    shadows: 1,
  },
  {
    id: "cerron",
    src: "/candidatos/2.webp",
    name: "Vladimir Cerrón",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 110,
    imageHeight: 110,
    imageWidthSm: 130,
    imageHeightSm: 130,
    imageWidthMd: 110,
    imageHeightMd: 110,
    imageWidthLg: 135,
    imageHeightLg: 135,
    // Offsets per breakpoint
    offsetY: 18,
    offsetYSm: 22,
    offsetYMd: 16,
    // Filters
    brightness: 1,
    contrast: 1.3,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "x2",
    src: "/candidatos/3.webp",
    name: "Candidato 3",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 100,
    imageHeight: 100,
    imageWidthSm: 130,
    imageHeightSm: 130,
    imageWidthMd: 80,
    imageHeightMd: 80,
    imageWidthLg: 105,
    imageHeightLg: 105,
    // Offsets per breakpoint
    offsetY: 12,
    offsetYSm: 17,
    offsetYMd: 2,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "alvarez",
    src: "/candidatos/10.webp",
    name: "Candidato 10",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 150,
    imageHeight: 150,
    imageWidthSm: 150,
    imageHeightSm: 150,
    imageWidthMd: 140,
    imageHeightMd: 140,
    imageWidthLg: 165,
    imageHeightLg: 165,
    // Offsets per breakpoint
    offsetY: 35,
    offsetYSm: 30,
    offsetYMd: 30,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "keiko",
    src: "/candidatos/5.webp",
    name: "Keiko Fujimori",
    dataKey: "keiko",
    // Dimensions per breakpoint
    imageWidth: 90,
    imageHeight: 90,
    imageWidthSm: 90,
    imageHeightSm: 90,
    imageWidthMd: 80,
    imageHeightMd: 80,
    imageWidthLg: 105,
    imageHeightLg: 105,
    // Offsets per breakpoint
    offsetY: 13,
    offsetYSm: 4,
    offsetYMd: 6,
    // Filters
    brightness: 1.4,
    contrast: 1.15,
    saturate: 1.1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "asd",
    src: "/candidatos/9.webp",
    name: "Candidato 9",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 100,
    imageHeight: 100,
    imageWidthSm: 100,
    imageHeightSm: 100,
    imageWidthMd: 110,
    imageHeightMd: 110,
    imageWidthLg: 135,
    imageHeightLg: 135,
    // Offsets per breakpoint
    offsetY: 20,
    offsetYSm: 15,
    offsetYMd: 20,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "philip",
    src: "/candidatos/7.webp",
    name: "Candidato 7",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 120,
    imageHeight: 120,
    imageWidthSm: 120,
    imageHeightSm: 120,
    imageWidthMd: 140,
    imageHeightMd: 140,
    imageWidthLg: 165,
    imageHeightLg: 165,
    // Offsets per breakpoint
    offsetY: 30,
    offsetYSm: 24,
    offsetYMd: 32,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "niidea",
    src: "/candidatos/6.webp",
    name: "Candidato 6",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 110,
    imageHeight: 110,
    imageWidthSm: 110,
    imageHeightSm: 110,
    imageWidthMd: 120,
    imageHeightMd: 120,
    imageWidthLg: 145,
    imageHeightLg: 145,
    // Offsets per breakpoint
    offsetY: 22,
    offsetYSm: 17,
    offsetYMd: 23,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "lopez",
    src: "/candidatos/8.webp",
    name: "Rafael López Aliaga",
    dataKey: "lopez",
    // Dimensions per breakpoint
    imageWidth: 85,
    imageHeight: 85,
    imageWidthSm: 90,
    imageHeightSm: 90,
    imageWidthMd: 90,
    imageHeightMd: 90,
    imageWidthLg: 115,
    imageHeightLg: 115,
    // Offsets per breakpoint
    offsetY: 12,
    offsetYSm: 9,
    offsetYMd: 12,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
  },
  {
    id: "adadada",
    src: "/candidatos/1.webp",
    name: "Candidato 1",
    dataKey: "",
    // Dimensions per breakpoint
    imageWidth: 115,
    imageHeight: 115,
    imageWidthSm: 110,
    imageHeightSm: 110,
    imageWidthMd: 110,
    imageHeightMd: 110,
    imageWidthLg: 135,
    imageHeightLg: 135,
    // Offsets per breakpoint
    offsetY: 18,
    offsetYSm: 13,
    offsetYMd: 17,
    // Filters
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
    shadows: 1,
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
