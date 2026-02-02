export interface Plan {
  plan_id: number;
  party: string;
  candidate_display_name: string;
  url: string;
}

export interface Evidence {
  plan_id: number;
  label: string;
  summary: string;
  explanation: string;
}

export interface OptionMapping {
  option_key: string;
  evidences: Evidence[];
}

export interface QuestionMapping {
  question_id: number;
  option_mappings: OptionMapping[];
}

export interface QuestionnaireMapping {
  plans: Plan[];
  question_option_mappings: QuestionMapping[];
}

// Lo que el frontend envía al backend
export interface QuestionnaireSubmitRequest {
  // Mapa de question_id -> opción seleccionada (ej: { "1": "C", "2": "A" })
  answers: Record<string, string>;
}

// Resultado para un plan específico
export interface PlanResult extends Plan {
  match_score: number; // Puntos totales (ej. 15 puntos)
  match_percentage: number; // Porcentaje de afinidad (ej. 75%)
  matching_evidences: {
    // Por qué hizo match
    question_id: number;
    evidence: Evidence;
  }[];
}

// Lo que el backend responde
export interface QuestionnaireSubmitResponse {
  results: PlanResult[];
}
