import Link from "next/link";
import { ruta, t, type Lang } from "@/lib/i18n";

/**
 * Invitacion al Test de Afinidad (titulo y texto de la pagina Juega).
 * Se usa en /juega y al final de cada ficha de especie.
 */
export default function TarjetaTest({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas.juega;
  return (
    <Link
      href={ruta(lang, "/afinidad/")}
      className={`group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-oro-400/15 via-selva-800/60 to-selva-900 p-8 ring-1 ring-oro-400/30 transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:ring-oro-400/70 md:flex-row md:items-center md:justify-between md:p-10 ${className}`}
    >
      <div>
        <p className="mb-2 font-display text-2xl text-jade-400">{d.afinidadTitulo}</p>
        <p className="max-w-xl text-base leading-relaxed text-selva-300">{d.afinidadTexto}</p>
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
