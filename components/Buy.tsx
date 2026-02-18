"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function Buy() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="conseguir"
      ref={sectionRef}
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="glass-card mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-2xl p-8 md:flex-row md:p-12">
          {/* Book placeholder panel */}
          <div className="flex aspect-[3/4] w-full max-w-[260px] flex-shrink-0 items-center justify-center rounded-xl bg-foreground/5 md:max-w-[220px] lg:max-w-[280px]">
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <svg
                className="h-14 w-14 text-gold/50"
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
              <p className="text-xs text-muted">
                {/* PLACEHOLDER */}
                Portada del Manual Basico
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-1 flex-col text-center md:text-left">
            <h2 className="mb-4 font-serif text-3xl font-bold text-gold md:text-4xl">
              Conseguir el Juego
            </h2>
            <p className="mb-3 text-base leading-relaxed text-muted md:text-lg">
              {/* PLACEHOLDER: Reemplaza con tu texto real */}
              El Manual Basico de Tonaltlan incluye todo lo que necesitas: reglas
              completas, el sistema de Tonalli, guia para crear personajes, un bestiario
              de criaturas miticas y una aventura introductoria lista para jugar.
            </p>
            <p className="mb-8 text-sm text-muted">
              {/* PLACEHOLDER */}
              Disponible en formato digital. Edicion fisica proximamente.
            </p>

            <div>
              <a
                href="#newsletter"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-gold bg-gold/10 px-8 py-3 text-base font-semibold text-gold-light transition-colors hover:bg-gold/20"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
