import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Greca from "@/components/ui/Greca";
import { inter, macondo } from "@/lib/fuentes";

/*
 * Pagina 404 de todo el sitio (GitHub Pages sirve out/404.html para cualquier
 * ruta que no existe, en cualquier idioma). No pasa por los layouts de cada
 * idioma, por eso trae su propio <html> y el mensaje en los tres idiomas.
 */
export const metadata: Metadata = {
  title: "404 - Tonaltlan",
  robots: { index: false },
};

const enlaces = [
  { href: "/", texto: "Ir al inicio", lang: "es" },
  { href: "/en/", texto: "Go to the home page", lang: "en" },
  { href: "/fr/", texto: "Aller à l'accueil", lang: "fr" },
];

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${inter.variable} ${macondo.variable}`}>
      <body className="bg-selva-900 font-sans text-selva-100 antialiased">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="w-full max-w-lg text-center">
            <a href="/" aria-label="Tonaltlan" className="inline-block rounded-lg">
              <Image src="/images/tonaltlan_logo_nav.webp" alt="Tonaltlan" width={480} height={226} priority className="mx-auto h-auto w-56" />
            </a>
            <h1 className="mt-10 font-display text-7xl text-jade-400">404</h1>
            <Greca className="mx-auto mt-6 w-40 text-oro-400/60" />
            <div className="mt-8 space-y-2 text-lg text-selva-200">
              <p lang="es">Esta página no existe.</p>
              <p lang="en" className="text-base text-selva-300">This page doesn&apos;t exist.</p>
              <p lang="fr" className="text-base text-selva-300">Cette page n&apos;existe pas.</p>
            </div>
            <nav className="mt-10 flex flex-col items-center gap-3">
              {enlaces.map((enlace, i) => (
                <a
                  key={enlace.href}
                  href={enlace.href}
                  lang={enlace.lang}
                  className={
                    i === 0
                      ? "inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
                      : "rounded-full px-4 py-2 text-sm font-medium text-selva-300 underline decoration-selva-600 underline-offset-4 transition-colors hover:text-jade-200"
                  }
                >
                  {enlace.texto}
                </a>
              ))}
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
