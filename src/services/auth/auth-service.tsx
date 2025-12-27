// services/auth-service.ts
import { AuthRepository } from "@/repositories/auth/auth-repository-interface";
import { ProfileRepository } from "@/repositories/profile/profile-repository-interface";
import { AuthService } from "./auth-service-interface";
import { orElseThrow } from "@/lib/option";
import type { ApiError } from "@/types";
import type {
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";
import { Profile } from "@/types/profile";
import { MotivationRepository } from "@/repositories/motivation/motivation-repository-interface";
import { AgeRangeRepository } from "@/repositories/age-range/age-range-repository-interface";

export const createAuthService = (
  authRepository: AuthRepository,
  profileRepository: ProfileRepository,
  motivationRepository: MotivationRepository,
  ageRangeRepository: AgeRangeRepository
): AuthService => ({
  login: async (email: string, password: string): Promise<LoginResponse> => {
    if (!authRepository.login) {
      throw {
        message: "Login not implemented",
        status: 501,
        code: "login_not_implemented",
      } as ApiError;
    }

    // 1. Iniciar sesión en Supabase Auth
    const { user, session } = await authRepository.login(email, password);

    if (!user || !session) {
      throw {
        message: "Credenciales inválidas o sesión no creada",
        status: 401,
        code: "invalid_credentials",
      } as ApiError;
    }

    // 2. Respuesta tipada
    return {
      email: user.email!,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  },

  signup: async (body: SignUpRequest): Promise<SignUpResponse> => {
    if (!authRepository.signup) {
      throw {
        message: "Signup not implemented",
        status: 501,
        code: "signup_not_implemented",
      } as ApiError;
    }

    // Look up age range and motivation IDs based on provided codes
    const ageRange = await ageRangeRepository.findByCode(body.ageRangeCode);
    const motivation = await motivationRepository.findByCode(
      body.motivationCode
    );

    // Validate that both age range and motivation were found
    if (!ageRange || !motivation) {
      throw {
        message: "Rango de edad o motivación no válidos",
        status: 400,
        code: "invalid_age_range_or_motivation",
      };
    }

    // 1. Crear usuario en Supabase Auth
    const { user, session } = await authRepository.signup(
      body.email,
      body.password
    );

    if (!user) {
      throw {
        message: "No se pudo crear el usuario",
        status: 422,
        code: "user_creation_failed",
      };
    }

    const profile = Profile.create({
      id: user.id,
      fullName: body.fullName,
      ageRangeId: ageRange.id,
      motivationId: motivation.id,
    });

    const maybeProfile = await profileRepository.create(profile);

    // 3. Validar resultado con enfoque funcional
    orElseThrow(maybeProfile, () => ({
      message: "No se pudo crear el perfil",
      status: 422,
      code: "profile_creation_failed",
    }));

    // 4. Respuesta simplificada: solo email y tokens
    return {
      email: user.email!,
    };
  },

  logout: async () => {
    if (!authRepository.logout) {
      throw {
        message: "Logout not implemented",
        status: 501,
        code: "logout_not_implemented",
      } as ApiError;
    }
    return authRepository.logout();
  },

  resetPassword: async (email, redirectUrl = "https://altoqperu.com") => {
    if (!authRepository.resetPassword) {
      throw {
        message: "Reset password not implemented",
        status: 501,
        code: "reset_password_not_implemented",
      } as ApiError;
    }
    return authRepository.resetPassword(email, redirectUrl);
  },

  updatePassword: async (newPassword) => {
    if (!authRepository.updatePassword) {
      throw {
        message: "Update password not implemented",
        status: 501,
        code: "update_password_not_implemented",
      } as ApiError;
    }
    return authRepository.updatePassword(newPassword);
  },
});
