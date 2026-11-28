"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import Greca from "@/components/ui/Greca";
import { guardarEnvio, payloadSuscripcion, vaciarCola } from "@/lib/affinity-submission";
import { variante } from "@/lib/imagenes";
import { t, type Lang } from "@/lib/i18n";
import { contacts } from "@/lib/site";

// Contacto para dudas de privacidad mientras no haya politica publicada (lo pidio el estudio).
const contactoPrivacidad = contacts.find((c) => c.email.startsWith("guardacodices@"));

/**
 * "Mantente Informado": cierra el embudo de la landing. El arte de Aztlan
 * (Galeria) ocupa el bloque; el texto vive del lado oscuro del degradado
 * (abajo en celular, a la izquierda en escritorio) y la ciudad respira del otro.
 * El correo se guarda en la misma hoja de Google que el Test de Afinidad
 * (subscribed: true, mode "newsletter"), con reintentos y cola sin conexion.
 */
export default function Newsletter({ lang = "es" }: { lang?: Lang }) {
  const d = t(lang).newsletter;
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"listo" | "enviando" | "suscrito" | "error">("listo");

  // Reenvia lo que haya quedado pendiente en este telefono (test o suscripciones).
  useEffect(() => {
    void vaciarCola();
    const alVolverLaConexion = () => void vaciarCola();
    window.addEventListener("online", alVolverLaConexion);
    return () => window.removeEventListener("online", alVolverLaConexion);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando" || !email.trim()) return;
    setEstado("enviando");
    const outcome = await guardarEnvio(payloadSuscripcion(email, lang));
    setEstado(outcome === "failed" ? "error" : "suscrito");
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

            {estado === "suscrito" ? (
              <p className="mt-8 inline-flex items-start gap-2 rounded-2xl bg-selva-900/80 px-5 py-3 ring-1 ring-turquesa-400/40" role="status">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-turquesa-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base font-medium text-selva-100">{d.suscrito}</span>
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (estado === "error") setEstado("listo");
                  }}
                  aria-describedby={estado === "error" ? "newsletter-error" : undefined}
                  placeholder={d.placeholder}
                  className="min-h-[52px] flex-1 rounded-full border border-selva-600 bg-selva-950/80 px-6 py-3 text-base text-selva-100 caret-oro-400 placeholder:text-selva-400 transition-colors focus:border-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-400/40"
                />
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 disabled:opacity-70 motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-200 focus-visible:ring-offset-2 focus-visible:ring-offset-selva-950"
                >
                  {estado === "enviando" ? d.enviando : estado === "error" ? d.reintentar : d.boton}
                </button>
              </form>
            )}
            {estado === "error" ? (
              <p id="newsletter-error" role="alert" className="mt-3 max-w-md text-sm text-red-300">
                {d.error}
              </p>
            ) : null}

            <p className="mt-5 max-w-md text-xs leading-relaxed text-selva-400">
              {/* Aviso provisional hasta tener la politica de privacidad (pendiente "politica-privacidad"). */}
              {d.privacidad}
            </p>
            {contactoPrivacidad ? (
              <p className="mt-1 text-xs text-selva-400">
                {contactoPrivacidad.role} ·{" "}
                <a
                  href={`mailto:${contactoPrivacidad.email}`}
                  className="text-turquesa-300 underline decoration-turquesa-300/40 underline-offset-2 hover:text-turquesa-200"
                >
                  {contactoPrivacidad.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
