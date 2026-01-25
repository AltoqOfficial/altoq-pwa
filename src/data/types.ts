/**
 * Types for Candidate Comparison Data
 */

/**
 * Value with optional source URL for citations
 */
export interface ValueWithSource {
  value: string | string[] | null;
  source?: string | string[] | null;
}

/**
 * Array value with optional source URL
 */
export interface ArrayWithSource {
  values: string | string[];
  source?: string | string[] | null;
}

/**
 * Type that can be either a plain value or a value with source
 */
export type SourceableString = string | string[] | null | ValueWithSource;
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
  cantidad: number | null;
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

// Controversias is a flexible type to accommodate various data structures from candidates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Controversias = Record<string, any>;

export interface CompetenciasPersonales {
  liderazgo: SourceableString;
  comunicacion: SourceableString;
  credibilidad: SourceableString;
}

export interface IntencionVoto {
  min: number | null;
  max: number | null;
  descripcion: string;
  source?: string | string[] | null;
}

export interface PercepcionPublica {
  intencionVoto: IntencionVoto;
  aprobacion: SourceableString;
  redes: SourceableString;
}

export interface Asistencia {
  porcentaje: number | null;
  label: string | null;
  source?: string | string[] | null;
}

export interface HistorialLegislativo {
  tieneHistorial: boolean;
  asistencia: Asistencia | null;
  proyectosPresentados: number | null;
  proyectosAprobados: number | null;
  nota?: string;
  source?: string | string[] | null;
}

/**
 * Transparency with source
 */
export interface TransparenciaData {
  items: string[];
  source?: string | string[];
}

/**
 * Innovation with source
 */
export interface InnovacionData {
  items: string[];
  source?: string | string[];
}

export interface CandidateComparisonData {
  id: string;
  slug?: string;
  name?: string; // Alternative to fullName in some candidate files
  fullName?: string;
  shortName?: string;
  image: string;
  color?: string;
  party: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  perfilGeneral: PerfilGeneral | Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experienciaPolitica: ExperienciaPolitica | Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experienciaGestion: ExperienciaGestion | Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ideologiaPolitica: IdeologiaPolitica | Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propuestasPrincipales: PropuestasPrincipales | Record<string, any>;
  coherenciaConElPlan: CoherenciaConElPlan | null;
  controversias: Controversias;
  transparencia: string[] | TransparenciaData | null;
  competenciasPersonales: CompetenciasPersonales | null;
  percepcionPublica: PercepcionPublica | null;
  innovacionYVision: string[] | InnovacionData | null;
  historialLegislativo: HistorialLegislativo | null;
}
