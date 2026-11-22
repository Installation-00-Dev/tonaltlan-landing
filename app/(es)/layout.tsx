import type { Metadata, Viewport } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { inter, macondo } from "@/lib/fuentes";
import { IMAGEN_COMPARTIR, t } from "@/lib/i18n";

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
    siteName: "Tonaltlan",
    images: [{ url: IMAGEN_COMPARTIR, width: 1200, height: 630 }],
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: d.title,
    description: d.ogDescription,
    images: [IMAGEN_COMPARTIR],
  },
  icons: {
    icon: [
      { url: "/images/tonaltlan_logo_icono_48.webp", sizes: "48x48", type: "image/webp" },
      { url: "/images/tonaltlan_logo_icono_192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [{ url: "/images/tonaltlan_logo_icono_180.webp", sizes: "180x180", type: "image/webp" }],
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
