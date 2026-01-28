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

export interface PartidoHistorico {
  ano: string;
  partido: string;
  icono?: string;
  source?: string | string[];
}

export interface PerfilGeneral {
  edad: SourceableString;
  nacimiento: SourceableString;
  lugar: SourceableString;
  nivelEducativo: SourceableString;
  profesion: SourceableString;
  partidoActual: SourceableString;
  cambiosDePartido: SourceableString;
  historialPartidos?: PartidoHistorico[];
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

export interface ProposalData {
  titulo?: string;
  descripcion?: string;
  viabilidad?: string;
  respaldo?: string;
  source?: string | string[];
}

export type ProposalField = SourceableArray | ProposalData[];

export interface PropuestasPrincipales {
  economico: ProposalField;
  social: ProposalField;
  ambiental: ProposalField;
  institucional: ProposalField;
  educativo: ProposalField;
  salud: ProposalField;
  seguridad: ProposalField;
}

export interface CoherenciaConElPlan {
  nivelDeAlineacion: SourceableString;
  diferencias: SourceableString;
  cumplimientoPrevio: SourceableString;
}

export interface ControversyData {
  titulo: string;
  estado?: string;
  source?: string | string[];
}

export interface Controversias {
  antecedentes?: ControversyData[];
  procesosJudiciales?: ControversyData[];
  declaraciones?: ControversyData[];
  observaciones?: ControversyData[];
  // Campos antiguos para compatibilidad temporal
  investigaciones?: SourceableArray;
  enCurso?: SourceableArray;
}

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

export interface LegislativeProject {
  id: string;
  code: string; // e.g., "09102/2024-CR"
  title: string;
  date: string;
  url?: string;
  state?: string; // e.g., "Presentado", "Aprobado", etc. - helpful for coloring if needed
}

export interface ProjectStats {
  presentados: number;
  aprobados: number;
  enPleno: number;
  enComision: number;
  rechazados: number;
  otros: number; // For any remainder
}

export interface HistorialLegislativo {
  tieneHistorial: boolean;
  productivityLabel: "ALTA" | "MEDIA" | "BAJA" | "N/A";
  asistencia: Asistencia; // Keeping for backward compat or if needed elsewhere, though not in this specific view
  stats: ProjectStats;
  projects: LegislativeProject[];
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

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  facebook?: string;
  web?: string;
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
  partyIcon?: string;
  socialLinks?: SocialLinks;
  perfilGeneral: PerfilGeneral;
  experienciaPolitica: ExperienciaPolitica;
  experienciaGestion: ExperienciaGestion;
  ideologiaPolitica: IdeologiaPolitica;
  propuestasPrincipales: PropuestasPrincipales;
  coherenciaConElPlan: CoherenciaConElPlan;
  controversias: Controversias;
  transparencia: string[] | TransparenciaData | null;
  competenciasPersonales: CompetenciasPersonales | null;
  percepcionPublica: PercepcionPublica | null;
  innovacionYVision: string[] | InnovacionData | null;
  historialLegislativo: HistorialLegislativo | null;
}
