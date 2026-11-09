import type { Config } from "tailwindcss";

const config: Config = {
  // Los efectos hover solo aplican en dispositivos con puntero fino (no en touch).
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
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
      // Curvas de animacion (skill emil-design-eng): ease-out fuerte para UI.
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.23, 1, 0.32, 1)",
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
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
