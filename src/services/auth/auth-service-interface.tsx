// services/auth-service-interface.ts
import type {
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";
import { UserResponse } from "@supabase/supabase-js";

export type AuthService = {
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (body: SignUpRequest) => Promise<SignUpResponse>;
  logout: () => Promise<void>;
  resetPassword: (
    email: string,
    redirectUrl?: string
  ) => Promise<Record<string, never>>;
  updatePassword: (newPassword: string) => Promise<UserResponse["data"]>;
};
