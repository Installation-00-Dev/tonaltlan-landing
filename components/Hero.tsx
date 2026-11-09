import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background image */}
      <Image
        src="/images/piramides_azteca_final_1920.webp"
        alt=""
        fill
        className="scale-105 object-cover object-center"
        priority
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Velo de obsidiana: legible arriba, funde con el fondo slate-900 abajo */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.14)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <div className="mb-10 flex w-full justify-center">
          <Image
            src="/images/tonaltlan_logo_1200.webp"
            alt="Logo de Tonaltlan"
            width={600}
            height={180}
            className="drop-shadow-[0_0_40px_rgba(251,191,36,0.25)]"
            sizes="(max-width: 768px) 85vw, 600px"
            style={{ width: "min(600px, 85vw)", height: "auto" }}
          />
        </div>

        <h1 className="mb-10 font-serif text-4xl font-bold uppercase tracking-[0.12em] text-slate-100 drop-shadow-[0_2px_16px_rgba(15,23,42,0.8)] md:text-5xl lg:text-6xl">
          Tu Aventura Comienza
        </h1>

        {/* Unico CTA principal del sitio */}
        <Link
          href="/explorar"
          className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-amber-400 px-12 py-4 font-serif text-base font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/25 ring-1 ring-amber-300/60 transition duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
        >
          Explorar
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </Link>
      </div>

      {/* Indicador visual de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <svg className="h-6 w-6 motion-safe:animate-bounce text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
