import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ff9696",
          500: "#f17272",
          600: "#e83233",
          700: "#b51c18",
        },
        neutral: {
          100: "#bababa",
          500: "#202020",
          900: "#0d0d0d",
        },
      },

      fontFamily: {
        sohneBreit: "var(--font-sohne-breit)",
        sohneSchmal: "var(--font-sohne-schmal)",
        kenyan: "var(--font-kenyan-coffee)",
      },

      borderRadius: {
        xl: "1rem",
      },

      boxShadow: {
        card: "0 20px 40px -24px rgba(15, 15, 15, 0.15)",
      },
    },
  },

  plugins: [],
} satisfies Config;
