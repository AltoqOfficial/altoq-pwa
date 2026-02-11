// src/lib/analytics/events.ts

/**
 * Altoq Intelligence - B2B Data Schema
 *
 * This schema defines the "Insights" we sell.
 * PRIVACY RULE: No PII (Personally Identifiable Information) allowed.
 * We track "What" is happening, not "Who" is doing it.
 */

export type AnalyticsEvent =
  | {
      name: "page_view";
      properties: {
        path: string;
        region?: string;
        district?: string; // e.g. "carabayllo"
        timestamp?: string;
      };
    }
  | {
      name: "match_started";
      properties: {
        source: "home_hero" | "nav" | "whatsapp_link";
        district?: string;
        timestamp?: string;
      };
    }
  | {
      name: "question_answered";
      properties: {
        questionId: string;
        topic: string; // e.g., "Economy", "Seguridad Ciudadana"
        answerValue: string; // "A" | "B" | "C" | "D" | "E"
        district?: string;
        sentiment?: "positive" | "neutral" | "negative"; // Derived or tagged
        timestamp?: string;
        // Note: We do NOT track the user ID here to decouple answers from identity
      };
    }
  | {
      name: "match_completed";
      properties: {
        topCandidateId: string;
        matchPercentage: number;
        timeToCompleteSeconds: number;
        district?: string;
        timestamp?: string;
      };
    }
  | {
      name: "result_shared";
      properties: {
        platform: "whatsapp" | "twitter" | "link";
        candidateId: string;
        district?: string;
        timestamp?: string;
      };
    }
  | {
      name: "rag_chat_query";
      properties: {
        topic_detected: string; // Classification of the query (e.g., "Mining")
        sentiment: "neutral" | "angry" | "curious"; // AI-detected sentiment
        // We log the *topic*, not the full text, to protect privacy in this specific B2B schema
        district?: string;
        timestamp?: string;
      };
    };

// Business Value Mapping
// - question_answered -> "What does Peru care about?" (Sold to Campaigns)
// - rag_chat_query -> "Emerging Risks" (Sold to Mining/Banks)
