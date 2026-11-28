import MarcoTarjeta from "@/components/juega/MarcoTarjeta";
import { ruta, t, type Lang } from "@/lib/i18n";

/**
 * Invitacion al Test de Afinidad (titulo y texto de la pagina Juega).
 * Se usa en /juega, al pie de la Danza Tonal y al final de cada ficha de especie.
 */
export default function TarjetaTest({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas.juega;
  return (
    <MarcoTarjeta href={ruta(lang, "/afinidad/")} tono="oro" className={className}>
      <div>
        <p className="mb-2 font-display text-2xl text-jade-400">{d.afinidadTitulo}</p>
        <p className="max-w-xl text-base leading-relaxed text-selva-300">{d.afinidadTexto}</p>
      </div>
    </MarcoTarjeta>
  );
}
