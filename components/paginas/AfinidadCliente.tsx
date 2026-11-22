"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SectionHeader from "@/components/compendio/SectionHeader";
import { useAffinityTest } from "@/hooks/useAffinityTest";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Option, Question, RaceKey } from "@/lib/affinity-test";
import { ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { themeFor } from "@/lib/site";

/** Arte y nombres de cada especie y su dios (los prepara Afinidad.tsx desde el compendio). */
export type InfoEspecies = Record<
  RaceKey,
  {
    nombre: string;
    slug: string;
    imagen?: string;
    alt?: string;
    deidad: { nombre: string; slug: string; imagen?: string } | null;
  }
>;

interface ParsedAffinityTitle {
  race: string;
  element: string | null;
  archetype: string;
}

function parseAffinityTitle(rawTitle: string, revelada: string): ParsedAffinityTitle {
  const match = rawTitle.match(/^([^()]+?)\s*(?:\(([^)]+)\))?\s*-\s*(.+)$/);

  if (!match) {
    return {
      race: rawTitle.trim(),
      element: null,
      archetype: revelada,
    };
  }

  return {
    race: match[1].trim(),
    element: match[2]?.trim() ?? null,
    archetype: match[3].trim(),
  };
}

/** Anillo de la opcion elegida: oro (estado activo); al pasar el cursor, jade. */
const anillo = (elegida: boolean) =>
  elegida ? "ring-oro-400" : "ring-transparent hover:ring-jade-400/60";

