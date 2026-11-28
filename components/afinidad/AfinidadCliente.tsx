"use client";

import { useEffect, useRef } from "react";
import OpcionesVisuales from "@/components/afinidad/OpcionesVisuales";
import ResultadoAfinidad from "@/components/afinidad/ResultadoAfinidad";
import { enfoque, type InfoEspecies } from "@/components/afinidad/comun";
import SectionHeader from "@/components/compendio/SectionHeader";
import { useAffinityTest } from "@/hooks/useAffinityTest";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Question, RaceKey, RaceResult } from "@/lib/affinity-core";
import { t, type Lang } from "@/lib/i18n";

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

/**
 * Test de Afinidad: inicio (nombre y correo), las 7 preguntas y el resultado.
 * El estado y el envío viven en useAffinityTest; las preguntas visuales las dibuja
 * OpcionesVisuales y el resultado, ResultadoAfinidad.
 */
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

  const esVisual = currentQuestion?.tipo && currentQuestion.tipo !== "texto";

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

          {phase === "results" && results && info[results.dominant.race] ? (
            <ResultadoAfinidad
              lang={lang}
              info={info}
              results={results}
              nombre={user.name}
              affinityMode={affinityMode}
              submissionStatus={submissionStatus}
              tituloRef={tituloResultadoRef}
              onReintentar={reintentarGuardado}
              onReiniciar={resetTest}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
