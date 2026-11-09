import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

interface SectionHeaderProps {
  title: string;
  /** Frase destacada bajo el titulo (en la fuente de titulos). */
  lema?: string;
  /** Texto bajo el titulo. Acepta varios parrafos. */
  subtitle?: string | string[];
  /** Seccion padre: se muestra como ruta de navegacion ("Compendio /") solo si tiene enlace. */
  eyebrow?: string;
  eyebrowHref?: string;
  center?: boolean;
  lang?: Lang;
}

/**
 * Encabezado de pagina. Sin etiquetas decorativas sobre el titulo (criterio de
 * Impeccable): el titulo habla por si mismo. La ruta de navegacion solo aparece
 * cuando lleva a algun lado.
 */
export default function SectionHeader({ title, lema, subtitle, eyebrow, eyebrowHref, center = false, lang = "es" }: SectionHeaderProps) {
  const parrafos = subtitle === undefined ? [] : Array.isArray(subtitle) ? subtitle : [subtitle];

  return (
    <header className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && eyebrowHref ? (
        <nav aria-label={t(lang).comun.ruta} className="mb-4 text-sm text-selva-400">
          <Link href={eyebrowHref} className="transition-colors hover:text-jade-300">
            {eyebrow}
          </Link>
          <span className="mx-2 text-selva-600" aria-hidden="true">
            /
          </span>
        </nav>
      ) : null}
      <h1 className="mb-5 font-display text-5xl text-jade-400 [text-wrap:balance] md:text-6xl">{title}</h1>
      {lema ? (
        <p className={`mb-4 max-w-2xl font-display text-2xl text-selva-100 md:text-3xl ${center ? "mx-auto" : ""}`}>{lema}</p>
      ) : null}
      {parrafos.length > 0 && (
        <div className={`max-w-2xl space-y-4 text-base leading-relaxed text-selva-300 md:text-lg ${center ? "mx-auto" : ""}`}>
          {parrafos.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>
      )}
    </header>
  );
}
