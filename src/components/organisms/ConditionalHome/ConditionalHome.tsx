import { createClient } from "@/lib/supabase/server";
import { LandingContent } from "@/components/organisms/LandingContent";
import {
  DashboardLayout,
  DashboardContent,
} from "@/components/organisms/Dashboard";

/**
 * ConditionalHome Component (Server Component)
 *
 * Renders Dashboard for authenticated users and Landing for visitors.
 * Auth check happens on the server, ensuring 0ms loading flicker.
 */
export async function ConditionalHome() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    );
  }

  return <LandingContent />;
}
