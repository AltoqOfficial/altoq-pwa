import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Disable auto-detecting auth tokens from URL to prevent
    // unwanted password recovery flows on page load
    detectSessionInUrl: false,
    // Persist session in localStorage
    persistSession: true,
    // Auto refresh token before expiry
    autoRefreshToken: true,
  },
});
