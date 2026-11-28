import Image from "next/image";
import Link from "next/link";
import { DEIDAD_DE_GLIFO, GLIFOS } from "@/lib/danza-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { emblemas } from "@/lib/site";

/** Invitacion a la Danza Tonal en /juega: los siete glifos, el nombre del juego y una linea. */
export default function TarjetaDanza({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas;
  return (
    <Link
      href={ruta(lang, "/juega/danza-tonal/")}
      className={`group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-jade-400/15 via-selva-800/60 to-selva-900 p-8 ring-1 ring-jade-400/30 transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:ring-jade-400/70 md:flex-row md:items-center md:justify-between md:p-10 ${className}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex -space-x-2.5" aria-hidden="true">
          {GLIFOS.map((glifo) => (
            <Image
              key={glifo}
              src={emblemas[DEIDAD_DE_GLIFO[glifo]]}
              alt=""
              width={256}
              height={256}
              className="h-11 w-11 rounded-full ring-2 ring-selva-900 md:h-12 md:w-12"
            />
          ))}
        </div>
        <div>
          <p className="mb-2 font-display text-2xl text-jade-400">{d.danza.titulo}</p>
          <p className="max-w-xl text-base leading-relaxed text-selva-300">{d.juega.danzaTexto}</p>
        </div>
      </div>
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oro-400 text-selva-950 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
        aria-hidden="true"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
        </svg>
      </span>
    </Link>
  );
}
