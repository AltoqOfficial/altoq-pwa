import mappingData from "@/data/questionnaire/mapping.json";
import questionnaireData from "@/data/questionnaire/questionnaire.json";

// Import Candidate Data
import alfonsoLopezChau from "@/data/candidates/alfonsoLopezChau.json";
import carlosEspa from "@/data/candidates/carlosEspa.json";
import cesarAcuna from "@/data/candidates/cesarAcuna.json";
import enriqueValderrama from "@/data/candidates/enriqueValderrama.json";
import fernandoOlivera from "@/data/candidates/fernandoOlivera.json";
import georgeForsyth from "@/data/candidates/georgeForsyth.json";
import keikoFujimori from "@/data/candidates/keikoFujimori.json";
import marioVizcarra from "@/data/candidates/marioVizcarra.json";
import rafaelLopez from "@/data/candidates/rafaelLopez.json";
import robertoSanchez from "@/data/candidates/robertoSanchez.json";
import vladimirCerron from "@/data/candidates/vladimirCerron.json";
import yonhyLescano from "@/data/candidates/yonhyLescano.json";

// Shared Interfaces
export interface RecommendationReason {
  id: number;
  title: string;
  match: number; // Score percentage for this topic (simplified for now as binary or weight)
  description: string;
  category: string;
  explanation?: string;
  sourceUrl?: string; // URL of the government plan
}

export interface MatchCandidate {
  id: string; // Plan ID stringified
  name: string;
  fullName: string;
  image: string;
  score: number;
  party: string;
  partyLogo: string;
  ideology: string;
  reasons: RecommendationReason[];
  education?: string;
  profession?: string;
  politicalExperience?: string;
  controversies?: number;
  intencionVoto?: number;
}

// Tag mapping to human readable categories
const CATEGORY_MAP: Record<string, string> = {
  corrupcion: "Corrupción",
  reforma_estado: "Reforma del Estado",
  seguridad: "Seguridad",
  economia: "Economía",
  salud: "Salud",
  educacion: "Educación",
  ambiente: "Ambiente",
  derechos: "Derechos",
  social: "Social",
  // default fallback
};

// Maps for Asset normalization
const PARTY_LOGOS: Record<string, string> = {
  "Alianza para el Progreso": "/partidos/app.webp",
  "Partido Aprista Peruano": "/partidos/apra.webp",
  "Avanza País": "/partidos/avanzapais.webp",
  "Fuerza Popular": "/partidos/fuerzaPopularIconr.webp",
  "Partido Morado": "/partidos/partidomorado.webp",
  "Perú Libre": "/partidos/perulibre.webp",
  "Perú Primero": "/partidos/peruprimero.webp",
  "Renovación Popular": "/partidos/rp.webp",
  "Partido Democrático Somos Perú": "/partidos/somosperu.webp",
  "Partido Demócrata Verde": "/partidos/verde.webp",
  "Fe en el Perú": "/partidos/fe.webp",
  "Ahora Nación": "/partidos/ahoranacion.webp",
  "País para Todos": "/partidos/ppt.webp",
  // Add more heuristic mappings if needed or default
};

const CANDIDATE_IMAGES: Record<string, string> = {
  "César Acuña Peralta": "/candidatos/cesar-acuna.webp",
  "Keiko Sofía Fujimori Higuchi": "/candidatos/keiko-fujimori.webp",
  "Rafael Bernardo López-Aliaga Cazorla":
    "/candidatos/rafael-lopez-aliaga.webp",
  "Vladimir Roy Cerrón Rojas": "/candidatos/vladimir-cerron.webp",
  "Yonhy Lescano Ancieta": "/candidatos/yonhy-lescano.webp",
  "George Patrick Forsyth Sommer": "/candidatos/george-forsyth.webp",
  "Roberto Helbert Sanchez Palomino": "/candidatos/roberto-sanchez.webp",
  "Mario Enrique Vizcarra Cornejo": "/candidatos/mario-vizcarra.webp",
  "Luis Fernando Olivera Vega": "/candidatos/fernando-olivera.webp",
  "Alfonso Carlos Espá Garcés-Alvear": "/candidatos/carlos-espa.webp",
  "Pablo Alfonso López-Chau Nava": "/candidatos/alfonso-lopez-chau.webp",
  "Pitter Enrique Valderrama Peña": "/candidatos/enrique-valderrama.webp",
  "Carlos Gonsalo Álvarez Loayza": "/candidatos/carlos-alvarez.webp",
  "Napoleón Becerra García": "/images/volunteer-placeholder-vertical.png",
  "Napoleón Becerra": "/images/volunteer-placeholder-vertical.png",

  // Default fallback
};

