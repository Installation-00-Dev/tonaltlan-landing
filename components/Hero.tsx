import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/piramides_azteca_final_1920.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/70" aria-hidden="true" />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-wide text-gold md:text-5xl lg:text-6xl">
          Tu Aventura Comienza
        </h1>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/explorar"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
          >
            Explorar
          </Link>
          <Link
            href="/afinidad"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gold px-8 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Test de Afinidad
          </Link>
        </div>

        <div className="group mt-14 flex w-full justify-center">
          <div className="relative inline-block overflow-hidden rounded-2xl">
            <Image
              src="/images/tonaltlan_logo_1200.png"
              alt="Logo de Tonaltlan"
              width={600}
              height={180}
              className="transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 80vw, 600px"
              style={{ width: "min(600px, 80vw)", height: "auto" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,196,95,0.25)_0%,rgba(245,196,95,0)_70%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted">Explorar</span>
          <svg
            className="h-6 w-6 animate-bounce text-gold"
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
