"use client";

import SectionHeader from "@/components/compendio/SectionHeader";
import {
    EMAIL_REGEX,
    applyOptionPoints,
    calculateResults,
    createInitialScores,
    prepareQuestionsForSession,
    questions,
    type CalculatedResults,
    type Option,
    type Question,
    type Scores,
    type User,
} from "@/lib/affinity-test";
import { useState } from "react";

type TestPhase = "intro" | "questions" | "results";

interface FormErrors {
  name?: string;
  email?: string;
}

function findOptionById(question: Question, optionId?: string): Option | undefined {
  if (!optionId) {
    return undefined;
  }

  return question.options.find((option) => option.id === optionId);
}

export default function AfinidadPage() {
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string | undefined>>([]);
  const [scores, setScores] = useState<Scores>(() => createInitialScores());
  const [results, setResults] = useState<CalculatedResults | null>(null);

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const currentAnswerId = answers[currentQuestionIndex];
  const totalQuestions = sessionQuestions.length || questions.length;

  function updateUserField(field: keyof User, value: string) {
    setUser((previousUser) => ({
      ...previousUser,
      [field]: value,
    }));

    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));
  }

  function validateUser(): boolean {
    const nextErrors: FormErrors = {};

    if (!user.name.trim()) {
      nextErrors.name = "Ingresa tu nombre para continuar.";
    }

    if (!user.email.trim()) {
      nextErrors.email = "Ingresa tu email para continuar.";
    } else if (!EMAIL_REGEX.test(user.email.trim())) {
      nextErrors.email = "Ingresa un email valido.";
    }

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function startTest() {
    if (!validateUser()) {
      return;
    }

    setSessionQuestions(prepareQuestionsForSession());
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(createInitialScores());
    setResults(null);
    setPhase("questions");
  }

  function handleOptionSelect(optionId: string) {
    if (!currentQuestion) {
      return;
    }

    const previousAnswerId = answers[currentQuestionIndex];
    const previousOption = findOptionById(currentQuestion, previousAnswerId);
    const nextOption = findOptionById(currentQuestion, optionId);

    if (!nextOption || previousAnswerId === optionId) {
      return;
    }

    setAnswers((previousAnswers) => {
      const nextAnswers = [...previousAnswers];
      nextAnswers[currentQuestionIndex] = optionId;
      return nextAnswers;
    });

    setScores((previousScores) => {
      let nextScores = previousScores;

      if (previousOption) {
        nextScores = applyOptionPoints(nextScores, previousOption, -1);
      }

      return applyOptionPoints(nextScores, nextOption, 1);
    });
  }

  function previousQuestion() {
    if (!currentQuestion || currentQuestionIndex === 0) {
      return;
    }

    const currentOption = findOptionById(currentQuestion, currentAnswerId);

    if (currentOption) {
      setScores((previousScores) => applyOptionPoints(previousScores, currentOption, -1));
      setAnswers((previousAnswers) => {
        const nextAnswers = [...previousAnswers];
        nextAnswers[currentQuestionIndex] = undefined;
        return nextAnswers;
      });
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
  }

  function nextQuestion() {
    if (!currentQuestion || !currentAnswerId) {
      return;
    }

    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
      return;
    }

    setResults(calculateResults(scores));
    setPhase("results");
  }

  function resetTest() {
    setPhase("intro");
    setUser({ name: "", email: "" });
    setFormErrors({});
    setSessionQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(createInitialScores());
    setResults(null);
  }

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
          </div>
        ) : null}
      </div>
    </div>
  );
}
