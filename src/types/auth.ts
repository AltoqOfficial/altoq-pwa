// types/auth.ts
export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type LogoutSuccessResponse = {
  message: string;
};

export type ResetPasswordBody = {
  email: string;
  redirectTo?: string;
};

export type ResetPasswordSuccessResponse = { message: string };

export type SignUpRequest = {
  email: string;
  password: string;
  fullName: string;
  ageRangeId: number;
  motivationId: number;
};

export type SignUpResponse = {
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type SignupSuccessResponse = {
  user: {
    id: string;
    email: string;
  };
};

export type UpdatePasswordBody = {
  newPassword: string;
};

export type UpdatePasswordSuccessResponse = {
  message: string;
};
