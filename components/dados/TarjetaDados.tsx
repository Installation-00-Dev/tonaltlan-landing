import Dado, { formaDe } from "@/components/dados/Dado";
import MarcoTarjeta from "@/components/juega/MarcoTarjeta";
import { DADOS, DEIDAD_DE_DADO } from "@/lib/dados-core";
import { ruta, t, type Lang } from "@/lib/i18n";
import { themeFor } from "@/lib/site";

/** Invitacion a Dados de los Siete en /juega: los siete dados en SVG, el nombre y una linea. */
export default function TarjetaDados({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = t(lang).paginas;
  return (
    <MarcoTarjeta href={ruta(lang, "/juega/dados/")} tono="turquesa" className={className}>
      <div className="flex flex-col gap-5">
        <div className="flex items-end gap-1" aria-hidden="true">
          {DADOS.map((tipo) => (
            <Dado
              key={tipo}
              forma={formaDe(tipo)}
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
    </MarcoTarjeta>
  );
}
