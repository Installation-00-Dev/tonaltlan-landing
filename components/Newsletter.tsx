"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Greca from "@/components/ui/Greca";
import { variante } from "@/lib/imagenes";
import { t, type Lang } from "@/lib/i18n";

/**
 * "Mantente Informado": cierra el embudo de la landing. El arte de Aztlan
 * (Galeria) ocupa el bloque; el texto vive del lado oscuro del degradado
 * (abajo en celular, a la izquierda en escritorio) y la ciudad respira del otro.
 */
export default function Newsletter({ lang = "es" }: { lang?: Lang }) {
  const d = t(lang).newsletter;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-selva-950 ring-1 ring-selva-700/70">
          <Image
            src={variante("/images/galeria/Aztlan.webp", 1800)}
            alt=""
            fill
            className="-z-20 object-cover object-[36%_center] md:object-center"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-selva-950 from-45% via-selva-950/80 to-selva-950/10 md:bg-gradient-to-r md:from-selva-950 md:from-30% md:via-selva-950/75 md:to-transparent"
            aria-hidden="true"
          />

          <div className="px-6 pb-10 pt-52 sm:px-10 md:max-w-xl md:px-14 md:py-20 lg:max-w-2xl">
            <h2 className="font-display text-4xl leading-tight text-jade-400 md:text-5xl">{d.titulo}</h2>
            <Greca className="mt-5 w-40 text-oro-400/60" />
            <p className="mt-5 max-w-md text-base leading-relaxed text-selva-200 md:text-lg">{d.texto}</p>

            {submitted ? (
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-selva-900/80 px-6 py-3 ring-1 ring-turquesa-400/40" role="status">
                <svg className="h-5 w-5 shrink-0 text-turquesa-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base font-medium text-selva-100">{d.gracias}</span>
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  {d.label}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  required
                  placeholder={d.placeholder}
                  className="min-h-[52px] flex-1 rounded-full border border-selva-600 bg-selva-950/80 px-6 py-3 text-base text-selva-100 caret-oro-400 placeholder:text-selva-400 transition-colors focus:border-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-400/40"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-200 focus-visible:ring-offset-2 focus-visible:ring-offset-selva-950"
                >
                  {d.boton}
                </button>
              </form>
            )}

            <p className="mt-5 max-w-md text-xs leading-relaxed text-selva-400">
              {/* PLACEHOLDER: Reemplaza con tu politica de privacidad real */}
              {d.privacidad}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