const SHORT_NAME_OVERRIDES: Record<string, string> = {
  "Ahora Nación": "ALFONSO LÓPEZ CHAU",
  "Fuerza Popular": "KEIKO FUJIMORI",
  "Partido Morado": "MESÍAS GUEVARA",
  "Renovación Popular": "RAFAEL LÓPEZ ALIAGA",
  "Avanza País": "JOSÉ WILLIAMS",
  "Alianza para el Progreso": "CÉSAR ACUÑA",
  "Juntos por el Perú": "ROBERTO SÁNCHEZ",
  "Perú Libre": "VLADIMIR CERRÓN",
  "Acción Popular": "JULIO CHÁVEZ",
  "Partido Democrático Somos Perú": "GEORGE FORSYTH",
  "Podemos Perú": "JOSÉ LUNA GÁLVEZ",
  "Perú Primero": "MARIO VIZCARRA",
  "Libertad Popular": "RAFAEL BELAÚNDE",
  "Partido Aprista Peruano": "ENRIQUE VALDERRAMA",
  "Fuerza y Libertad": "FIORELLA MOLINELLI",
  "Integridad Democrática": "WOLFGANG GROZO",
  "Partido Demócrata Verde": "ÁLEX GONZALES",
  "Fe en el Perú": "ÁLVARO PAZ DE LA BARRA",
  "Frente de la Esperanza": "FERNANDO OLIVERA",
  "Cooperación Popular": "YONHY LESCANO",
  SíCreo: "CARLOS ESPÁ",
  Progresemos: "PAUL JAIMES",
  "Partido Patriótico del Perú": "HERBERT CALLER",
  "Partido Político Prin": "WALTER CHIRINOS",
  "Partido de los Trabajadores y Emprendedores": "NAPOLEÓN BECERRA",
  "Partido del Buen Gobierno": "JORGE NIETO",
  "País para Todos": "CARLOS ÁLVAREZ",
  "Perú Acción": "FRANCISCO DIEZ-CANSECO",
  "Perú Moderno": "CARLOS JAICO",
  "Salvemos al Perú": "ANTONIO ORTIZ",
  "Alianza Electoral Venceremos": "RONALD ATENCIO",
  "Alianza Unidad Nacional": "ROBERTO CHIABRA",
  "Partido Demócrata Unido Perú": "CHARLIE CARRASCO",
};

// Flatten candidates to extract ideologies by party
// (assuming one main candidate per party or shared ideology per party)
const CANDIDATE_FILES = [
  alfonsoLopezChau,
  carlosEspa,
  cesarAcuna,
  enriqueValderrama,
  fernandoOlivera,
  georgeForsyth,
  keikoFujimori,
  marioVizcarra,
  rafaelLopez,
  robertoSanchez,
  vladimirCerron,
  yonhyLescano,
];

// Dynamically build IDEOLOGIES map from JSON files
// Normalize party names to matching "Base Name" to avoid mismatch with "Organization" in mapping
const normalizePartyName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/partido político\s+/g, "") // Remove 'partido político' prefix
    .split("-")[0] // Remove suffixes like ' - AN'
    .trim();
};

const IDEOLOGIES: Record<string, string> = {};
const SHORT_NAMES: Record<string, string> = {};
const EDUCATION: Record<string, string> = {};
const PROFESSION: Record<string, string> = {};
const EXPERIENCE: Record<string, string> = {};
const CONTROVERSIES: Record<string, number> = {};
const INTENCION_VOTO: Record<string, number> = {};

CANDIDATE_FILES.forEach((c) => {
  if (c.party) {
    const key = normalizePartyName(c.party);

    if (c.ideologiaPolitica?.posicion?.value) {
      IDEOLOGIES[key] = c.ideologiaPolitica.posicion.value;
    }
    if (c.shortName) {
      SHORT_NAMES[key] = c.shortName;
    }

    // Extract Education (Highest level)
    if (c.perfilGeneral?.nivelEducativo?.value) {
      const edu = Array.isArray(c.perfilGeneral.nivelEducativo.value)
        ? c.perfilGeneral.nivelEducativo.value[
            c.perfilGeneral.nivelEducativo.value.length - 1
          ] // Take last (usually highest)
        : c.perfilGeneral.nivelEducativo.value;
      if (edu && typeof edu === "string") {
        // Simplify common long names
        EDUCATION[key] = edu
          .replace("Bachiller en ", "Bach. ")
          .replace("Maestro en ", "Mg. ")
          .replace("Doctor en ", "Dr. ")
          .split("(")[0] // Remove year/uni info for brevity
          .trim();
      }
    }

    // Extract Profession
    if (c.perfilGeneral?.profesion?.value) {
      const prof = Array.isArray(c.perfilGeneral.profesion.value)
        ? c.perfilGeneral.profesion.value[0]
        : c.perfilGeneral.profesion.value;
      if (prof) PROFESSION[key] = prof;
    }

    // Extract Experience (Party changes)
    if (c.perfilGeneral?.cambiosDePartido?.value) {
      EXPERIENCE[key] =
        `${c.perfilGeneral.cambiosDePartido.value} Cambios de Partido`;
    }

    // Extract Controversies Count (Cast to any to handle optional optional field)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const candidateAny = c as any;
    let totalIssues = 0;
    if (candidateAny.controversias) {
      if (candidateAny.controversias.procesosJudiciales) {
        totalIssues += candidateAny.controversias.procesosJudiciales.length;
      }
      if (candidateAny.controversias.observaciones) {
        totalIssues += candidateAny.controversias.observaciones.length;
      }
      if (candidateAny.controversias.procesosArchivados) {
        totalIssues += candidateAny.controversias.procesosArchivados.length;
      }
    }
    CONTROVERSIES[key] = totalIssues;

    // Extract Voting Intention (Max value from Perception)
    if (candidateAny.percepcionPublica?.intencionVoto?.max) {
      INTENCION_VOTO[key] = candidateAny.percepcionPublica.intencionVoto.max;
    }
  }
});

