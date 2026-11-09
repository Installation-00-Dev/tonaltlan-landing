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
      // Paleta Quetzal (sale del logo): selva (fondos y texto), jade (titulos),
      // turquesa (etiquetas y detalles) y oro (accion principal).
      colors: {
        selva: {
          50: "#f3f9f5",
          100: "#ecf5ef",
          200: "#d3e6db",
          300: "#a9c9bb",
          400: "#86ab9b",
          500: "#6a8f7f",
          600: "#3f6357",
          700: "#24443a",
          800: "#123029",
          900: "#0b1d19",
          950: "#061210",
        },
        jade: {
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        turquesa: {
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        oro: {
          100: "#fdf3d6",
          200: "#fbe3a0",
          300: "#f8cf63",
          400: "#f5b82e",
          500: "#e09c12",
          600: "#b97a0b",
        },
        // Tokens antiguos (paginas previas): apuntan a la paleta Quetzal.
        bg: "#0b1d19",
        background: "#0b1d19",
        foreground: "#ecf5ef",
        muted: "#a9c9bb",
        gold: {
          DEFAULT: "#f5b82e",
          light: "#f8cf63",
        },
        teal: {
          DEFAULT: "#38bdf8",
        },
        aqua: "#38bdf8",
        glass: {
          DEFAULT: "var(--glass)",
          border: "#24443a",
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
        // Macondo: titulos (solo peso 400; no usar font-bold/semibold con ella).
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
