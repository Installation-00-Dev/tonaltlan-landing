"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import Image from "next/image";

export default function About() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        {/* Text column */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="mb-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-2 w-2 rotate-45 bg-amber-400" />
            <span className="h-px w-12 bg-gradient-to-r from-amber-400/70 to-transparent" />
          </div>

          <h2 className="mb-8 font-serif text-3xl font-bold tracking-wide text-amber-300 md:text-4xl lg:text-5xl">
            {"Que es Tonaltlan?"}
          </h2>

          <div className="max-w-prose space-y-6 border-l-2 border-amber-400/40 pl-6 text-base leading-8 text-slate-300 md:text-lg md:leading-8">
            <p className="text-slate-100">
              Tonaltlan es un juego de rol de mesa ambientado en un mundo inspirado en las grandes
              civilizaciones mesoamericanas. Utiliza un sistema de reglas basado en Dungeons &amp;
              Dragons 2024, adaptado para reflejar la cosmovision y las fuerzas divinas de este
              universo.
            </p>
            <p>
              Aqui, los jugadores encarnan heroes elegidos por los dioses, capaces de despertar los
              Puntos Tonal, centros de energia espiritual que conectan a los mortales con las
              deidades elementales y el equilibrio del cosmos.
            </p>
            <p>
              Navega por selvas sagradas, explora templos olvidados y enfrenta a criaturas
              provenientes del Mictlan mismo. Cada sesion es una oportunidad para tejer leyendas que
              perduraran en los codices de tu mesa, mientras descubres nuevas clases, criaturas,
              regiones y tradiciones inspiradas en la cosmovision mesoamericana.
            </p>
          </div>
        </div>

        {/* Illustration panel */}
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-800 shadow-2xl shadow-slate-950/60 ring-1 ring-slate-700">
            <Image
              src="/images/Piramide_onix_color_final_1.webp"
              alt="Piramide de onix en Tonaltlan rodeada de energia mistica"
              fill
              className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-amber-300/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
