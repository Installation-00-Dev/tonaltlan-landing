import Link from "next/link";
import Dado from "@/components/dados/Dado";
import { DADOS, DEIDAD_DE_DADO } from "@/lib/dados-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { themeFor } from "@/lib/site";

/** Invitacion a Dados de los Siete en /juega: los siete dados en SVG, el nombre y una linea. */
export default function TarjetaDados({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas;
  return (
    <Link
      href={ruta(lang, "/juega/dados/")}
      className={`group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-turquesa-400/15 via-selva-800/60 to-selva-900 p-8 ring-1 ring-turquesa-400/30 transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:ring-turquesa-400/70 md:flex-row md:items-center md:justify-between md:p-10 ${className}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-1" aria-hidden="true">
          {DADOS.map((tipo) => (
            <Dado
              key={tipo}
              forma={tipo === "d100" ? "d10" : tipo}
              color={themeFor(DEIDAD_DE_DADO[tipo]).hex}
              doble={tipo === "d100"}
              className="h-10 w-10 md:h-11 md:w-11"
            />
          ))}
        </div>
        <div>
          <p className="mb-2 font-display text-2xl text-jade-400">{d.dados.titulo}</p>
          <p className="max-w-xl text-base leading-relaxed text-selva-300">{d.juega.dadosTexto}</p>
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
