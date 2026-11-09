"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// "Explorar" vive solo como CTA principal del Hero para evitar destinos duplicados.
const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Afinidad", href: "/afinidad" },
  { label: "Suscríbete", href: "/#newsletter" },
  { label: "Contacto", href: "/#contacto" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  return normalized === href;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-slate-800 bg-slate-900/90 shadow-lg shadow-slate-950/40 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Navegacion principal"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Tonaltlan - Inicio">
          <Image
            src="/images/produccion.webp"
            alt="Tonaltlan logo"
            width={180}
            height={68}
            className="h-11 w-auto lg:h-14"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                    active
                      ? "bg-slate-800 text-amber-300"
                      : "text-slate-200 hover:bg-slate-800/70 hover:text-amber-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-100 transition-colors hover:bg-slate-800 lg:hidden"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
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
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-slate-800 text-amber-300"
                        : "text-slate-200 hover:bg-slate-800 hover:text-amber-300"
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
