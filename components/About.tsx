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
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Text column: Estela narrativa tipo codice */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="mb-3 flex items-center gap-3" aria-hidden="true">
            <span className="h-2 w-2 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-gradient-to-r from-gold/60 to-transparent" />
          </div>

          <h2 className="mb-8 font-serif text-3xl font-bold tracking-wide text-gold md:text-4xl lg:text-5xl">
            {"Que es Tonaltlan?"}
          </h2>

          <div className="space-y-5 border-l-2 border-gold/30 pl-6 text-base leading-relaxed text-muted md:text-lg">
            <p className="text-foreground/90">
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

        {/* Illustration panel: Piramide de onix con marco ritual */}
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30 bg-[#0b101b] shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(197,160,89,0.12)]">
            <Image
              src="/images/Piramide_onix_color_final_1.webp"
              alt="Piramide de onix en Tonaltlan rodeada de energia mistica"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,196,95,0.35)_0%,rgba(245,196,95,0)_60%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,163,177,0)_30%,rgba(15,163,177,0.28)_50%,rgba(15,163,177,0)_70%)] opacity-70 [animation:tonalSweep_6s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/25" />
          </div>
        </div>
      </div>
    </section>
  );
}

