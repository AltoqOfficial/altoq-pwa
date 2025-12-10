/**
 * Types for Candidate Comparison Data
 */

/**
 * Value with optional source URL for citations
 */
export interface ValueWithSource {
  value: string;
  source?: string | string[];
}

/**
 * Array value with optional source URL
 */
export interface ArrayWithSource {
  values: string[];
  source?: string | string[];
}

/**
 * Type that can be either a plain value or a value with source
 */
export type SourceableString = string | ValueWithSource;
export type SourceableArray = string[] | ArrayWithSource;

export interface PerfilGeneral {
  edad: SourceableString;
  nacimiento: SourceableString;
  lugar: SourceableString;
  nivelEducativo: SourceableString;
  profesion: SourceableString;
  partidoActual: SourceableString;
  cambiosDePartido: SourceableString;
}

export interface ExperienciaPolitica {
  anosExperiencia: SourceableString;
  cargosPrevios: SourceableArray;
  candidaturasPresidenciales: SourceableArray;
}

export interface SectorExperiencia {
  cantidad: number;
  detalle: SourceableArray;
}

export interface ExperienciaGestion {
  sectorPublico: SectorExperiencia;
  sectorPrivado: SectorExperiencia;
  source?: string;
}

export interface IdeologiaPolitica {
  posicion: SourceableString;
  economia: SourceableString;
  matrimonioIgualitario: SourceableString;
  aborto: SourceableString;
  seguridad: SourceableString;
  ambiente: SourceableString;
  educacion: SourceableString;
  reformaPolitica: SourceableString;
}

export interface PropuestasPrincipales {
  economico: SourceableArray;
  social: SourceableArray;
  ambiental: SourceableArray;
  institucional: SourceableArray;
  educativo: SourceableArray;
  salud: SourceableArray;
  seguridad: SourceableArray;
}

export interface CoherenciaConElPlan {
  nivelDeAlineacion: SourceableString;
  diferencias: SourceableString;
  cumplimientoPrevio: SourceableString;
}

export interface Controversias {
  investigaciones: SourceableArray;
  enCurso: SourceableArray;
}

export interface CompetenciasPersonales {
  liderazgo: SourceableString;
  comunicacion: SourceableString;
  credibilidad: SourceableString;
}

export interface IntencionVoto {
  min: number;
  max: number;
  descripcion: string;
  source?: string;
}

export interface PercepcionPublica {
  intencionVoto: IntencionVoto;
  aprobacion: SourceableString;
  redes: SourceableString;
}

export interface Asistencia {
  porcentaje: number;
  label: string;
  source?: string;
}

export interface HistorialLegislativo {
  tieneHistorial: boolean;
  asistencia: Asistencia;
  proyectosPresentados: number;
  proyectosAprobados: number;
  nota?: string;
  source?: string;
}

/**
 * Transparency with source
 */
export interface TransparenciaData {
  items: string[];
  source?: string;
}

/**
 * Innovation with source
 */
export interface InnovacionData {
  items: string[];
  source?: string;
}

export interface CandidateComparisonData {
  id: string;
  slug: string;
  fullName: string;
  shortName: string;
  image: string;
  color: string;
  party: string;
  perfilGeneral: PerfilGeneral;
  experienciaPolitica: ExperienciaPolitica;
  experienciaGestion: ExperienciaGestion;
  ideologiaPolitica: IdeologiaPolitica;
  propuestasPrincipales: PropuestasPrincipales;
  coherenciaConElPlan: CoherenciaConElPlan;
  controversias: Controversias;
  transparencia: string[] | TransparenciaData;
  competenciasPersonales: CompetenciasPersonales;
  percepcionPublica: PercepcionPublica;
  innovacionYVision: string[] | InnovacionData;
  historialLegislativo: HistorialLegislativo;
}
