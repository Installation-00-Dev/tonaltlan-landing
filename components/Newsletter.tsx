"use client";

import { useState, type FormEvent } from "react";
import { t, type Lang } from "@/lib/i18n";

export default function Newsletter({ lang = "es" }: { lang?: Lang }) {
  const d = t(lang).newsletter;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-selva-800 to-selva-900 p-8 text-center shadow-2xl shadow-selva-950/60 ring-1 ring-oro-400/30 md:p-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-oro-300/80 to-transparent"
            aria-hidden="true"
          />

          <h2 className="mb-4 font-display text-3xl text-jade-400 md:text-4xl">
            {d.titulo}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-selva-300 md:text-lg">
            {d.texto}
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-turquesa-400/10 px-8 py-4 ring-1 ring-turquesa-400/40">
              <svg
                className="h-5 w-5 text-turquesa-300"
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
              <span className="text-base font-medium text-selva-100">
                {d.gracias}
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {d.label}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder={d.placeholder}
                className="min-h-[52px] flex-1 rounded-full border border-selva-600 bg-selva-950/60 px-6 py-3 text-base text-selva-100 placeholder:text-selva-500 focus:border-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-400/40"
              />
              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 font-display text-base text-selva-950 shadow-lg shadow-oro-500/20 transition duration-200 hover:bg-oro-300 motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-oro-200"
              >
                {d.boton}
              </button>
            </form>
          )}

          <p className="mt-6 text-xs leading-relaxed text-selva-400">
            {/* PLACEHOLDER: Reemplaza con tu politica de privacidad real */}
            {d.privacidad}
          </p>
        </div>
      </div>
    </section>
  );
}
