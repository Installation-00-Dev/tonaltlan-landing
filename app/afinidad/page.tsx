"use client";

import SectionHeader from "@/components/compendio/SectionHeader";
import { useAffinityTest } from "@/hooks/useAffinityTest";

interface ParsedAffinityTitle {
  race: string;
  element: string | null;
  archetype: string;
}

function parseAffinityTitle(rawTitle: string): ParsedAffinityTitle {
  const match = rawTitle.match(/^([^()]+?)\s*(?:\(([^)]+)\))?\s*-\s*(.+)$/);

  if (!match) {
    return {
      race: rawTitle.trim(),
      element: null,
      archetype: "Afinidad revelada",
    };
  }

  return {
    race: match[1].trim(),
    element: match[2]?.trim() ?? null,
    archetype: match[3].trim(),
  };
}

export default function AfinidadPage() {
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
  } = useAffinityTest();

  const parsedDominantTitle = results ? parseAffinityTitle(results.dominant.narrative.name) : null;

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeader
          title="Test de Afinidad"
          subtitle="Descubre con que energia racial resuena tu energia tonal. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan."
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
              aria-label={`Paso ${index + 1} de ${totalQuestions}`}
            />
          ))}
        </div>

        {phase === "intro" ? (
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <div className="grid gap-5">
              <div>
                <label htmlFor="affinity-name" className="mb-2 block text-sm font-semibold text-foreground">
                  Nombre
                </label>
                <input
                  id="affinity-name"
                  type="text"
                  value={user.name}
                  onChange={(event) => updateUserField("name", event.target.value)}
                  className="w-full rounded-xl border border-glass-border bg-white px-4 py-3 font-medium text-gray-900 caret-teal outline-none transition-colors placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/30"
                  style={{ color: "#111827", WebkitTextFillColor: "#111827", opacity: 1 }}
                  placeholder="Tu nombre"
                />
                {formErrors.name ? <p className="mt-2 text-sm text-red-300">{formErrors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="affinity-email" className="mb-2 block text-sm font-semibold text-foreground">
                  Email
                </label>
                <input
                  id="affinity-email"
                  type="email"
                  value={user.email}
                  onChange={(event) => updateUserField("email", event.target.value)}
                  className="w-full rounded-xl border border-glass-border bg-white px-4 py-3 font-medium text-gray-900 caret-teal outline-none transition-colors placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/30"
                  style={{ color: "#111827", WebkitTextFillColor: "#111827", opacity: 1 }}
                  placeholder="tu@email.com"
                />
                {formErrors.email ? <p className="mt-2 text-sm text-red-300">{formErrors.email}</p> : null}
              </div>

              <button
                type="button"
                onClick={startTest}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                Comenzar Test
              </button>

              <button
                type="button"
                onClick={startRandomAffinity}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gold/60 bg-background/20 px-8 py-3 text-base font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                Afinidad Aleatoria
              </button>

              <p className="text-center text-sm text-muted">
                Modo galleta de la suerte: te damos una afinidad al azar sin responder preguntas.
              </p>
            </div>
          </div>
        ) : null}

        {phase === "questions" && currentQuestion ? (
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <p className="mb-2 text-sm font-medium text-teal">
              Pregunta {currentQuestionIndex + 1} de {sessionQuestions.length}
            </p>
            <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground">
              {currentQuestion.title}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted">{currentQuestion.scenario}</p>

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

            <p className="mt-6 text-sm text-muted">Toca una opcion para avanzar automaticamente. Usa Anterior para corregir.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0 || isAutoAdvancing}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-glass-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>
            </div>
          </div>
        ) : null}

        {phase === "results" && results ? (
          <div className="space-y-5">

            {/* ── Hero Reveal ── */}
            <div className="glass-card overflow-hidden rounded-2xl">
              <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="px-8 py-10 text-center md:px-14 md:py-14">
                {affinityMode === "random" ? (
                  <span className="mb-5 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                    Modo Fortuna Aleatoria
                  </span>
                ) : null}

                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal">
                  {user.name} &mdash; tu afinidad
                </p>

                <div className="my-5 flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/50" />
                  <span className="text-xl text-gold/70">✦</span>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/50" />
                </div>

                {parsedDominantTitle ? (
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                    <span className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                      {parsedDominantTitle.race}
                    </span>
                    {parsedDominantTitle.element ? (
                      <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                        {parsedDominantTitle.element}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <h2 className="font-serif text-4xl font-bold leading-tight text-gold md:text-5xl">
                  {parsedDominantTitle?.archetype ?? results.dominant.narrative.name}
                </h2>

                <p className="mx-auto mt-6 max-w-lg text-base italic leading-relaxed text-muted">
                  &ldquo;{results.dominant.narrative.essence.split(".")[0]}.&rdquo;
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/30" />
                  <span className="text-sm text-gold/40">◆</span>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/30" />
                </div>
              </div>
            </div>

            {/* ── Cuatro Pilares ── */}
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

            {/* ── Simbolos Sagrados ── */}
            <div className="glass-card rounded-xl p-6">
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                Símbolos Sagrados
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

            {/* ── Acciones ── */}
            <div className="pt-2 text-center">
              {submissionStatus === "saving" ? (
                <p className="mb-4 text-sm text-muted">Guardando tu resultado...</p>
              ) : null}
              {submissionStatus === "saved" ? (
                <p className="mb-4 text-sm text-teal">Resultado guardado correctamente.</p>
              ) : null}
              {submissionStatus === "error" ? (
                <p className="mb-4 text-sm text-red-300">
                  No se pudo guardar tu resultado. Intenta de nuevo en unos segundos.
                </p>
              ) : null}
              <button
                type="button"
                onClick={resetTest}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                Hacer Test Nuevamente
              </button>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
}
