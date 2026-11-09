import { Inter, Macondo } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fuente de titulos elegida por el creador del mundo.
export const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
