import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        background: "var(--bg)",
        foreground: "var(--text)",
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold2)",
        },
        teal: {
          DEFAULT: "var(--teal)",
        },
        jade: "var(--jade)",
        aqua: "var(--aqua)",
        muted: "var(--muted)",
        glass: {
          DEFAULT: "var(--glass)",
          border: "var(--glass-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
