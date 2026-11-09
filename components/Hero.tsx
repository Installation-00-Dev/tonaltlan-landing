import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <Image
        src="/images/piramides_azteca_final_1920.webp"
        alt=""
        fill
        className="object-cover object-center scale-105"
        priority
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Obsidian & Sun-Gold ritual overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#07070a]/85 via-[#07070a]/65 to-[#07070a]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.16)_0%,rgba(45,212,191,0.06)_45%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <div className="group mb-10 flex w-full justify-center">
          <div className="relative inline-block overflow-hidden rounded-2xl p-2">
            <Image
              src="/images/tonaltlan_logo_1200.webp"
              alt="Logo de Tonaltlan"
              width={600}
              height={180}
              className="drop-shadow-[0_0_35px_rgba(197,160,89,0.35)] transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 85vw, 600px"
              style={{ width: "min(600px, 85vw)", height: "auto" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,196,95,0.22)_0%,rgba(245,196,95,0)_70%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          </div>
        </div>

        <h1 className="mb-8 font-serif text-4xl font-bold tracking-[0.12em] uppercase text-gold drop-shadow-[0_4px_24px_rgba(197,160,89,0.3)] md:text-5xl lg:text-6xl">
          Tu Aventura Comienza
        </h1>

        {/* Unico CTA principal en Hero para un flujo de UX limpio */}
        <div className="flex justify-center">
          <Link
            href="/explorar"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-gold/50 bg-gradient-to-r from-gold via-gold-light to-gold px-10 py-3.5 font-serif text-base font-bold tracking-widest uppercase text-[#07070a] shadow-[0_0_30px_rgba(197,160,89,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(45,212,191,0.45)]"
          >
            Explorar
          </Link>
        </div>
      </div>

      {/* Indicador visual de scroll (sin texto repetido) */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center">
          <svg
            className="h-6 w-6 animate-bounce text-gold/75"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

