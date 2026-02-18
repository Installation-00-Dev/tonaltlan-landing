"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Explorar", href: "/explorar" },
  { label: "Afinidad", href: "/afinidad" },
  { label: "Suscribete", href: "/#newsletter" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b border-glass-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
        aria-label="Navegacion principal"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Tonaltlan - Inicio">
          <Image
            src="/images/tonaltlan_logo.png"
            alt="Tonaltlan logo"
            width={140}
            height={40}
            className="h-8 lg:h-10"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/explorar"
          className="hidden min-h-[44px] items-center rounded-lg bg-teal px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 lg:flex"
        >
          Explorar Tonaltlan
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass-card border-t border-glass-border lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-foreground/5 hover:text-gold ${
                    pathname === link.href ? "text-gold" : "text-foreground/80"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/explorar"
                className="mt-2 block min-h-[44px] rounded-lg bg-teal px-4 py-3 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
                onClick={() => setMenuOpen(false)}
              >
                Explorar Tonaltlan
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
