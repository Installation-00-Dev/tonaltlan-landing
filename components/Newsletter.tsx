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
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 p-8 text-center shadow-2xl shadow-slate-950/60 ring-1 ring-amber-400/30 md:p-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
            aria-hidden="true"
          />

          <h2 className="mb-4 font-serif text-3xl font-bold tracking-wide text-amber-300 md:text-4xl">
            Mantente Informado
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            {/* PLACEHOLDER */}
            Recibe noticias sobre lanzamientos, nuevos suplementos y eventos exclusivos
            directamente en tu correo.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/10 px-8 py-4 ring-1 ring-emerald-400/40">
              <svg
                className="h-5 w-5 text-emerald-300"
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
              <span className="text-base font-medium text-slate-100">
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
                className="min-h-[52px] flex-1 rounded-full border border-slate-600 bg-slate-950/60 px-6 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-amber-400 px-8 py-3 font-serif text-base font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
              >
                Suscribirse
              </button>
            </form>
          )}

          <p className="mt-6 text-xs leading-relaxed text-slate-400">
            {/* PLACEHOLDER: Reemplaza con tu politica de privacidad real */}
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            Consulta nuestra politica de privacidad para mas informacion.
          </p>
        </div>
      </div>
    </section>
  );
}
