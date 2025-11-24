import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  // Next.js Core Web Vitals rules
  ...nextVitals,
  
  // TypeScript-specific rules
  ...nextTs,
  
  // Prettier integration - disables ESLint formatting rules that conflict with Prettier
  prettier,
  
  // Custom rules
  {
    rules: {
      // You can override or disable specific rules here
      // Example: 'react/no-unescaped-entities': 'off',
    },
  },
  
  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    
    // Additional custom ignores:
    "node_modules/**",
    "*.config.js",
    "*.config.mjs",
    "*.config.ts",
    ".turbo/**",
    "coverage/**",
    "dist/**",
    "public/sw.js",
    "public/workbox-*.js",
  ]),
]);

export default eslintConfig;