// src/hooks/useAnalytics.ts
"use client";

import { AnalyticsEvent } from "@/lib/analytics/events";
import { logEvent } from "@/actions/logEvent";
import { useSearchParams } from "next/navigation";

/**
 * Hook to track business events.
 * Currently logs to console (MVP). In production, this would dispatch to PostHog/Supabase.
 */
export const useAnalytics = () => {
  const searchParams = useSearchParams();
  const district = searchParams.get("distrito"); // Capture ?distrito=carabayllo

  const track = (event: AnalyticsEvent) => {
    // Inject district if present
    const eventWithContext = {
      ...event,
      properties: {
        ...event.properties,
        ...(district && { district }),
      },
      // Note: We need to extend AnalyticsEvent type to allow 'district' in properties
      // For now, we'll cast to any to bypass TS check until we update the type definition
    } as AnalyticsEvent;

    // 1. Dev Logging
    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed(`[Altoq Intelligence] 📊 ${event.name}`);
      console.dir(eventWithContext.properties);
      console.groupEnd();
    }

    // 2. Production Dispatch
    logEvent(eventWithContext).catch((err) => {
      console.error("Failed to log event:", err);
    });
  };

  return { track };
};
