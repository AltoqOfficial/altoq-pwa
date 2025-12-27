// lib/supabase-helper.ts
import type { AuthError, PostgrestError } from "@supabase/supabase-js";

type SupabaseError = AuthError | PostgrestError | null;

export async function handleSupabase<T>(
  promise: Promise<{ data: T | null; error: SupabaseError }>
): Promise<T> {
  const { data, error } = await promise;
  if (error) throw error;
  return data ?? ({} as T);
}

export async function handleSupabaseVoid(
  promise: Promise<{ error: SupabaseError }>
): Promise<void> {
  const { error } = await promise;
  if (error) throw error;
}
