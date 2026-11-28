import Link from "next/link";
import { ruta, t, type Lang } from "@/lib/i18n";

/** Encabezado de la página de cada juego: ruta "Juega /", nombre y cómo se juega. */
export default function EncabezadoJuego({
  lang,
  titulo,
  instruccion,
  className,
}: {
  lang: Lang;
  titulo: string;
  instruccion: string;
  className: string;
}) {
  const textos = t(lang);
  return (
    <header className={className}>
      <nav aria-label={textos.comun.ruta} className="mb-3 text-sm text-selva-400">
        <Link href={ruta(lang, "/juega/")} className="transition-colors hover:text-jade-300">
          {textos.paginas.juega.titulo}
        </Link>
        <span className="mx-2 text-selva-600" aria-hidden="true">
          /
        </span>
      </nav>
      <h1 className="font-display text-4xl text-jade-400 md:text-5xl">{titulo}</h1>
      <p className="mt-3 text-base leading-relaxed text-selva-300">{instruccion}</p>
    </header>
  );
}
