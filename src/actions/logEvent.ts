"use server";

import { AnalyticsEvent } from "@/lib/analytics/events";

// Mock DB for now (We will add Supabase later)
export async function logEvent(event: AnalyticsEvent) {
  // 1. In a real app, we would derive GeoIP region here from headers()
  // const headersList = headers();
  // const ip = headersList.get("x-forwarded-for");

  // 2. Log to Server Console (This simulates "saving" the data)
  console.log(`[SERVER_LOG] 📡 Event Received: ${event.name}`);
  console.dir(event.properties, { depth: null });

  // 3. Simulate processing specific to B2B needs
  if (event.name === "question_answered") {
    // Here we would save to: Table("answers").insert({ ... })
    // If user has ?district=carabayllo in URL, it should be passed here ideally or handled in frontend state
  }

  return { success: true };
}
