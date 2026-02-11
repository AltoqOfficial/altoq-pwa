import { AnalyticsEvent } from "./events";

export const MOCK_EVENTS_DB: AnalyticsEvent[] = [
  // Generating some realistic looking data
  ...Array.from({ length: 150 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `q-${i}`,
      topic: "Seguridad Ciudadana",
      answerValue: "A",
      sentiment: "negative",
      district: "Carabayllo",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  ...Array.from({ length: 120 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `q-${i + 200}`,
      topic: "Corrupción",
      answerValue: "B",
      sentiment: "negative",
      district: "Carabayllo",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  ...Array.from({ length: 80 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `q-${i + 400}`,
      topic: "Limpieza Pública",
      answerValue: "C",
      sentiment: "neutral",
      district: "Carabayllo",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  ...Array.from({ length: 200 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `q-${i + 600}`,
      topic: "Seguridad Ciudadana", // High in SJL too
      answerValue: "A",
      sentiment: "negative",
      district: "San Juan de Lurigancho",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  ...Array.from({ length: 90 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `q-${i + 900}`,
      topic: "Transporte",
      answerValue: "D",
      sentiment: "negative",
      district: "San Juan de Lurigancho",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  // --- DEMO DATA: APP Specific Insights (Education & Infrastructure) ---
  ...Array.from({ length: 180 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `demo-edu-${i}`,
      topic: "Educación", // APP Key Pillar
      answerValue: "A",
      sentiment: "negative", // "Falta infraestructura"
      district: "Trujillo", // APP Stronghold
      timestamp: new Date(
        Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  ...Array.from({ length: 150 }).map((_, i) => ({
    name: "question_answered",
    properties: {
      questionId: `demo-infra-${i}`,
      topic: "Obras Públicas", // APP Key Pillar
      answerValue: "B",
      sentiment: "neutral", // "Esperando obras"
      district: "Carabayllo",
      timestamp: new Date(
        Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
  // Existing Data...
  ...Array.from({ length: 50 }).map((_, i) => ({
    name: "page_view",
    properties: {
      path: "/comparador",
      district: "Carabayllo",
      timestamp: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  })),
] as AnalyticsEvent[];
