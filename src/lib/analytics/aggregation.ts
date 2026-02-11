import { MOCK_EVENTS_DB } from "./mock-db";
import { AnalyticsEvent } from "./events";

export interface TrendingTopic {
  name: string;
  value: number; // Count or Relevance Score
  growth: number; // Percentage growth vs previous period
  sentiment: "positive" | "neutral" | "negative";
}

/**
 * Data Scientist: "Trending Topics" Algorithm.
 * simple frequency count + growth weighting.
 */
export function calculateTrendingTopics(
  events: AnalyticsEvent[],
  district: string,
  days: number = 7
): TrendingTopic[] {
  // 1. Filter by District & Time Range
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const relevantEvents = events.filter((e) => {
    const isDistrict =
      e.properties?.district === district || district === "Todos";
    // Mock timestamp check if valid, else assume recent
    const evtDate = e.properties?.timestamp
      ? new Date(e.properties.timestamp)
      : new Date();
    return isDistrict && evtDate >= cutoffDate;
  });

  // 2. Frequency Count
  const topicCounts: Record<string, number> = {};
  relevantEvents.forEach((e) => {
    if (e.name === "question_answered" && e.properties?.topic) {
      const topic = e.properties.topic;
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    }
  });

  // 3. Transform to Array & Sort
  return Object.entries(topicCounts)
    .map(([name, value]) => ({
      name,
      value,
      growth: Math.floor(Math.random() * 20), // Mock growth
      sentiment: "negative" as const, // Default, or infer from event properties if we aggregated sentiment
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5
}

// Custom Insight logic for Demo
const DEMO_INSIGHTS: Record<string, string> = {
  Carabayllo:
    "El 65% de las interacciones sobre 'Obras Públicas' son negativas. Oportunidad: Una propuesta de infraestructura tiene alta receptividad.",
  Trujillo:
    "El 78% de la juventud en Trujillo demanda 'Becas Universitarias'. Alineación potencial: 92% con la plataforma de Educación.",
  default:
    "El 78% de los vecinos muestran incertidumbre sobre las propuestas de seguridad, mencionando 'Cámaras' como palabra clave faltante.",
};

export function getDashboardData(district: string) {
  const topics = calculateTrendingTopics(MOCK_EVENTS_DB, district, 7);

  // Mock engagement trend
  const trends = [
    { day: "Lun", interactions: Math.floor(Math.random() * 200) + 100 },
    { day: "Mar", interactions: Math.floor(Math.random() * 200) + 120 },
    { day: "Mié", interactions: Math.floor(Math.random() * 200) + 150 },
    { day: "Jue", interactions: Math.floor(Math.random() * 200) + 140 },
    { day: "Vie", interactions: Math.floor(Math.random() * 200) + 200 },
    { day: "Sáb", interactions: Math.floor(Math.random() * 200) + 250 },
    { day: "Dom", interactions: Math.floor(Math.random() * 200) + 220 },
  ];

  const insight = DEMO_INSIGHTS[district] || DEMO_INSIGHTS["default"];

  return { topics, trends, insight };
}
