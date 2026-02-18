"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import Image from "next/image";

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
          <div className="glass-card relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/preview/images/about-illustration.jpg"
              alt="El mundo de Tonaltlan: piramides ancestrales, selvas sagradas y energia mistica"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
