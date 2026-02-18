"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function About() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Text column */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-gold md:text-4xl">
            {"Que es Tonaltlan?"}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
            {/* PLACEHOLDER: Reemplaza con tu texto real */}
            <p>
              Tonaltlan es un juego de rol de mesa ambientado en un mundo inspirado en las
              grandes civilizaciones mesoamericanas. Aqui, los jugadores encarnan heroes
              elegidos por los dioses, portadores de un Tonalli unico que define su
              conexion con el cosmos.
            </p>
            <p>
              Navega por selvas sagradas, explora templos olvidados y enfrenta a criaturas
              nacidas del Mictlan. Cada sesion es una oportunidad para tejer leyendas
              que perduraran en los codices de tu mesa.
            </p>
            <p>
              Con un sistema de reglas intuitivo disenado para fomentar la narrativa
              colaborativa, Tonaltlan es perfecto tanto para narradores experimentados
              como para quienes se adentran por primera vez en el mundo del rol.
            </p>
          </div>
        </div>

        {/* Illustration panel */}
        <div className="flex items-center justify-center">
          <div className="glass-card flex aspect-[4/3] w-full items-center justify-center rounded-2xl p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <svg
                className="h-16 w-16 text-gold/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-sm text-muted">
                {/* PLACEHOLDER: Aqui ira una ilustracion */}
                Espacio para ilustracion del mundo de Tonaltlan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
