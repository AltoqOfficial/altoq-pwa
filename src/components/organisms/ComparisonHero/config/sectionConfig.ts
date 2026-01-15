/**
 * Configuration for all comparison sections
 * Defines the structure and fields for each section dynamically
 */

import type { FieldConfig, SectionLayoutType } from "../components/shared";

/**
 * Section configuration type
 */
export interface SectionDefinition {
  id: string;
  navId: string;
  title: string;
  dataKey: string;
  layout: SectionLayoutType;
  fields?: FieldConfig[];
}

/**
 * Perfil General Section Config
 */
export const PERFIL_GENERAL_CONFIG: SectionDefinition = {
  id: "PerfilGeneral",
  navId: "PerfilGeneral",
  title: "PERFIL GENERAL",
  dataKey: "perfilGeneral",
  layout: "three-column",
  fields: [
    { key: "edad", label: "EDAD" },
    { key: "nacimiento", label: "NACIMIENTO" },
    { key: "lugar", label: "LUGAR" },
    { key: "nivelEducativo", label: "NIVEL EDUCATIVO" },
    { key: "profesion", label: "PROFESIÓN" },
    { key: "partidoActual", label: "PARTIDO ACTUAL" },
    { key: "cambiosDePartido", label: "CAMBIOS DE PARTIDO" },
  ],
};

/**
 * Experiencia Política Section Config
 */
export const EXPERIENCIA_POLITICA_CONFIG: SectionDefinition = {
  id: "ExperienciaPolitica",
  navId: "ExperienciaPolitica",
  title: "EXPERIENCIA POLÍTICA",
  dataKey: "experienciaPolitica",
  layout: "two-column-split",
  fields: [
    { key: "anosExperiencia", label: "AÑOS DE EXPERIENCIA", type: "text" },
    { key: "cargosPrevios", label: "CARGOS PREVIOS", type: "list" },
    {
      key: "candidaturasPresidenciales",
      label: "CANDIDATURAS PRESIDENCIALES",
      type: "list",
    },
  ],
};

/**
 * Experiencia Profesional Section Config
 */
export const EXPERIENCIA_GESTION_CONFIG: SectionDefinition = {
  id: "ExperienciaProfesional",
  navId: "ExperienciaProfesional",
  title: "EXPERIENCIA PROFESIONAL",
  dataKey: "experienciaGestion",
  layout: "custom", // Uses custom component
};

/**
 * Ideología Política Section Config
 */
export const IDEOLOGIA_POLITICA_CONFIG: SectionDefinition = {
  id: "IdeologiaPolitica",
  navId: "IdeologiaPolitica",
  title: "IDEOLOGÍA POLÍTICA",
  dataKey: "ideologiaPolitica",
  layout: "three-column",
  fields: [
    { key: "posicion", label: "POSICIÓN" },
    { key: "economia", label: "ECONOMÍA" },
    { key: "matrimonioIgualitario", label: "MATRIMONIO IGUALITARIO" },
    { key: "aborto", label: "ABORTO" },
    { key: "seguridad", label: "SEGURIDAD" },
    { key: "ambiente", label: "AMBIENTE" },
    { key: "educacion", label: "EDUCACIÓN" },
    { key: "reformaPolitica", label: "REFORMA POLÍTICA" },
  ],
};

/**
 * Propuestas Principales Section Config
 */
export const PROPUESTAS_PRINCIPALES_CONFIG: SectionDefinition = {
  id: "PropuestasPrincipales",
  navId: "PropuestasPrincipales",
  title: "PROPUESTAS PRINCIPALES",
  dataKey: "propuestasPrincipales",
  layout: "three-column",
  fields: [
    { key: "economico", label: "ECONÓMICO", type: "list" },
    { key: "social", label: "SOCIAL", type: "list" },
    { key: "ambiental", label: "AMBIENTAL", type: "list" },
    { key: "institucional", label: "INSTITUCIONAL", type: "list" },
    { key: "educativo", label: "EDUCATIVO", type: "list" },
    { key: "salud", label: "SALUD", type: "list" },
    { key: "seguridad", label: "SEGURIDAD", type: "list" },
  ],
};

