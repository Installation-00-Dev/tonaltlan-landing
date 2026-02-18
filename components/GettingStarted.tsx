"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function GettingStarted() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="empezar"
      ref={sectionRef}
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="mb-6 font-serif text-3xl font-bold text-gold md:text-4xl">
          {"Como Empezar"}
        </h2>

        <p className="mb-4 text-base leading-relaxed text-muted md:text-lg">
          {/* PLACEHOLDER: Reemplaza con tu texto real */}
          Reunir a tu grupo es el primer paso hacia una aventura inolvidable. Solo
          necesitas el Manual Basico de Tonaltlan, un set de dados, papel para tu Codice
          de Personaje y la voluntad de explorar un mundo donde la mitologia cobra vida.
        </p>
        <p className="mb-8 text-base leading-relaxed text-muted md:text-lg">
          {/* PLACEHOLDER */}
          Ya seas un narrador veterano o un aventurero primerizo, Tonaltlan te guia paso
          a paso con ejemplos, consejos y aventuras listas para jugar desde la primera
          sesion.
        </p>

        <a
          href="#conseguir"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
        >
          Descarga la Guia Rapida
        </a>
      </div>
    </section>
  );
}
