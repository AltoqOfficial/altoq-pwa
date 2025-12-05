/**
 * Types for Candidate Comparison Data
 */

export interface PerfilGeneral {
  edad: string;
  nacimiento: string;
  lugar: string;
  nivelEducativo: string;
  profesion: string;
  partidoActual: string;
  cambiosDePartido: string;
}

export interface ExperienciaPolitica {
  anosExperiencia: string;
  cargosPrevios: string[];
  candidaturasPresidenciales: string[];
}

export interface SectorExperiencia {
  cantidad: number;
  detalle: string[];
}

export interface ExperienciaGestion {
  sectorPublico: SectorExperiencia;
  sectorPrivado: SectorExperiencia;
}

export interface IdeologiaPolitica {
  posicion: string;
  economia: string;
  matrimonioIgualitario: string;
  aborto: string;
  seguridad: string;
  ambiente: string;
  educacion: string;
  reformaPolitica: string;
}

export interface PropuestasPrincipales {
  economico: string[];
  social: string[];
  ambiental: string[];
  institucional: string[];
  educativo: string[];
  salud: string[];
  seguridad: string[];
}

export interface CoherenciaConElPlan {
  nivelDeAlineacion: string;
  diferencias: string;
  cumplimientoPrevio: string;
}

export interface Controversias {
  investigaciones: string[];
  enCurso: string[];
}

export interface CompetenciasPersonales {
  liderazgo: string;
  comunicacion: string;
  credibilidad: string;
}

export interface IntencionVoto {
  min: number;
  max: number;
  descripcion: string;
}

export interface PercepcionPublica {
  intencionVoto: IntencionVoto;
  aprobacion: string;
  redes: string;
}

export interface Asistencia {
  porcentaje: number;
  label: string;
}

export interface HistorialLegislativo {
  tieneHistorial: boolean;
  asistencia: Asistencia;
  proyectosPresentados: number;
  proyectosAprobados: number;
  nota?: string;
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
  transparencia: string[];
  competenciasPersonales: CompetenciasPersonales;
  percepcionPublica: PercepcionPublica;
  innovacionYVision: string[];
  historialLegislativo: HistorialLegislativo;
}
