"use client";

import SectionHeader from "@/components/compendio/SectionHeader";
import { useAffinityTest } from "@/hooks/useAffinityTest";

export default function AfinidadPage() {
  const {
    phase,
    user,
    formErrors,
    sessionQuestions,
    currentQuestionIndex,
    results,
    submissionStatus,
    currentQuestion,
    currentAnswerId,
    totalQuestions,
    updateUserField,
    startTest,
    handleOptionSelect,
    previousQuestion,
    nextQuestion,
    resetTest,
  } = useAffinityTest();

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
                  className="w-full rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-teal"
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
                  className="w-full rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-foreground outline-none transition-colors focus:border-teal"
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-glass-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={nextQuestion}
                disabled={!currentAnswerId}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {currentQuestionIndex === sessionQuestions.length - 1 ? "Ver Resultados" : "Siguiente"}
              </button>
            </div>
          </div>
        ) : null}

        {phase === "results" && results ? (
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal">
                {user.name}, tu afinidad es
              </p>
              <h2 className="font-serif text-3xl font-bold text-gold">{results.dominant.narrative.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Email registrado: {user.email}</p>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.ranking.map((entry) => (
                <div key={entry.race} className="glass-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{entry.race}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{entry.score}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {results.sections.map((section) => (
                <div key={section.title} className="glass-card rounded-xl p-5">
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{section.content}</p>
                </div>
              ))}

              <div className="glass-card rounded-xl p-5">
                <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">Simbolos</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {results.symbols.map((symbol) => (
                    <div key={symbol.label} className="rounded-xl border border-glass-border bg-background/30 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-teal">{symbol.label}</p>
                      <p className="text-sm leading-relaxed text-muted">{symbol.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {results.secondary ? (
                <div className="glass-card rounded-xl p-5">
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                    Influencia Secundaria: {results.secondary.narrative.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    Tu afinidad tambien muestra rasgos de {results.secondary.race}. {results.secondary.narrative.essence}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={resetTest}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                Hacer Test Nuevamente
              </button>
            </div>

            {submissionStatus === "saving" ? (
              <p className="mt-4 text-center text-sm text-muted">Guardando tu resultado...</p>
            ) : null}

            {submissionStatus === "saved" ? (
              <p className="mt-4 text-center text-sm text-teal">Resultado guardado correctamente.</p>
            ) : null}

            {submissionStatus === "error" ? (
              <p className="mt-4 text-center text-sm text-red-300">
                No se pudo guardar tu resultado. Intenta de nuevo en unos segundos.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