function OpcionesVisuales({
  question,
  info,
  currentAnswerId,
  disabled,
  onSelect,
}: {
  question: Question;
  info: InfoEspecies;
  currentAnswerId?: string;
  disabled: boolean;
  onSelect: (id: string) => void;
}) {
  const props = (option: Option) => ({
    type: "button" as const,
    onClick: () => onSelect(option.id),
    disabled,
    "aria-pressed": currentAnswerId === option.id,
  });

  if (question.tipo === "deidad") {
    return (
      <ul className="flex flex-wrap justify-center gap-3">
        {question.options.map((option) => {
          const deidad = option.race ? info[option.race].deidad : null;
          const theme = themeFor(deidad?.slug);
          return (
            <li key={option.id} className="w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.5625rem)]">
              <button
                {...props(option)}
                className="group block w-full rounded-2xl text-center transition duration-200 motion-safe:active:scale-[0.97]"
              >
                <span
                  className={`relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b ring-2 ring-offset-2 ring-offset-selva-900 transition duration-200 ${theme.glow} ${anillo(currentAnswerId === option.id)}`}
                >
                  {deidad?.imagen ? (
                    <Image
                      src={variante(deidad.imagen, 480)}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                      sizes="(max-width: 640px) 30vw, 160px"
                    />
                  ) : null}
                </span>
                <span className={`mt-2 block font-display text-lg ${theme.text}`}>{deidad?.nombre ?? option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  // Simbolo y color: circulos que se eligen de un toque, siempre en filas de 4 + 3.
  return (
    <ul className="mx-auto flex max-w-[28rem] flex-wrap justify-center gap-3 sm:gap-5">
      {question.options.map((option) => (
        <li key={option.id}>
          <button
            {...props(option)}
            aria-label={option.text}
            title={option.text}
            className={`block rounded-full ring-2 ring-offset-4 ring-offset-selva-900 transition duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-[0.97] ${anillo(currentAnswerId === option.id)}`}
          >
            {question.tipo === "simbolo" && option.imagen ? (
              <Image src={option.imagen} alt="" width={136} height={136} className="h-16 w-16 sm:h-24 sm:w-24" />
            ) : (
              <span className={`block h-16 w-16 rounded-full shadow-inner sm:h-20 sm:w-20 ${option.color ?? ""}`} />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function AfinidadCliente({ lang, info }: { lang: Lang; info: InfoEspecies }) {
  const d = t(lang).paginas.afinidad;
  const hijosDe = t(lang).paginas.especies.hijosDe;
  const {
    phase,
    user,
    formErrors,
    sessionQuestions,
    currentQuestionIndex,
    results,
    affinityMode,
    submissionStatus,
    isAutoAdvancing,
    currentQuestion,
    currentAnswerId,
    totalQuestions,
    updateUserField,
    startTest,
    startRandomAffinity,
    handleOptionSelect,
    previousQuestion,
    resetTest,
  } = useAffinityTest(lang);

  // Al cambiar de pregunta o llegar al resultado, si la tarjeta quedo arriba de la pantalla, se vuelve a ella.
  const tarjetaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tarjeta = tarjetaRef.current;
    if (tarjeta && tarjeta.getBoundingClientRect().top < 0) {
      tarjeta.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, [currentQuestionIndex, phase]);

  const parsedDominantTitle = results ? parseAffinityTitle(results.dominant.narrative.name, d.revelada) : null;
  const principal = results ? info[results.dominant.race] : null;
  const segunda = results?.secondary ? info[results.secondary.race] : null;
  const tema = themeFor(principal?.deidad?.slug);
  const temaSegunda = themeFor(segunda?.deidad?.slug);
  const esVisual = currentQuestion?.tipo && currentQuestion.tipo !== "texto";

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeader
          lang={lang}
          title={d.titulo}
          subtitle={d.subtitulo}
        />

        <div className="mb-8 flex items-center justify-center gap-3">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                phase === "results"
                  ? "bg-teal"
                  : index < currentQuestionIndex
                    ? "bg-teal"
                    : index === currentQuestionIndex && phase === "questions"
                      ? "bg-gold"
                      : "bg-glass-border"
              }`}
              aria-label={`${d.paso} ${index + 1} ${d.de} ${totalQuestions}`}
            />
          ))}
        </div>

        <div ref={tarjetaRef} className="scroll-mt-24">
        {phase === "intro" ? (
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <div className="grid gap-5">
              <div>
                <label htmlFor="affinity-name" className="mb-2 block text-sm font-semibold text-foreground">
                  {d.nombre}
                </label>
                <input
                  id="affinity-name"
                  type="text"
                  value={user.name}
                  onChange={(event) => updateUserField("name", event.target.value)}
                  className="w-full rounded-xl border border-glass-border bg-white px-4 py-3 font-medium text-gray-900 caret-teal outline-none transition-colors placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/30"
                  style={{ color: "#111827", WebkitTextFillColor: "#111827", opacity: 1 }}
                  placeholder={d.nombrePlaceholder}
                />
                {formErrors.name ? <p className="mt-2 text-sm text-red-300">{formErrors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="affinity-email" className="mb-2 block text-sm font-semibold text-foreground">
                  {d.email}
                </label>
                <input
                  id="affinity-email"
                  type="email"
                  value={user.email}
                  onChange={(event) => updateUserField("email", event.target.value)}
                  className="w-full rounded-xl border border-glass-border bg-white px-4 py-3 font-medium text-gray-900 caret-teal outline-none transition-colors placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/30"
                  style={{ color: "#111827", WebkitTextFillColor: "#111827", opacity: 1 }}
                  placeholder={d.emailPlaceholder}
                />
                {formErrors.email ? <p className="mt-2 text-sm text-red-300">{formErrors.email}</p> : null}
              </div>

              <button
                type="button"
                onClick={startTest}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                {d.comenzar}
              </button>

              <button
                type="button"
                onClick={startRandomAffinity}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gold/60 bg-background/20 px-8 py-3 text-base font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                {d.aleatoria}
              </button>

              <p className="text-center text-sm text-muted">
                {d.aleatoriaNota}
              </p>
            </div>
          </div>
        ) : null}

        {phase === "questions" && currentQuestion ? (
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <p className={`mb-2 text-sm font-medium text-teal ${esVisual ? "text-center" : ""}`}>
              {d.pregunta} {currentQuestionIndex + 1} {d.de} {sessionQuestions.length}
            </p>
            <h2 className={`mb-3 font-display text-2xl text-foreground ${esVisual ? "text-center md:text-3xl" : ""}`}>
              {currentQuestion.title}
            </h2>
            <p className={`mb-8 text-base leading-relaxed text-muted ${esVisual ? "text-center" : ""}`}>{currentQuestion.scenario}</p>

            {esVisual ? (
              <OpcionesVisuales
                question={currentQuestion}
                info={info}
                currentAnswerId={currentAnswerId}
                disabled={isAutoAdvancing}
                onSelect={handleOptionSelect}
              />
            ) : (
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentAnswerId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={isAutoAdvancing}
                      className={`glass-card-hover min-h-[48px] rounded-xl px-5 py-4 text-left text-base font-medium transition-colors ${
                        isSelected
                          ? "border border-teal bg-teal/10 text-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-sm text-muted">{d.ayuda}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0 || isAutoAdvancing}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-glass-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {d.anterior}
              </button>
            </div>
          </div>
        ) : null}

        {phase === "results" && results && principal ? (
          <div className="animate-fade-only space-y-5">

            {/* ── La revelacion: arte de la especie + lectura tipo horoscopo ── */}
            <section className={`overflow-hidden rounded-3xl bg-selva-800/40 ring-1 ${tema.ring}`}>
              <div className="grid md:grid-cols-5">
                <div className={`relative aspect-[4/5] bg-gradient-to-b md:col-span-2 md:aspect-auto md:min-h-[26rem] ${tema.glow}`}>
                  {principal.imagen ? (
                    <Image
                      src={variante(principal.imagen, 1200)}
                      alt={principal.alt ?? principal.nombre}
                      fill
                      priority
                      className="object-contain p-3 md:p-4"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : null}
                </div>

                <div className="p-6 md:col-span-3 md:p-10">
                  {affinityMode === "random" ? (
                    <span className="mb-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold text-gold">
                      {d.modoAleatorio}
                    </span>
                  ) : null}
                  <p className="text-sm text-selva-300">
                    {user.name} &mdash; {d.tuAfinidad}
                  </p>
                  <h2 className={`mt-2 font-display text-5xl leading-tight md:text-6xl ${tema.text}`}>{principal.nombre}</h2>
                  <p className="mt-1 font-display text-2xl text-selva-100">
                    {parsedDominantTitle?.archetype ?? results.dominant.narrative.name}
                  </p>
                  {principal.deidad ? (
                    <p className="mt-2 text-sm text-selva-400">
                      {hijosDe} {principal.deidad.nombre}
                      {parsedDominantTitle?.element ? ` · ${parsedDominantTitle.element}` : ""}
                    </p>
                  ) : null}

                  <ul className="mt-6 space-y-4">
                    {results.dominant.narrative.lectura.map((frase) => (
                      <li key={frase} className="flex gap-3 text-base leading-7 text-selva-100 md:text-lg md:leading-8">
                        <span className={`mt-3 h-1.5 w-1.5 shrink-0 rotate-45 ${tema.bar}`} aria-hidden="true" />
                        {frase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Un toque de la segunda especie ── */}
            {segunda && results.secondary ? (
              <section className="flex items-center gap-4 rounded-2xl bg-selva-800/40 p-4 ring-1 ring-selva-700/70 md:p-5">
                <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b ${temaSegunda.glow}`}>
                  {segunda.imagen ? (
                    <Image src={variante(segunda.imagen, 480)} alt="" fill className="object-cover object-top" sizes="80px" />
                  ) : null}
                </div>
                <div>
                  <p className="text-sm text-selva-400">
                    {d.toque} <span className={`font-display text-xl ${temaSegunda.text}`}>{segunda.nombre}</span>
                  </p>
                  <p className="mt-1 text-sm leading-6 text-selva-200">{results.secondary.narrative.lectura[1]}</p>
                </div>
              </section>
            ) : null}

            {/* ── Acciones ── */}
            <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-center">
              <Link
                href={ruta(lang, `/especies/${principal.slug}/`)}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97] sm:w-auto"
              >
                {d.conoce}
              </Link>
              <button
                type="button"
                onClick={resetTest}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97] sm:w-auto"
              >
                {d.reiniciar}
              </button>
            </div>
            {submissionStatus === "saving" ? <p className="text-center text-sm text-muted">{d.guardando}</p> : null}
            {submissionStatus === "saved" ? <p className="text-center text-sm text-teal">{d.guardado}</p> : null}
            {submissionStatus === "error" ? <p className="text-center text-sm text-red-300">{d.error}</p> : null}

            {/* ── La lectura completa de siempre, para quien quiera leer mas ── */}
            <details className="group rounded-2xl bg-selva-800/30 ring-1 ring-selva-700/70">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 font-display text-xl text-jade-400 transition-colors hover:text-jade-300 [&::-webkit-details-marker]:hidden">
                {d.lecturaCompleta}
                <svg
                  className="h-5 w-5 shrink-0 text-selva-400 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div className="space-y-4 px-4 pb-5 md:px-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {results.sections.map((section) => (
                    <div key={section.title} className="glass-card rounded-xl p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal">
                        {section.title}
                      </p>
                      <p className="text-sm leading-relaxed text-muted">{section.content}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-xl p-6">
                  <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                    {d.simbolos}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {results.symbols.map((symbol) => (
                      <div
                        key={symbol.label}
                        className="rounded-xl border border-gold/25 bg-gold/5 p-5 text-center"
                      >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                          {symbol.label}
                        </p>
                        <p className="text-sm leading-relaxed text-foreground">{symbol.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </details>

          </div>
        ) : null}
        </div>
      </div>
    </div>
  );
}
