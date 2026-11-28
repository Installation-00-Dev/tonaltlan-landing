import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { inter, macondo } from "@/lib/fuentes";
import { IDIOMAS, IMAGEN_COMPARTIR, t, type Lang } from "@/lib/i18n";

/**
 * Base de los tres layouts raiz (app/(es), app/(en) y app/(fr)): metadatos del
 * sitio, icono, vista previa por defecto y el marco de cada pagina (barra y pie).
 * Cada layout solo elige el idioma; asi un cambio aqui aplica a los tres.
 */
export function metadataRaiz(lang: Lang): Metadata {
  const d = t(lang).meta;
  return {
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
      locale: IDIOMAS[lang].locale,
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
}

export const viewportRaiz: Viewport = {
  themeColor: "#0b1d19",
  width: "device-width",
  initialScale: 1,
};

export default function LayoutRaiz({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} ${macondo.variable}`}>
      <body className="bg-selva-900 font-sans text-selva-100 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
