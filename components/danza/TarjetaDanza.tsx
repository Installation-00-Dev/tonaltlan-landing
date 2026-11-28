import Image from "next/image";
import MarcoTarjeta from "@/components/juega/MarcoTarjeta";
import { DEIDAD_DE_GLIFO, GLIFOS } from "@/lib/danza-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { emblemas } from "@/lib/site";

/** Invitacion a la Danza Tonal en /juega: los siete glifos, el nombre del juego y una linea. */
export default function TarjetaDanza({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas;
  return (
    <MarcoTarjeta href={ruta(lang, "/juega/danza-tonal/")} tono="jade" className={className}>
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
    </MarcoTarjeta>
  );
}
