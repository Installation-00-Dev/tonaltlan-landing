"use client";

import { submitAffinityToWebhook, type AffinitySubmissionPayload } from "@/lib/affinity-submission";
import {
  EMAIL_REGEX,
  applyOptionPoints,
  calcularResultados,
  createInitialScores,
  preferenciasVisuales,
  prepareQuestionsForSession,
  puntosAleatorios,
  type CalculatedResults,
  type Option,
  type Question,
  type RaceKey,
  type RaceResult,
  type Scores,
  type User,
} from "@/lib/affinity-core";
import type { Lang } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

/** La opcion elegida se queda marcada este tiempo antes de pasar a la siguiente pregunta. */
const AUTO_ADVANCE_DELAY_MS = 260;

export type TestPhase = "intro" | "questions" | "results";
export type AffinityMode = "quiz" | "random";

export interface FormErrors {
  name?: string;
  email?: string;
}

export type SubmissionStatus = "idle" | "saving" | "saved" | "error";

function findOptionById(question: Question, optionId?: string): Option | undefined {
  if (!optionId) {
    return undefined;
  }

  return question.options.find((option) => option.id === optionId);
}

const MENSAJES = {
  es: {
    nombre: "Ingresa tu nombre para continuar.",
    email: "Ingresa tu email para continuar.",
    emailInvalido: "Ingresa un email válido.",
  },
  en: {
    nombre: "Enter your name to continue.",
    email: "Enter your email to continue.",
    emailInvalido: "Enter a valid email.",
  },
  fr: {
    nombre: "Saisis ton nom pour continuer.",
    email: "Saisis ton e-mail pour continuer.",
    emailInvalido: "Saisis un e-mail valide.",
  },
};

/* ── Guardado a prueba de Wi-Fi de convención ──────────────────
   1. Se reintenta 2 veces con espera, solo si el envio no salio
      (sin conexion): asi no se duplican filas en la hoja.
   2. Si aun falla, el resultado se guarda en el telefono y se reenvia
      al volver la conexion o la proxima vez que se abra el test.     */
const REINTENTOS_MS = [1500, 4000];
const COLA_KEY = "tonaltlan-afinidad-pendientes";
const COLA_MAX = 50;

