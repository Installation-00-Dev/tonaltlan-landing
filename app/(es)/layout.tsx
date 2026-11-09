import type { Metadata, Viewport } from "next";
import { Inter, Macondo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fuente de titulos elegida por el creador del mundo.
const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tonaltlan - Juego de Rol de Mesa Mesoamericano",
  description:
    "Adéntrate en Tonaltlan, un juego de rol de mesa inspirado en la mitología y cultura mesoamericana. Forja tu destino entre pirámides, códices y dioses ancestrales.",
  keywords: [
    "Tonaltlan",
    "TTRPG",
    "juego de rol",
    "mesoamericano",
    "azteca",
    "juego de mesa",
  ],
  openGraph: {
    title: "Tonaltlan - Juego de Rol de Mesa Mesoamericano",
    description:
      "Forja tu destino en un mundo inspirado en la mitología mesoamericana.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1d19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${macondo.variable}`}>
      <body className="bg-selva-900 font-sans text-selva-100 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
