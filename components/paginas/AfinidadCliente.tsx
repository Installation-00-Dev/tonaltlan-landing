"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import CompartirResultado, { type TarjetaAfinidad } from "@/components/afinidad/CompartirResultado";
import SectionHeader from "@/components/compendio/SectionHeader";
import { useAffinityTest } from "@/hooks/useAffinityTest";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Option, Question, RaceKey, RaceResult } from "@/lib/affinity-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { emblemas, themeFor } from "@/lib/site";

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

/** "TON, Luz. El Iluminador": especie, elemento y arquetipo (nombres en lib/affinity-test*.ts). */
function parseAffinityTitle(rawTitle: string, revelada: string): ParsedAffinityTitle {
  const match = rawTitle.match(/^([^,]+),\s*([^.]+)\.\s*(.+)$/);

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

/** Retraso escalonado de la revelacion del resultado (ver .revelacion-texto en globals.css). */
const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as CSSProperties;

/** Anillo de la opcion elegida: oro (estado activo); al pasar el cursor, jade. */
const anillo = (elegida: boolean) =>
  elegida ? "ring-oro-400" : "ring-transparent hover:ring-jade-400/60";

const enfoque = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-300 focus-visible:ring-offset-2 focus-visible:ring-offset-selva-900";

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
                className={`group block w-full rounded-2xl text-center transition duration-200 motion-safe:active:scale-[0.97] ${enfoque}`}
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
            className={`block rounded-full ring-2 ring-offset-4 ring-offset-selva-900 transition duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-[0.97] ${enfoque} ${anillo(currentAnswerId === option.id)}`}
          >
            {question.tipo === "simbolo" && option.imagen ? (
              <Image src={option.imagen} alt="" width={256} height={256} className="h-16 w-16 sm:h-24 sm:w-24" />
            ) : (
              <span className={`block h-16 w-16 rounded-full shadow-inner sm:h-20 sm:w-20 ${option.color ?? ""}`} />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Progreso de la sesion: una barra y "3/7" (reemplaza los puntos y "Pregunta 3 de 7"). */
function Progreso({ actual, total, etiqueta }: { actual: number; total: number; etiqueta: string }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={actual}
      aria-label={etiqueta}
      className="flex flex-1 items-center gap-3"
    >
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-selva-800">
        <span
          className="block h-full rounded-full bg-oro-400 transition-[width] duration-300"
          style={{ width: `${(actual / total) * 100}%` }}
        />
      </span>
      <span className="text-sm tabular-nums text-selva-300">
        {actual}/{total}
      </span>
    </div>
  );
}

const campo =
  "w-full rounded-xl border border-selva-600 bg-selva-950/60 px-4 py-3 text-base text-selva-100 caret-oro-400 placeholder:text-selva-400 transition-colors focus:border-oro-400 focus:outline-none focus:ring-2 focus:ring-oro-400/40";

export default function AfinidadCliente({
  lang,
  info,
  preguntas,
  narrativas,
}: {
  lang: Lang;
  info: InfoEspecies;
  preguntas: Question[];
  narrativas: Record<RaceKey, RaceResult>;
}) {
  const d = t(lang).paginas.afinidad;
  const hijosDe = t(lang).paginas.especies.hijosDe;
  const {
    phase,
    user,
    formErrors,
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
    reintentarGuardado,
    resetTest,
  } = useAffinityTest(lang, preguntas, narrativas);

  // Al cambiar de pregunta o llegar al resultado: si la tarjeta quedo arriba de la
  // pantalla se vuelve a ella, y el foco pasa al titulo (para lectores de pantalla).
  const tarjetaRef = useRef<HTMLDivElement>(null);
  const tituloPreguntaRef = useRef<HTMLHeadingElement>(null);
  const tituloResultadoRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const tarjeta = tarjetaRef.current;
    if (tarjeta && tarjeta.getBoundingClientRect().top < 0) {
      tarjeta.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
    if (phase === "questions") tituloPreguntaRef.current?.focus({ preventScroll: true });
    if (phase === "results") tituloResultadoRef.current?.focus({ preventScroll: true });
  }, [currentQuestionIndex, phase]);

  const parsedDominantTitle = results ? parseAffinityTitle(results.dominant.narrative.name, d.revelada) : null;
  const principal = results ? info[results.dominant.race] : null;
  const segunda = results?.secondary ? info[results.secondary.race] : null;
  const tema = themeFor(principal?.deidad?.slug);
  const temaSegunda = themeFor(segunda?.deidad?.slug);
  const esVisual = currentQuestion?.tipo && currentQuestion.tipo !== "texto";
  const linaje = principal?.deidad
    ? `${hijosDe} ${principal.deidad.nombre}${parsedDominantTitle?.element ? ` · ${parsedDominantTitle.element}` : ""}`
    : (parsedDominantTitle?.element ?? "");

  // Datos de la imagen para compartir (estables mientras no cambie el resultado).
  const tarjeta = useMemo<TarjetaAfinidad | null>(
    () =>
      results && principal
        ? {
            encabezado: `${user.name.trim()}, ${d.eres}`,
            especie: principal.nombre,
            slug: principal.slug,
            imagen: principal.imagen,
            arquetipo: parsedDominantTitle?.archetype ?? principal.nombre,
            linaje,
            frase: results.dominant.narrative.lectura[0] ?? "",
            hex: tema.hex,
            hexTexto: tema.hexTexto,
          }
        : null,
    // Solo depende del resultado: nombre, idioma y colores no cambian mientras se muestra.
    [results],
  );

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Encabezado completo solo al inicio; durante el test, una barra compacta. */}
        {phase === "intro" ? (
          <SectionHeader lang={lang} title={d.titulo} subtitle={d.subtitulo} />
        ) : phase === "questions" ? (
          <header className="mb-5 flex items-center gap-4">
            <h1 className="shrink-0 font-display text-xl text-jade-400 md:text-2xl">{d.titulo}</h1>
            <Progreso
              actual={currentQuestionIndex + 1}
              total={totalQuestions}
              etiqueta={`${d.pregunta} ${currentQuestionIndex + 1} ${d.de} ${totalQuestions}`}
            />
          </header>
        ) : (
          <h1 className="sr-only">{d.titulo}</h1>
        )}

        <div ref={tarjetaRef} className="scroll-mt-24">
          {phase === "intro" ? (
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                startTest();
              }}
              className="rounded-3xl bg-selva-800/40 p-6 ring-1 ring-selva-700/70 md:p-10"
            >
              <p className="mb-6 flex items-center gap-2 text-sm text-turquesa-300">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 2" />
                </svg>
                {totalQuestions} {d.preguntas} · {d.duracion}
              </p>

              <div className="grid gap-5">
                <div>
                  <label htmlFor="affinity-name" className="mb-2 block text-sm font-semibold text-selva-100">
                    {d.nombre}
                  </label>
                  <input
                    id="affinity-name"
                    type="text"
                    autoComplete="given-name"
                    enterKeyHint="next"
                    value={user.name}
                    onChange={(event) => updateUserField("name", event.target.value)}
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "affinity-name-error" : undefined}
                    className={campo}
                    placeholder={d.nombrePlaceholder}
                  />
                  {formErrors.name ? (
                    <p id="affinity-name-error" className="mt-2 text-sm text-red-300">
                      {formErrors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="affinity-email" className="mb-2 block text-sm font-semibold text-selva-100">
                    {d.email}
                  </label>
                  <input
                    id="affinity-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    enterKeyHint="go"
                    value={user.email}
                    onChange={(event) => updateUserField("email", event.target.value)}
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "affinity-email-error" : undefined}
                    className={campo}
                    placeholder={d.emailPlaceholder}
                  />
                  {formErrors.email ? (
                    <p id="affinity-email-error" className="mt-2 text-sm text-red-300">
                      {formErrors.email}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className={`mt-1 inline-flex min-h-[52px] items-center justify-center rounded-full bg-oro-400 px-8 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 motion-safe:active:scale-[0.97] ${enfoque}`}
                >
                  {d.comenzar}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={startRandomAffinity}
                    className={`rounded text-sm font-medium text-turquesa-300 underline decoration-turquesa-300/40 underline-offset-4 transition-colors hover:text-turquesa-200 hover:decoration-turquesa-200 ${enfoque}`}
                  >
                    {d.aleatoria}
                  </button>
                  <p className="mt-1 text-xs text-selva-400">{d.aleatoriaNota}</p>
                </div>
              </div>
            </form>
          ) : null}

          {phase === "questions" && currentQuestion ? (
            <div key={currentQuestionIndex} className="aparece rounded-3xl bg-selva-800/40 p-5 ring-1 ring-selva-700/70 md:p-8">
              <h2
                ref={tituloPreguntaRef}
                tabIndex={-1}
                className={`font-display text-2xl leading-tight text-selva-50 outline-none focus-visible:outline-none md:text-3xl ${esVisual ? "text-center" : ""}`}
              >
                {currentQuestion.title}
              </h2>
              <p className={`mb-6 mt-2 text-base leading-relaxed text-selva-300 ${esVisual ? "text-center" : ""}`}>
                {currentQuestion.scenario}
              </p>

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
                        aria-pressed={isSelected}
                        className={`min-h-[52px] rounded-2xl px-5 py-4 text-left text-base leading-snug text-selva-100 transition duration-150 motion-safe:active:scale-[0.98] ${enfoque} ${
                          isSelected
                            ? "bg-oro-400/10 ring-2 ring-oro-400"
                            : "bg-selva-900/60 ring-1 ring-selva-700 hover:bg-selva-800 hover:ring-jade-400/50"
                        }`}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* La ayuda solo hace falta en la primera; despues, "Anterior" discreto. */}
              <div className="mt-6 flex min-h-[40px] items-center">
                {currentQuestionIndex > 0 ? (
                  <button
                    type="button"
                    onClick={previousQuestion}
                    disabled={isAutoAdvancing}
                    className={`-ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-selva-300 transition-colors hover:text-jade-200 disabled:opacity-50 ${enfoque}`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {d.anterior}
                  </button>
                ) : (
                  <p className={`w-full text-sm text-selva-400 ${esVisual ? "text-center" : ""}`}>{d.ayuda}</p>
                )}
              </div>
            </div>
          ) : null}

          {phase === "results" && results && principal ? (
            <div className="space-y-5">
              {/* ── La revelacion: el arte y el nombre caben juntos en la primera pantalla ── */}
              <section className={`overflow-hidden rounded-3xl bg-selva-900 ring-1 md:grid md:grid-cols-5 ${tema.ring}`}>
                <div
                  className={`relative h-[min(46vh,26rem)] min-h-[16rem] bg-gradient-to-b md:col-span-2 md:row-span-2 md:h-auto md:min-h-[28rem] ${tema.glow}`}
                >
                  {principal.imagen ? (
                    <Image
                      src={variante(principal.imagen, 1200)}
                      alt={principal.alt ?? principal.nombre}
                      fill
                      priority
                      className="revelacion-arte object-contain object-bottom p-3 pb-16 md:object-center md:p-4"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : null}
                </div>

                <div className="relative z-10 -mt-24 bg-gradient-to-t from-selva-900 from-60% to-transparent px-6 pt-14 md:col-span-3 md:mt-0 md:bg-none md:px-10 md:pt-10">
                  <h2 ref={tituloResultadoRef} tabIndex={-1} className="outline-none focus-visible:outline-none">
                    <span className="revelacion-texto block text-base text-selva-200" style={retraso(200)}>
                      {user.name.trim()}, {d.eres}
                    </span>{" "}
                    <span
                      className={`revelacion-texto mt-1 block font-display text-5xl leading-none md:text-6xl ${tema.text}`}
                      style={retraso(280)}
                    >
                      {principal.nombre}
                    </span>
                  </h2>
                  <p className="revelacion-texto mt-3 font-display text-2xl text-selva-100" style={retraso(360)}>
                    {parsedDominantTitle?.archetype ?? results.dominant.narrative.name}
                  </p>
                  <p className="revelacion-texto mt-1 flex flex-wrap items-center gap-x-2 text-sm text-selva-400" style={retraso(420)}>
                    {principal.deidad && emblemas[principal.deidad.slug] ? (
                      <Image src={emblemas[principal.deidad.slug]} alt="" width={256} height={256} className="h-6 w-6 shrink-0" />
                    ) : null}
                    {linaje}
                    {affinityMode === "random" ? <span className="text-oro-300"> · {d.modoAleatorio}</span> : null}
                  </p>
                </div>

                <ul className="space-y-4 px-6 pb-7 pt-5 md:col-span-3 md:px-10 md:pb-10 md:pt-2">
                  {results.dominant.narrative.lectura.map((frase, index) => (
                    <li
                      key={frase}
                      className="revelacion-texto flex gap-3 text-base leading-7 text-selva-100 md:text-lg md:leading-8"
                      style={retraso(520 + index * 90)}
                    >
                      <span className={`mt-3 h-1.5 w-1.5 shrink-0 rotate-45 ${tema.bar}`} aria-hidden="true" />
                      {frase}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Un toque de la segunda especie ── */}
              {segunda && results.secondary ? (
                <section
                  className="revelacion-texto flex items-center gap-4 rounded-2xl bg-selva-800/40 p-4 ring-1 ring-selva-700/70 md:p-5"
                  style={retraso(820)}
                >
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

              {/* ── Acciones: compartir es lo principal; conocer la especie, lo siguiente ── */}
              <div className="revelacion-texto flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center" style={retraso(900)}>
                {tarjeta ? (
                  <CompartirResultado
                    lang={lang}
                    datos={tarjeta}
                    className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-oro-400 px-7 py-3 text-base font-semibold text-selva-950 transition duration-150 hover:bg-oro-300 disabled:opacity-70 motion-safe:active:scale-[0.97] ${enfoque}`}
                  />
                ) : null}
                <Link
                  href={ruta(lang, `/especies/${principal.slug}/`)}
                  className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3 text-base font-semibold text-selva-100 ring-1 ring-selva-600 transition duration-150 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97] ${enfoque}`}
                >
                  {d.conoce}
                </Link>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                {submissionStatus === "error" ? (
                  <div className="flex flex-wrap items-center justify-center gap-3" role="alert">
                    <p className="text-sm text-red-300">{d.error}</p>
                    <button
                      type="button"
                      onClick={reintentarGuardado}
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold text-selva-100 ring-1 ring-selva-600 transition-colors hover:text-jade-200 hover:ring-jade-400/60 ${enfoque}`}
                    >
                      {d.reintentar}
                    </button>
                  </div>
                ) : null}
                {submissionStatus === "saving" ? <p className="text-xs text-selva-400">{d.guardando}</p> : null}
                {submissionStatus === "saved" ? (
                  <p className="inline-flex items-center gap-1.5 text-xs text-selva-400">
                    <svg className="h-3.5 w-3.5 text-jade-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {d.guardado}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={resetTest}
                  className={`rounded-full px-4 py-2 text-sm font-medium text-selva-300 underline decoration-selva-600 underline-offset-4 transition-colors hover:text-jade-200 hover:decoration-jade-400/60 ${enfoque}`}
                >
                  {d.reiniciar}
                </button>
              </div>

              {/* ── La lectura completa de siempre, para quien quiera leer mas ── */}
              <details className="group rounded-2xl bg-selva-800/30 ring-1 ring-selva-700/70">
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 font-display text-xl text-jade-400 transition-colors hover:text-jade-300 [&::-webkit-details-marker]:hidden ${enfoque}`}
                >
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

                <div className="space-y-6 px-6 pb-7 md:px-8">
                  {results.sections.map((section) => (
                    <section key={section.title}>
                      <h3 className="font-display text-xl text-jade-400">{section.title}</h3>
                      <p className="mt-1.5 max-w-prose text-base leading-7 text-selva-300">{section.content}</p>
                    </section>
                  ))}
                  <section>
                    <h3 className="font-display text-xl text-jade-400">{d.simbolos}</h3>
                    <dl className="mt-3 grid gap-5 sm:grid-cols-3">
                      {results.symbols.map((symbol) => (
                        <div key={symbol.label}>
                          <dt className="text-sm font-semibold text-turquesa-300">{symbol.label}</dt>
                          <dd className="mt-1 text-sm leading-6 text-selva-200">{symbol.content}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                </div>
              </details>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
