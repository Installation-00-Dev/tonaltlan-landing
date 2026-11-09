"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { idiomaDeRuta, ruta, rutaEnOtroIdioma, t } from "@/lib/i18n";

// Rutas que cuentan como "dentro" de cada seccion para marcarla activa.
const sectionMatches: Record<string, string[]> = {
  "/mundo": ["/mundo"],
  "/explorar": ["/explorar", "/clases", "/especies", "/deidades", "/bestiario", "/monturas"],
  "/juega": ["/juega", "/afinidad"],
  "/galeria": ["/galeria"],
};

function normalize(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function isActive(pathname: string, href: string) {
  // Las rutas en ingles (/en/...) se comparan sin el prefijo.
  const current = normalize(pathname.replace(/^\/en(?=\/|$)/, "") || "/");
  return (sectionMatches[href] ?? [href]).some((base) => current === base || current.startsWith(`${base}/`));
}

export default function Navbar() {
  const pathname = usePathname();
  const lang = idiomaDeRuta(pathname);
  const d = t(lang).nav;
  const mainNav = [
    { label: d.mundo, base: "/mundo", href: ruta(lang, "/mundo/") },
    { label: d.compendio, base: "/explorar", href: ruta(lang, "/explorar/") },
    { label: d.juega, base: "/juega", href: ruta(lang, "/juega/") },
    { label: d.galeria, base: "/galeria", href: ruta(lang, "/galeria/") },
  ];
  const navCta = { label: d.cta, href: ruta(lang, "/afinidad/") };
  const otroIdioma = rutaEnOtroIdioma(pathname);
  const isHome = normalize(pathname) === "/" || normalize(pathname) === "/en";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(y > window.innerHeight * 0.55);
      // Se esconde al bajar (para leer) y reaparece al subir.
      if (y > 320 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // En inicio el logo grande del Hero ya da la bienvenida: el de la barra aparece al bajar.
  const showLogo = !isHome || pastHero || menuOpen;
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-200 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        solid
          ? "border-b border-oro-400/15 bg-selva-900/65 shadow-lg shadow-selva-950/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition duration-200 lg:px-8 ${
          solid ? "py-2" : "py-4"
        }`}
        aria-label={d.aria}
      >
        {/* Logo del producto */}
        <Link
          href={ruta(lang, "/")}
          aria-label={d.inicioAria}
          className={`flex shrink-0 items-center rounded-lg transition duration-500 ${
            showLogo ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          tabIndex={showLogo ? 0 : -1}
        >
          <Image
            src="/images/tonaltlan_logo_nav.webp"
            alt="Tonaltlan"
            width={480}
            height={226}
            priority
            className={`w-auto transition duration-200 ${solid ? "h-10" : "h-12 lg:h-14"}`}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center gap-1">
            {mainNav.map((link) => {
              const active = isActive(pathname, link.base);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      active ? "text-oro-300" : "text-selva-200 hover:text-oro-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px bg-oro-400 transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={otroIdioma}
            hrefLang={lang === "es" ? "en" : "es"}
            aria-label={d.otroIdiomaAria}
            className="ml-4 inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full px-3 text-sm font-semibold text-selva-200 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
          >
            {d.otroIdioma}
          </a>
          <Link
            href={navCta.href}
            className="ml-2 inline-flex items-center rounded-full bg-oro-400 px-5 py-2.5 text-sm font-semibold text-selva-950 shadow-md shadow-oro-500/20 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
          >
            {navCta.label}
          </Link>
        </div>

        {/* Movil: Test de Afinidad siempre visible + menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={otroIdioma}
            hrefLang={lang === "es" ? "en" : "es"}
            aria-label={d.otroIdiomaAria}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full px-3 text-sm font-semibold text-selva-200 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
          >
            {d.otroIdioma}
          </a>
          <Link
            href={navCta.href}
            className="inline-flex min-h-[40px] items-center rounded-full bg-oro-400 px-4 text-sm font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
          >
            {navCta.label}
          </Link>
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-selva-100 transition duration-150 hover:bg-selva-800/70 motion-safe:active:scale-[0.97]"
          aria-label={menuOpen ? d.cerrar : d.abrir}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="menu-movil" className="border-t border-selva-800 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {mainNav.map((link) => {
              const active = isActive(pathname, link.base);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition duration-150 motion-safe:active:scale-[0.98] ${
                      active ? "bg-selva-800 text-oro-300" : "text-selva-200 hover:bg-selva-800 hover:text-oro-300"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
