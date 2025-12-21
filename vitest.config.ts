import { defineConfig } from "vitest/config";
import path from "path";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno desde .env.local y .env
  const env = loadEnv(mode, process.cwd(), "");

  return {
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./test/setupTests.ts"],
      include: ["src/**/*.{test,spec}.{ts,tsx,js,jsx}"],
      env: {
        // Pasar las variables de entorno a los tests
        NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_KEY: env.NEXT_PUBLIC_SUPABASE_KEY,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
