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
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
        <h2 className="mb-4 font-serif text-3xl font-bold text-gold md:text-4xl">
          Mantente Informado
        </h2>
        <p className="mb-8 text-base leading-relaxed text-muted md:text-lg">
          {/* PLACEHOLDER */}
          Recibe noticias sobre lanzamientos, nuevos suplementos y eventos exclusivos
          directamente en tu correo.
        </p>

        {submitted ? (
          <div className="glass-card inline-flex items-center gap-2 rounded-xl px-8 py-4">
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
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electronico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="tu@correo.com"
              className="glass-card min-h-[48px] flex-1 rounded-lg px-4 py-3 text-base text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-6 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
            >
              Suscribirse
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted/60">
          {/* PLACEHOLDER: Reemplaza con tu politica de privacidad real */}
          Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          Consulta nuestra politica de privacidad para mas informacion.
        </p>
      </div>
    </section>
  );
}