function leerCola(): AffinitySubmissionPayload[] {
  try {
    const guardado = JSON.parse(localStorage.getItem(COLA_KEY) ?? "[]");
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

function guardarCola(cola: AffinitySubmissionPayload[]) {
  try {
    if (cola.length) localStorage.setItem(COLA_KEY, JSON.stringify(cola.slice(-COLA_MAX)));
    else localStorage.removeItem(COLA_KEY);
  } catch {
    // Sin almacenamiento (modo privado): solo queda el boton de reintentar.
  }
}

function quitarDeCola(payload: AffinitySubmissionPayload) {
  const clave = JSON.stringify(payload);
  guardarCola(leerCola().filter((p) => JSON.stringify(p) !== clave));
}

async function enviarConReintentos(payload: AffinitySubmissionPayload) {
  let outcome = await submitAffinityToWebhook(payload);
  for (const espera of REINTENTOS_MS) {
    if (outcome !== "failed") break;
    await new Promise((listo) => setTimeout(listo, espera));
    outcome = await submitAffinityToWebhook(payload);
  }
  return outcome;
}

let vaciandoCola = false;
async function vaciarCola() {
  if (vaciandoCola) return;
  vaciandoCola = true;
  try {
    const pendientes = leerCola();
    if (!pendientes.length) return;
    const quedan: AffinitySubmissionPayload[] = [];
    for (const payload of pendientes) {
      if ((await submitAffinityToWebhook(payload)) === "failed") quedan.push(payload);
    }
    // Lo que se agrego mientras se enviaba va al final de la cola.
    guardarCola([...quedan, ...leerCola().slice(pendientes.length)]);
  } finally {
    vaciandoCola = false;
  }
}

/**
 * Estado del Test de Afinidad. Recibe las preguntas y lecturas ya en el idioma
 * del visitante (las prepara el servidor), para no descargar los tres idiomas.
 */
export function useAffinityTest(lang: Lang, questions: Question[], narrativas: Record<RaceKey, RaceResult>) {
  const mensajes = MENSAJES[lang];
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string | undefined>>([]);
  const [scores, setScores] = useState<Scores>(() => createInitialScores());
  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [affinityMode, setAffinityMode] = useState<AffinityMode>("quiz");
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const hasSubmittedRef = useRef(false);
  const ultimoEnvioRef = useRef<AffinitySubmissionPayload | null>(null);

  // Reenvia resultados que quedaron pendientes en este telefono.
  useEffect(() => {
    void vaciarCola();
    const alVolverLaConexion = () => void vaciarCola();
    window.addEventListener("online", alVolverLaConexion);
    return () => window.removeEventListener("online", alVolverLaConexion);
  }, []);

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
      nextErrors.name = mensajes.nombre;
    }

    if (!user.email.trim()) {
      nextErrors.email = mensajes.email;
    } else if (!EMAIL_REGEX.test(user.email.trim())) {
      nextErrors.email = mensajes.emailInvalido;
    }

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function startTest() {
    if (!validateUser()) {
      return false;
    }

    setSessionQuestions(prepareQuestionsForSession(questions));
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(createInitialScores());
    setResults(null);
    setAffinityMode("quiz");
    setSubmissionStatus("idle");
    hasSubmittedRef.current = false;
    setPhase("questions");
    return true;
  }

  function startRandomAffinity() {
    if (!validateUser()) {
      return false;
    }

    const randomScores = puntosAleatorios();
    const randomResults = calcularResultados(randomScores, narrativas, lang);

    setSessionQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(randomScores);
    setResults(randomResults);
    setAffinityMode("random");
    setSubmissionStatus("idle");
    hasSubmittedRef.current = false;
    setPhase("results");

    void submitParticipantResult(randomResults, randomScores, "random");
    return true;
  }

  async function guardar(payload: AffinitySubmissionPayload) {
    setSubmissionStatus("saving");
    const outcome = await enviarConReintentos(payload);

    if (outcome === "saved") {
      quitarDeCola(payload);
      setSubmissionStatus("saved");
      return;
    }

    if (outcome === "skipped") {
      setSubmissionStatus("idle");
      hasSubmittedRef.current = false;
      return;
    }

    // Sin conexion: se queda guardado en el telefono para reenviarlo despues.
    if (!leerCola().some((p) => JSON.stringify(p) === JSON.stringify(payload))) {
      guardarCola([...leerCola(), payload]);
    }
    setSubmissionStatus("error");
  }

  async function submitParticipantResult(
    finalResults: CalculatedResults,
    finalScores: Scores,
    mode: AffinityMode,
  ) {
    if (hasSubmittedRef.current) {
      return;
    }

    hasSubmittedRef.current = true;
    const payload: AffinitySubmissionPayload = {
      name: user.name.trim(),
      email: user.email.trim(),
      dominantResult: finalResults.dominant.narrative.name,
      secondaryResult: finalResults.secondary?.narrative.name ?? null,
      dominantRace: finalResults.dominant.race,
      secondaryRace: finalResults.secondary?.race ?? null,
      scores: finalScores,
      subscribed: false,
      mode,
      lang,
    };
    ultimoEnvioRef.current = payload;
    await guardar(payload);
  }

  /** Boton "Reintentar" cuando el guardado fallo. */
  function reintentarGuardado() {
    if (ultimoEnvioRef.current && submissionStatus !== "saving") {
      void guardar(ultimoEnvioRef.current);
    }
  }

  function handleOptionSelect(optionId: string) {
    if (!currentQuestion || isAutoAdvancing) {
      return;
    }

    const previousAnswerId = answers[currentQuestionIndex];
    const previousOption = findOptionById(currentQuestion, previousAnswerId);
    const nextOption = findOptionById(currentQuestion, optionId);

    if (!nextOption || previousAnswerId === optionId) {
      return;
    }

    let nextScores = scores;

    if (previousOption) {
      nextScores = applyOptionPoints(nextScores, previousOption, -1);
    }

    nextScores = applyOptionPoints(nextScores, nextOption, 1);

    const nextAnswers = [...answers];
    nextAnswers[currentQuestionIndex] = optionId;
    setAnswers(nextAnswers);

    setScores(nextScores);
    setIsAutoAdvancing(true);

    setTimeout(() => {
      if (currentQuestionIndex < sessionQuestions.length - 1) {
        setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
        setIsAutoAdvancing(false);
        return;
      }

      const finalResults = calcularResultados(nextScores, narrativas, lang, preferenciasVisuales(sessionQuestions, nextAnswers));
      setResults(finalResults);
      setAffinityMode("quiz");
      setPhase("results");
      void submitParticipantResult(finalResults, nextScores, "quiz");
      setIsAutoAdvancing(false);
    }, AUTO_ADVANCE_DELAY_MS);
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

  function resetTest() {
    setPhase("intro");
    setUser({ name: "", email: "" });
    setFormErrors({});
    setSessionQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScores(createInitialScores());
    setResults(null);
    setAffinityMode("quiz");
    setSubmissionStatus("idle");
    hasSubmittedRef.current = false;
    ultimoEnvioRef.current = null;
  }

  return {
    phase,
    user,
    formErrors,
    sessionQuestions,
    currentQuestionIndex,
    answers,
    scores,
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
  };
}
