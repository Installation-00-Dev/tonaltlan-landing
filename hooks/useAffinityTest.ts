"use client";

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

export type TestPhase = "intro" | "questions" | "results";

export interface FormErrors {
  name?: string;
  email?: string;
}

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
    setPhase("questions");
    return true;
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
      return false;
    }

    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
      return true;
    }

    setResults(calculateResults(scores));
    setPhase("results");
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
    currentQuestion,
    currentAnswerId,
    totalQuestions,
    updateUserField,
    startTest,
    handleOptionSelect,
    previousQuestion,
    nextQuestion,
    resetTest,
  };
}