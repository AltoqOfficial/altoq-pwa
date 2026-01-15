import { supabase } from "@/lib/supabase";
import { AuthRepository } from "./auth-repository-interface";
import { handleSupabase, handleSupabaseVoid } from "@/lib/supabase-auth-helper";
import type {
  AuthTokenResponsePassword,
  AuthResponse,
  UserResponse,
} from "@supabase/supabase-js";

export const supabaseAuthRepository: AuthRepository = {
  login: async (email, password) =>
    handleSupabase<AuthTokenResponsePassword["data"]>(
      supabase.auth.signInWithPassword({ email, password })
    ),

  signup: async (email, password, emailRedirectTo?) =>
    handleSupabase<AuthResponse["data"]>(
      supabase.auth.signUp({
        email,
        password,
        options: emailRedirectTo ? { emailRedirectTo } : undefined,
      })
    ),

  logout: async (): Promise<void> =>
    handleSupabaseVoid(supabase.auth.signOut()),

  resetPassword: async (email, redirectUrl) =>
    handleSupabase<Record<string, never>>(
      supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl })
    ),

  updatePassword: async (newPassword) =>
    handleSupabase<UserResponse["data"]>(
      supabase.auth.updateUser({ password: newPassword })
    ),
};