/**
 * Coherencia con el Plan Section Config
 */
export const COHERENCIA_PLAN_CONFIG: SectionDefinition = {
  id: "CoherenciaconelPlan",
  navId: "CoherenciaconelPlan",
  title: "COHERENCIA CON EL PLAN",
  dataKey: "coherenciaConElPlan",
  layout: "three-column",
  fields: [
    { key: "nivelDeAlineacion", label: "NIVEL DE ALINEACIÓN" },
    { key: "diferencias", label: "DIFERENCIAS" },
    { key: "cumplimientoPrevio", label: "CUMPLIMIENTO PREVIO" },
  ],
};

/**
 * Controversias Section Config
 */
export const CONTROVERSIAS_CONFIG: SectionDefinition = {
  id: "Controversias",
  navId: "Controversias",
  title: "CONTROVERSIAS",
  dataKey: "controversias",
  layout: "two-column-split",
  fields: [
    { key: "investigaciones", label: "INVESTIGACIONES", type: "list" },
    { key: "enCurso", label: "EN CURSO", type: "list" },
  ],
};

/**
 * Transparencia Section Config
 */
export const TRANSPARENCIA_CONFIG: SectionDefinition = {
  id: "Transparencia",
  navId: "Transparencia",
  title: "TRANSPARENCIA",
  dataKey: "transparencia",
  layout: "list-comparison",
};

/**
 * Competencias Personales Section Config
 */
export const COMPETENCIAS_PERSONALES_CONFIG: SectionDefinition = {
  id: "Competenciaspersonales",
  navId: "Competenciaspersonales",
  title: "COMPETENCIAS PERSONALES",
  dataKey: "competenciasPersonales",
  layout: "custom", // Uses custom styling
  fields: [
    { key: "liderazgo", label: "Liderazgo" },
    { key: "comunicacion", label: "Comunicación" },
    { key: "credibilidad", label: "Credibilidad" },
  ],
};

/**
 * Percepción Pública Section Config
 */
export const PERCEPCION_PUBLICA_CONFIG: SectionDefinition = {
  id: "PercepcionPublica",
  navId: "PercepcionPublica",
  title: "PERCEPCIÓN PÚBLICA",
  dataKey: "percepcionPublica",
  layout: "custom", // Uses VoteIntentionChart
};

/**
 * Innovación y Visión Section Config
 */
export const INNOVACION_VISION_CONFIG: SectionDefinition = {
  id: "InnovacionyVision",
  navId: "InnovacionyVision",
  title: "INNOVACIÓN Y VISIÓN",
  dataKey: "innovacionYVision",
  layout: "list-comparison",
};

/**
 * Historial Legislativo Section Config
 */
export const HISTORIAL_LEGISLATIVO_CONFIG: SectionDefinition = {
  id: "HistorialLegislativo",
  navId: "HistorialLegislativo",
  title: "PROYECTOS DE LEY",
  dataKey: "historialLegislativo",
  layout: "custom", // Uses LegislativeHistoryChart
};

/**
 * All section configurations in order
 */
export const ALL_SECTIONS_CONFIG: SectionDefinition[] = [
  PERFIL_GENERAL_CONFIG,
  EXPERIENCIA_POLITICA_CONFIG,
  EXPERIENCIA_GESTION_CONFIG,
  IDEOLOGIA_POLITICA_CONFIG,
  PROPUESTAS_PRINCIPALES_CONFIG,
  CONTROVERSIAS_CONFIG,
  HISTORIAL_LEGISLATIVO_CONFIG,
];

/**
 * Get section config by ID
 */
export function getSectionConfig(id: string): SectionDefinition | undefined {
  return ALL_SECTIONS_CONFIG.find((section) => section.id === id);
}
