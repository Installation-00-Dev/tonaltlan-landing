import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tonaltlan - Juego de Rol de Mesa Mesoamericano",
  description:
    "Adentrate en Tonaltlan, un juego de rol de mesa inspirado en la mitologia y cultura mesoamericana. Forja tu destino entre piramides, codices y dioses ancestrales.",
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
      "Forja tu destino en un mundo inspirado en la mitologia mesoamericana.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
