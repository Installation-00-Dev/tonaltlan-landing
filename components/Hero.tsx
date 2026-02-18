import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/piramides_azteca_final.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        quality={90}
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
        {/* Logo */}
        <Image
          src="/images/tonaltlan_logo.png"
          alt="Tonaltlan"
          width={600}
          height={200}
          className="mb-6 h-auto w-[280px] md:w-[400px] lg:w-[520px]"
          priority
        />

        <h1 className="mb-4 font-serif text-4xl font-bold tracking-wide text-gold md:text-5xl lg:text-6xl">
          Tu Aventura Comienza
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {/* PLACEHOLDER: Reemplaza con tu texto real */}
          Adentrate en un mundo forjado por dioses ancestrales, donde los codices guardan
          secretos milenarios y cada decision marca el destino de civilizaciones enteras.
          Tonaltlan es un juego de rol de mesa que te invita a explorar la grandeza de la
          mitologia mesoamericana.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#conseguir"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-teal px-8 py-3 text-base font-semibold text-background transition-opacity hover:opacity-90"
          >
            Conseguir el Juego
          </a>
          <a
            href="#novedades"
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-gold px-8 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Ver Novedades
          </a>
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
