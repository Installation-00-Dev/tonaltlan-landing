"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import Image from "next/image";

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
          {/* Book cover */}
          <div className="relative aspect-[3/4] w-full max-w-[260px] flex-shrink-0 overflow-hidden rounded-xl md:max-w-[220px] lg:max-w-[280px]">
            <Image
              src="/images/book-cover.jpg"
              alt="Portada del Manual Basico de Tonaltlan"
              fill
              className="object-cover"
              sizes="280px"
            />
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
