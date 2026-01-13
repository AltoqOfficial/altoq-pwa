// lib/supabase-postgres-helper.ts
import type { PostgrestError } from "@supabase/supabase-js";
import type { ApiError } from "@/types";

/**
 * Convierte un PostgrestError en ApiError uniforme.
 */
export function mapPostgres(error: PostgrestError, status?: number): ApiError {
  return {
    message: error.message,
    code: error.code,
    status: status ?? 500,
    reasons: error.details ? [error.details] : [],
  };
}
