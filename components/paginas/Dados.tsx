import DadosCliente from "@/components/dados/DadosCliente";
import type { InfoDado } from "@/components/dados/comun";
import EncabezadoJuego from "@/components/juega/EncabezadoJuego";
import TarjetaJuego from "@/components/juega/TarjetaJuego";
import { DADOS, DEIDAD_DE_DADO } from "@/lib/dados-core";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { emblemas, themeFor } from "@/lib/site";

const RUTA = "/juega/dados/";

export function metadataDados(lang: Lang) {
  const d = t(lang).paginas.dados;
  return metaPagina(lang, RUTA, d.meta, d.metaDesc);
}

/**
 * Dados de los Siete (/juega/dados): tirador de dados de rol para la mesa.
 * Cada dado lleva el color y el emblema de una deidad (decisión de diseño, sin
 * lore nuevo). La parte interactiva vive en DadosCliente.
 */
export default function Dados({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.dados;
  const dados: InfoDado[] = DADOS.map((tipo) => ({
    tipo,
    color: themeFor(DEIDAD_DE_DADO[tipo]).hex,
    emblema: emblemas[DEIDAD_DE_DADO[tipo]],
  }));

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <EncabezadoJuego lang={lang} titulo={d.titulo} instruccion={d.instruccion} className="mb-6 max-w-[28rem]" />

        <DadosCliente dados={dados} textos={d} />

        <TarjetaJuego juego="danza" lang={lang} className="mt-20" />
      </div>
    </div>
  );
}
