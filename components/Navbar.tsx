"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, navCta } from "@/lib/site";

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
  const current = normalize(pathname);
  return (sectionMatches[href] ?? [href]).some((base) => current === base || current.startsWith(`${base}/`));
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = normalize(pathname) === "/";
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        solid
          ? "border-b border-amber-400/15 bg-slate-900/65 shadow-lg shadow-slate-950/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-300 lg:px-8 ${
          solid ? "py-2" : "py-4"
        }`}
        aria-label="Navegacion principal"
      >
        {/* Logo del producto */}
        <Link
          href="/"
          aria-label="Tonaltlan - Inicio"
          className={`flex shrink-0 items-center rounded-lg transition-all duration-500 ${
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
            className={`w-auto transition-all duration-300 ${solid ? "h-10" : "h-12 lg:h-14"}`}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center gap-1">
            {mainNav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      active ? "text-amber-300" : "text-slate-200 hover:text-amber-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px bg-amber-400 transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={navCta.href}
            className="ml-4 inline-flex items-center rounded-full border border-amber-400/60 px-5 py-2 text-sm font-semibold tracking-wide text-amber-300 transition-colors hover:bg-amber-400 hover:text-slate-950"
          >
            {navCta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-100 transition-colors hover:bg-slate-800/70 lg:hidden"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
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
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="menu-movil" className="border-t border-slate-800 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {mainNav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      active ? "bg-slate-800 text-amber-300" : "text-slate-200 hover:bg-slate-800 hover:text-amber-300"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <Link
                href={navCta.href}
                className="block rounded-full bg-amber-400 px-4 py-3 text-center text-base font-semibold text-slate-950 transition-colors hover:bg-amber-300"
                onClick={() => setMenuOpen(false)}
              >
                {navCta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
