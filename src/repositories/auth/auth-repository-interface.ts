import type {
  AuthTokenResponsePassword,
  AuthResponse,
  UserResponse,
} from "@supabase/supabase-js";

export type AuthRepository = {
  login: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword["data"]>;
  signup?: (email: string, password: string) => Promise<AuthResponse["data"]>;
  logout?: () => Promise<void>;
  resetPassword?: (
    email: string,
    redirectUrl: string
  ) => Promise<Record<string, never>>;
  updatePassword?: (newPassword: string) => Promise<UserResponse["data"]>;
};
