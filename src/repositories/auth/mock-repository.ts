import { AuthRepository } from "./auth-repository-interface";

export const mockAuthRepository: AuthRepository = {
  login: async (email, password) => {
    if (email === "test@test.com" && password === "1234") {
      return { user: { id: "mockUser", email } };
    }
    throw new Error("Invalid credentials");
  },
};
