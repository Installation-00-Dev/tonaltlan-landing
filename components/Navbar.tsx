"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Novedades", href: "#novedades" },
  { label: "Que es Tonaltlan", href: "#about" },
  { label: "Empezar", href: "#empezar" },
  { label: "Conseguir", href: "#conseguir" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#" className="flex items-center gap-2" aria-label="Tonaltlan - Inicio">
          <Image
            src="/images/tonaltlan_logo.png"
            alt="Tonaltlan logo"
            width={140}
            height={40}
            className="h-8 lg:h-10"
            style={{ width: "auto" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#conseguir"
          className="hidden min-h-[44px] items-center rounded-lg bg-teal px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 lg:flex"
        >
          Conseguir el Juego
        </a>

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
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#conseguir"
                className="mt-2 block min-h-[44px] rounded-lg bg-teal px-4 py-3 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
                onClick={() => setMenuOpen(false)}
              >
                Conseguir el Juego
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
