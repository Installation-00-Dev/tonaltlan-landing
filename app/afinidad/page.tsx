"use client";

import { useState } from "react";
import SectionHeader from "@/components/compendio/SectionHeader";

const steps = [
  {
    question: "Cuando enfrentas un desafio, tu primera reaccion es...",
    answers: [
      "Atacar de frente con toda mi fuerza",
      "Buscar informacion y planificar antes de actuar",
      "Adaptarme al momento y improvisar",
      "Reunir aliados y trabajar en equipo",
    ],
  },
  {
    question: "En tu tiempo libre prefieres...",
    answers: [
      "Entrenar y fortalecer mi cuerpo",
      "Estudiar los codices y textos antiguos",
      "Explorar lugares desconocidos",
      "Conversar y conocer nuevas personas",
    ],
  },
  {
    question: "Si un dios te ofreciera un don, elegirias...",
    answers: [
      "Fuerza sobrehumana",
      "Conocimiento absoluto",
      "La capacidad de transformarme",
      "El don de la persuasion",
    ],
  },
];

export default function AfinidadPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const isComplete = answers.length === steps.length;

  function handleAnswer(answerIndex: number) {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function reset() {
    setCurrentStep(0);
    setAnswers([]);
  }

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <SectionHeader
          title="Test de Afinidad"
          subtitle="Descubre cual es tu clase ideal en el mundo de Tonaltlan. Responde unas preguntas y encuentra tu destino."
        />

        {/* Progress dots */}
        <div className="mb-8 flex items-center justify-center gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full transition-colors ${
                i < answers.length
                  ? "bg-teal"
                  : i === currentStep
                    ? "bg-gold"
                    : "bg-glass-border"
              }`}
              aria-label={`Paso ${i + 1} de ${steps.length}`}
            />
          ))}
        </div>

        {isComplete ? (
          /* Result placeholder */
          <div className="glass-card rounded-2xl p-8 text-center md:p-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-gold md:text-3xl">
              Tu Afinidad
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted">
              {/* PLACEHOLDER: Aqui ira el resultado real del test */}
              Tu Tonalli resuena con las fuerzas ancestrales. Proximamente revelaremos
              tu clase ideal basada en tus respuestas. Este espacio sera reemplazado
              con la logica completa del test de afinidad.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          /* Question card */
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <p className="mb-2 text-sm font-medium text-teal">
              Pregunta {currentStep + 1} de {steps.length}
            </p>
            <h2 className="mb-8 font-serif text-xl font-semibold text-foreground md:text-2xl">
              {steps[currentStep].question}
            </h2>
            <div className="flex flex-col gap-3">
              {steps[currentStep].answers.map((answer, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="glass-card-hover min-h-[48px] rounded-xl px-5 py-4 text-left text-base font-medium text-foreground"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