// Pre-index mappings by Question ID for O(1) lookup
const MAPPINGS_BY_ID = new Map<
  number,
  (typeof mappingData.question_option_mappings)[0]
>();
mappingData.question_option_mappings.forEach((m) =>
  MAPPINGS_BY_ID.set(m.question_id, m)
);

const TOTAL_QUESTIONS = 20;

export const calculatePoliticalMatch = (
  responses: Record<string, string>
): MatchCandidate[] => {
  const plans = mappingData.plans;
  const questions = questionnaireData.sections.flatMap((s) => s.questions);

  // Initialize scores
  const candidateScores: Record<
    number,
    {
      score: number;
      reasons: RecommendationReason[];
      matchedQuestions: number;
    }
  > = {};

  plans.forEach((plan) => {
    candidateScores[plan.plan_id] = {
      score: 0,
      reasons: [],
      matchedQuestions: 0,
    };
  });

  // Calculate scores
  Object.entries(responses).forEach(([questionId, answerValue]) => {
    if (!answerValue) return;

    // Parse numeric ID if possible (e.g. "Q1" -> 1)
    const qIdNum = parseInt(questionId.replace("Q", ""), 10);

    // Find mapping for this question
    // Find mapping for this question (Optimized lookup)
    const qMapping = MAPPINGS_BY_ID.get(qIdNum);
    if (!qMapping) return;

    // Find option mapping
    const optionMapping = qMapping.option_mappings.find(
      (om) => om.option_key === answerValue
    );
    if (!optionMapping) return;

    // Find question for "Reason" metadata
    const question = questions.find((q) => q.id === questionId);
    const questionText = question?.text || "Tema de coincidencia";

    // Determine category from tags
    const firstTag = question?.tags?.[0] || "general";
    const categoryLabel =
      CATEGORY_MAP[firstTag] ||
      firstTag.charAt(0).toUpperCase() + firstTag.slice(1);

    // Process evidences
    optionMapping.evidences.forEach((evidence) => {
      const planScore = candidateScores[evidence.plan_id];
      const planInfo = plans.find((p) => p.plan_id === evidence.plan_id);

      if (planScore) {
        planScore.score += 1;
        planScore.matchedQuestions += 1; // Track matches

        // Add reason (deduplicate if needed, but here simple push)
        // We only show top reasons usually
        planScore.reasons.push({
          id: evidence.plan_id, // reason ID not strictly used
          title: evidence.label || questionText, // Use specific label or fallback to question
          match: 100, // Binary match for this specific point
          description: evidence.summary,
          category: categoryLabel,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          explanation: (evidence as any).explanation,
          sourceUrl: planInfo?.url,
        });
      }
    });
  });

  // Calculate percentages and format result
  // Total questions answered with mappings could be the denominator, or total questions in questionnaire.
  // For a "Match" usually it's matches / total_questions.

  const results: MatchCandidate[] = plans.map((plan) => {
    const stats = candidateScores[plan.plan_id];
    const matchPercentage = (stats.score / TOTAL_QUESTIONS) * 100;
    // Or use totalQuestions dynamic if user skips? But we require all.
    // There are 20 questions in the new JSON.

    const normalizedParty = normalizePartyName(plan.organization);

    // Assuming sortedReasons should be stats.reasons, as no sorting logic was provided for it.
    const sortedReasons = stats.reasons;

    const shortName =
      SHORT_NAME_OVERRIDES[plan.organization] ||
      SHORT_NAMES[normalizedParty] ||
      plan.candidate_display_name;

    return {
      id: plan.plan_id.toString(),
      name: shortName,
      fullName: plan.candidate_display_name,
      party: plan.organization,
      image:
        CANDIDATE_IMAGES[plan.candidate_display_name] ||
        "/candidatos/placeholder.webp",
      partyLogo: PARTY_LOGOS[plan.organization] || "/partidos/placeholder.webp",
      score: Math.round(matchPercentage),
      ideology: IDEOLOGIES[normalizedParty] || "SIN DEFINIR",
      education: EDUCATION[normalizedParty],
      profession: PROFESSION[normalizedParty],
      politicalExperience: EXPERIENCE[normalizedParty],
      controversies: CONTROVERSIES[normalizedParty] || 0,
      intencionVoto: INTENCION_VOTO[normalizedParty] || 2,
      reasons: sortedReasons,
    };
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
};
