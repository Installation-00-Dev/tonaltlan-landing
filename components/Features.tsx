"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const features = [
  {
    title: "Sistema Tonal",
    description:
      "Un sistema unico de energia espiritual que conecta a tu personaje con las fuerzas cosmicas mesoamericanas. Tu energia tonal define tus habilidades, tu destino y tu relacion con los dioses.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Codices de Personaje",
    description:
      "Hojas de personaje inspiradas en los codices prehispanicos. Registra hazanas, habilidades tonales y la historia de tu heroe en un formato visual que honra la tradicion mesoamericana.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Construye tu Mundo",
    description:
      "Herramientas para que los narradores creen sus propios reinos, facciones y leyendas dentro del universo de Tonaltlan. Cada mesa es un mundo unico lleno de posibilidades.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Guias para Narradores",
    description:
      "Consejos, tablas aleatorias, generadores de aventuras y recursos disenados para que dirigir partidas sea tan emocionante como jugarlas. Ideal para narradores de todos los niveles.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export default function Features() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-3xl font-bold tracking-wide text-amber-300 md:text-4xl">
          Tonaltlan de un Vistazo
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/40 p-8 ring-1 ring-slate-700/70 transition-colors duration-300 hover:bg-slate-800/70 hover:ring-slate-600 md:p-10"
            >
              <div className="mb-6 inline-flex rounded-xl bg-amber-400/10 p-3.5 text-amber-300 ring-1 ring-amber-400/25">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-slate-100 md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-slate-300 md:text-base md:leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

