import type { Metadata, Viewport } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { inter, macondo } from "@/lib/fuentes";
import { t } from "@/lib/i18n";

const d = t("es").meta;

export const metadata: Metadata = {
  metadataBase: new URL("https://tonaltlan.com"),
  title: d.title,
  description: d.description,
  keywords: d.keywords,
  openGraph: {
    title: d.title,
    description: d.ogDescription,
    type: "website",
    locale: "es_MX",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1d19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${macondo.variable}`}>
      <body className="bg-selva-900 font-sans text-selva-100 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer lang="es" />
      </body>
    </html>
  );
}
