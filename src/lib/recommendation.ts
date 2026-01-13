import type { NextRequest } from "next/server";

export type QuestionId =
  | "Q1"
  | "Q2"
  | "Q3"
  | "Q4"
  | "Q5"
  | "Q6"
  | "Q7"
  | "Q8"
  | "Q9"
  | "Q10"
  | "Q11"
  | "Q12"
  | "Q13"
  | "Q14"
  | "Q15"
  | "Q16"
  | "Q17"
  | "Q18"
  | "Q19"
  | "Q20";

export type SectionId = "S1" | "S2" | "S3" | "S4" | "S5";
export type OptionKey = "A" | "B" | "C" | "D" | "E";
export type AnswerKey = 1 | 2 | 3 | 4 | 5;

export type UserAnswers = Record<QuestionId, OptionKey>;

export interface CandidatePosition {
  id: string;
  name: string;
  party: string;
  ideology: string;
  photoUrl: string;
  answers: AnswerKey[];
}

export interface CandidateWithScores {
  id: string;
  name: string;
  party: string;
  photoUrl: string;
  scoreTotal: number;
  scoresBySection: Record<SectionId, number>;
  explanations: Record<SectionId, string[]>;
}

export interface RecommendationVersion {
  questionnaire: string;
  dataset: string;
  scoring: string;
}

export interface RecommendationResult {
  candidates: CandidateWithScores[];
  version: RecommendationVersion;
}

const QUESTION_ORDER: QuestionId[] = [
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "Q5",
  "Q6",
  "Q7",
  "Q8",
  "Q9",
  "Q10",
  "Q11",
  "Q12",
  "Q13",
  "Q14",
  "Q15",
  "Q16",
  "Q17",
  "Q18",
  "Q19",
  "Q20",
];

const SECTION_QUESTIONS: Record<SectionId, QuestionId[]> = {
  S1: ["Q1", "Q2", "Q3", "Q4"],
  S2: ["Q5", "Q6", "Q7", "Q8"],
  S3: ["Q9", "Q10", "Q11", "Q12"],
  S4: ["Q13", "Q14", "Q15", "Q16"],
  S5: ["Q17", "Q18", "Q19", "Q20"],
};

const QUESTION_TO_SECTION = QUESTION_ORDER.reduce<
  Record<QuestionId, SectionId>
>(
  (acc, questionId) => {
    const sectionEntry = Object.entries(SECTION_QUESTIONS).find(
      ([_, questions]) => questions.includes(questionId)
    );

    if (sectionEntry) {
      acc[questionId] = sectionEntry[0] as SectionId;
    }

    return acc;
  },
  {} as Record<QuestionId, SectionId>
);

const ANSWER_VALUE_MAP: Record<OptionKey, AnswerKey> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
};

const VERSION: RecommendationVersion = {
  questionnaire: "1.0.0",
  dataset: "1.0.0",
  scoring: "1.0.0",
};

const QUESTIONS_PER_SECTION = 4;
const SECTION_WEIGHT = 0.2;

const roundTwoDecimals = (value: number) => Number(value.toFixed(2));

const normalizeUserAnswers = (answers: UserAnswers) =>
  QUESTION_ORDER.reduce<Record<QuestionId, AnswerKey>>(
    (acc, questionId) => {
      acc[questionId] = ANSWER_VALUE_MAP[answers[questionId]];
      return acc;
    },
    {} as Record<QuestionId, AnswerKey>
  );

const buildSectionExplanations = (
  perQuestionScores: Record<QuestionId, number>,
  userAnswers: UserAnswers
) => {
  const sectionExplanations = {} as Record<SectionId, string[]>;

  (Object.keys(SECTION_QUESTIONS) as SectionId[]).forEach((sectionId) => {
    const questions = SECTION_QUESTIONS[sectionId];
    const sorted = [...questions].sort((a, b) => {
      const diff = perQuestionScores[b] - perQuestionScores[a];
      return diff !== 0
        ? diff
        : QUESTION_ORDER.indexOf(a) - QUESTION_ORDER.indexOf(b);
    });

    const topTwo = sorted.slice(0, 2);
    const worst = sorted[sorted.length - 1];

    const messages: string[] = [];

    topTwo.forEach((questionId) => {
      const option = userAnswers[questionId];
      const score = roundTwoDecimals(perQuestionScores[questionId] * 100);
      messages.push(
        `Mayor coincidencia ${questionId}: ${explanationsCatalog[questionId][option]} (${score}%)`
      );
    });

    const worstScore = roundTwoDecimals(perQuestionScores[worst] * 100);
    const worstOption = userAnswers[worst];
    messages.push(
      `Menor coincidencia ${worst}: ${explanationsCatalog[worst][worstOption]} (${worstScore}%)`
    );

    sectionExplanations[sectionId] = messages;
  });

  return sectionExplanations;
};

