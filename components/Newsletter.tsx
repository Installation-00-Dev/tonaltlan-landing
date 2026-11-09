"use client";

import { useState, type FormEvent } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Newsletter() {
  const sectionRef = useFadeIn<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-b from-[#0f172a]/90 via-[#090d16]/95 to-[#07070a] p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_40px_rgba(197,160,89,0.1)] md:p-12">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            aria-hidden="true"
          />

          <h2 className="mb-4 font-serif text-3xl font-bold tracking-wide text-gold md:text-4xl">
            Mantente Informado
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {/* PLACEHOLDER */}
            Recibe noticias sobre lanzamientos, nuevos suplementos y eventos exclusivos
            directamente en tu correo.
          </p>

          {submitted ? (
            <div className="glass-card inline-flex items-center gap-2 rounded-xl border border-teal/40 px-8 py-4">
              <svg
                className="h-5 w-5 text-teal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-base font-medium text-foreground">
                Proximamente - Gracias por tu interes
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electronico
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="tu@correo.com"
                className="min-h-[50px] flex-1 rounded-xl border border-gold/25 bg-[#07070a]/80 px-5 py-3 text-base text-foreground placeholder:text-muted/60 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
              <button
                type="submit"
                className="inline-flex min-h-[50px] items-center justify-center rounded-xl bg-teal px-8 py-3 font-serif text-base font-bold tracking-wider uppercase text-[#07070a] shadow-[0_0_25px_rgba(45,212,191,0.3)] transition-all duration-300 hover:bg-teal/90 hover:shadow-[0_0_35px_rgba(45,212,191,0.5)]"
              >
                Suscribirse
              </button>
            </form>
          )}

          <p className="mt-5 text-xs text-muted/60">
            {/* PLACEHOLDER: Reemplaza con tu politica de privacidad real */}
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            Consulta nuestra politica de privacidad para mas informacion.
          </p>
        </div>
      </div>
    </section>
  );
}
