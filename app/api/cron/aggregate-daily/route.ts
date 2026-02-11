import { NextResponse } from "next/server";
import { MOCK_EVENTS_DB } from "@/lib/analytics/mock-db";
import { calculateTrendingTopics } from "@/lib/analytics/aggregation";

// Vercel Cron Secret for security
const CRON_SECRET = process.env.CRON_SECRET || "development_secret";

export async function GET(request: Request) {
  // 1. Authorization Check
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Perform Aggregation
  // In a real app, this would:
  // - Fetch all un-aggregated events from DB
  // - Calculate stats per district
  // - Upsert into a "DailyStats" table

  console.log("Starting Daily Aggregation Job...");

  const districts = [
    "Carabayllo",
    "San Juan de Lurigancho",
    "Lince",
    "Miraflores",
  ];
  const results = {};

  districts.forEach((district) => {
    const dailyTopics = calculateTrendingTopics(MOCK_EVENTS_DB, district, 1); // Last 24h
    results[district] = dailyTopics;

    // Simulate DB Save
    console.log(
      `[AGGREGATION] Saving stats for ${district}:`,
      dailyTopics.length,
      "topics found."
    );
  });

  // 3. Return Success
  return NextResponse.json({
    success: true,
    processed_districts: districts.length,
    timestamp: new Date().toISOString(),
    // Returning results for debug visibility in this MVP
    debug_results: results,
  });
}