export const explanationsCatalog: Record<
  QuestionId,
  Record<OptionKey, string>
> = {
  Q1: {
    A: "Prefieres meritocracia tecnica en altos cargos",
    B: "Valoras control politico del congreso",
    C: "Buscas estabilidad de funcionarios",
    D: "Prioriza carrera publica sin cargos de confianza",
    E: "Prefieres decision rapida desde el ejecutivo",
  },
  Q2: {
    A: "Apoyas sanciones severas por irregularidades",
    B: "Prefieres transparencia en linea en contratos",
    C: "Confias en tecnologia para vigilar obras",
    D: "Quieres centralizar obras en una entidad tecnica",
    E: "Impulsas fiscalizacion ciudadana directa",
  },
  Q3: {
    A: "Quieres reducir tramites al minimo",
    B: "Prefieres que el estado asuma la demora",
    C: "Prioriza digitalizacion total de tramites",
    D: "Optas por atencion presencial mejorada",
    E: "Prefieres achicar el estado para agilizar",
  },
  Q4: {
    A: "Favoreces inhabilitacion permanente por corrupcion",
    B: "Apoyas confiscar bienes y reparar dano",
    C: "Prefieres carcel efectiva y sin beneficios",
    D: "Buscas sanciones administrativas ejemplares",
    E: "Quieres sancion social y perdidas politicas",
  },
  Q5: {
    A: "Prioriza inversion en infraestructura vial",
    B: "Prefieres subsidios focalizados para vulnerables",
    C: "Apoyas incentivos para formalizar empresas",
    D: "Quieres reducir impuestos para dinamizar economia",
    E: "Buscas gasto social expansivo",
  },
  Q6: {
    A: "Defiendes independencia del Banco Central",
    B: "Apoyas credito barato para pymes",
    C: "Prefieres promover inversion extranjera",
    D: "Quieres proteccion a industria nacional",
    E: "Respaldas control de precios en basicos",
  },
  Q7: {
    A: "Prioriza diversificacion productiva",
    B: "Prefieres apertura comercial amplia",
    C: "Apoyas encadenamientos locales con mineria",
    D: "Quieres priorizar compras publicas locales",
    E: "Buscas nacionalizar sectores estrategicos",
  },
  Q8: {
    A: "Prefieres estabilidad tributaria para inversion",
    B: "Quieres impuestos mas progresivos",
    C: "Apoyas simplificar tributos para pymes",
    D: "Buscas impuestos verdes para contaminar",
    E: "Favoreces reduccion general de impuestos",
  },
  Q9: {
    A: "Quieres ampliar seguro universal de salud",
    B: "Prefieres alianzas publico privadas en salud",
    C: "Apoyas telemedicina y digitalizacion",
    D: "Prioriza infraestructura hospitalaria regional",
    E: "Favoreces medicina comunitaria preventiva",
  },
  Q10: {
    A: "Apoyas aumentar salario docente",
    B: "Prefieres becas y creditos para estudiantes",
    C: "Quieres educacion tecnica ligada a empresas",
    D: "Buscas curriculo con enfoque regional",
    E: "Prioriza educacion civica y valores",
  },
  Q11: {
    A: "Favoreces regulacion firme de universidades",
    B: "Prefieres autonomia universitaria plena",
    C: "Apoyas cierre de instituciones de baja calidad",
    D: "Buscas acreditar carreras con empleabilidad",
    E: "Quieres mas inversion publica en ciencia",
  },
  Q12: {
    A: "Prefieres seguros agrarios subsidiados",
    B: "Apoyas tecnologia y riego para el agro",
    C: "Quieres compras estatales a productores locales",
    D: "Buscas abrir mercados de exportacion",
    E: "Favoreces formalizacion con asistencia tecnica",
  },
  Q13: {
    A: "Buscas mano dura contra crimen organizado",
    B: "Prefieres prevencion y reinsercion",
    C: "Apoyas mayor presupuesto policial",
    D: "Quieres cooperacion internacional en seguridad",
    E: "Favoreces regulacion de armas mas estricta",
  },
  Q14: {
    A: "Prioriza proteccion de bosques y rios",
    B: "Apoyas transicion a energias limpias",
    C: "Prefieres incentivos verdes a empresas",
    D: "Buscas sanciones fuertes a contaminadores",
    E: "Quieres equilibrio entre inversion y ambiente",
  },
  Q15: {
    A: "Favoreces descentralizacion fiscal",
    B: "Prefieres fortalecimiento de gobiernos locales",
    C: "Apoyas gobiernos regionales con mas competencias",
    D: "Quieres recentralizar proyectos clave",
    E: "Buscas alianzas publico privadas para regiones",
  },
  Q16: {
    A: "Prefieres politicas de vivienda social",
    B: "Apoyas programas de alquiler seguro",
    C: "Quieres credito hipotecario barato",
    D: "Favoreces urbanismo orientado al transporte",
    E: "Buscas formalizar barrios populares",
  },
  Q17: {
    A: "Apoyas igualdad de genero en gabinete",
    B: "Prefieres cuotas flexibles con meritocracia",
    C: "Quieres politicas especificas contra violencia",
    D: "Favoreces educacion en igualdad desde escuelas",
    E: "Buscas incentivos para empresas inclusivas",
  },
  Q18: {
    A: "Apoyas derechos de comunidades indigenas",
    B: "Prefieres consulta previa estricta",
    C: "Quieres desarrollo con acuerdos vinculantes",
    D: "Buscas compensaciones justas por recursos",
    E: "Favoreces autonomia territorial",
  },
  Q19: {
    A: "Prefieres fortalecer instituciones democraticas",
    B: "Apoyas reformas politicas graduales",
    C: "Quieres referendum para temas clave",
    D: "Favoreces reeleccion con limites claros",
    E: "Buscas nueva constitucion participativa",
  },
  Q20: {
    A: "Apoyas libertad de prensa sin restricciones",
    B: "Prefieres regulacion ligera de contenidos",
    C: "Quieres combate frontal a desinformacion",
    D: "Favoreces medios publicos fuertes",
    E: "Buscas impuestos especiales a grandes medios",
  },
};

