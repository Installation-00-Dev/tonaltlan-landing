"use client";

import { submitAffinityToWebhook } from "@/lib/affinity-submission";
import {
    EMAIL_REGEX,
    RACE_KEYS,
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
import { useRef, useState } from "react";

const AUTO_ADVANCE_DELAY_MS = 180;
const RANDOM_SCORE_POOL = [12, 10, 8, 6, 4, 3, 2] as const;

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

export function useAffinityTest() {
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
      return false;
    }

    setSessionQuestions(prepareQuestionsForSession());
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

  function buildRandomScores(): Scores {
    const randomizedRaces = [...RACE_KEYS].sort(() => Math.random() - 0.5);
    const nextScores = createInitialScores();

    randomizedRaces.forEach((race, index) => {
      nextScores[race] = RANDOM_SCORE_POOL[index] ?? 0;
    });

    return nextScores;
  }

  function startRandomAffinity() {
    if (!validateUser()) {
      return false;
    }

    const randomScores = buildRandomScores();
    const randomResults = calculateResults(randomScores);

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

  async function submitParticipantResult(
    finalResults: CalculatedResults,
    finalScores: Scores,
    mode: AffinityMode,
  ) {
    if (hasSubmittedRef.current) {
      return;
    }

    hasSubmittedRef.current = true;
    setSubmissionStatus("saving");

    const outcome = await submitAffinityToWebhook({
      name: user.name.trim(),
      email: user.email.trim(),
      dominantResult: finalResults.dominant.narrative.name,
      secondaryResult: finalResults.secondary?.narrative.name ?? null,
      scores: finalScores,
      subscribed: false,
      mode,
    });

    if (outcome === "saved") {
      setSubmissionStatus("saved");
      return;
    }

    if (outcome === "skipped") {
      setSubmissionStatus("idle");
      hasSubmittedRef.current = false;
      return;
    }

    setSubmissionStatus("error");
    hasSubmittedRef.current = false;
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

    setAnswers((previousAnswers) => {
      const nextAnswers = [...previousAnswers];
      nextAnswers[currentQuestionIndex] = optionId;
      return nextAnswers;
    });

    setScores(nextScores);
    setIsAutoAdvancing(true);

    setTimeout(() => {
      if (currentQuestionIndex < sessionQuestions.length - 1) {
        setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
        setIsAutoAdvancing(false);
        return;
      }

      const finalResults = calculateResults(nextScores);
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

  function nextQuestion() {
    if (!currentQuestion || !currentAnswerId) {
      return false;
    }

    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
      return true;
    }

    const finalResults = calculateResults(scores);
    setResults(finalResults);
    setAffinityMode("quiz");
    setPhase("results");
    void submitParticipantResult(finalResults, scores, "quiz");
    return true;
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
    nextQuestion,
    resetTest,
  };
}