export const mapOptionToAnswer = (option: OptionKey): AnswerKey =>
  ANSWER_VALUE_MAP[option];
export const questionOrder = QUESTION_ORDER;
export const sections = SECTION_QUESTIONS;
export const versions = VERSION;

export const calculateScores = (
  userAnswers: UserAnswers,
  candidates: CandidatePosition[]
): RecommendationResult => {
  const numericUserAnswers = normalizeUserAnswers(userAnswers);
  const perCandidateQuestionScores: Record<
    string,
    Record<QuestionId, number>
  > = {};

  const candidatesWithScores = candidates.map((candidate) => {
    const sectionTotals: Record<SectionId, number> = {
      S1: 0,
      S2: 0,
      S3: 0,
      S4: 0,
      S5: 0,
    };
    const perQuestionScores = {} as Record<QuestionId, number>;

    QUESTION_ORDER.forEach((questionId, index) => {
      const userAnswer = numericUserAnswers[questionId];
      const candidateAnswer = candidate.answers[index];
      const distance = Math.abs(userAnswer - candidateAnswer);
      const score = 1 - distance / 4;
      perQuestionScores[questionId] = score;

      const sectionId = QUESTION_TO_SECTION[questionId];
      sectionTotals[sectionId] += score;
    });

    perCandidateQuestionScores[candidate.id] = perQuestionScores;

    const scoresBySection = (Object.keys(sectionTotals) as SectionId[]).reduce<
      Record<SectionId, number>
    >(
      (acc, sectionId) => {
        acc[sectionId] = roundTwoDecimals(
          (sectionTotals[sectionId] / QUESTIONS_PER_SECTION) * 100
        );
        return acc;
      },
      {} as Record<SectionId, number>
    );

    const scoreTotal = (Object.keys(sectionTotals) as SectionId[]).reduce(
      (acc, sectionId) => {
        const sectionScore = sectionTotals[sectionId] / QUESTIONS_PER_SECTION;
        return acc + sectionScore * SECTION_WEIGHT;
      },
      0
    );

    const explanations: Record<SectionId, string[]> = {
      S1: [],
      S2: [],
      S3: [],
      S4: [],
      S5: [],
    };

    return {
      id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      photoUrl: candidate.photoUrl,
      scoreTotal: roundTwoDecimals(scoreTotal * 100),
      scoresBySection,
      explanations,
    };
  });

  const rankedCandidates = [...candidatesWithScores].sort(
    (a, b) => b.scoreTotal - a.scoreTotal
  );

  const winner = rankedCandidates[0];

  if (winner) {
    const perQuestionScores = perCandidateQuestionScores[winner.id];
    winner.explanations = buildSectionExplanations(
      perQuestionScores,
      userAnswers
    );
  }

  return {
    candidates: rankedCandidates.slice(0, 4),
    version: VERSION,
  };
};

export const extractRequestBody = async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}));
  return body ?? {};
};
