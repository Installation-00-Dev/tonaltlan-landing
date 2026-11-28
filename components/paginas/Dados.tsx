import Link from "next/link";
import DadosCliente, { type InfoDado } from "@/components/dados/DadosCliente";
import TarjetaDanza from "@/components/danza/TarjetaDanza";
import { DADOS, DEIDAD_DE_DADO } from "@/lib/dados-core";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
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
  const textos = t(lang);
  const d = textos.paginas.dados;
  const dados: InfoDado[] = DADOS.map((tipo) => ({
    tipo,
    color: themeFor(DEIDAD_DE_DADO[tipo]).hex,
    emblema: emblemas[DEIDAD_DE_DADO[tipo]],
  }));

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 max-w-[28rem]">
          <nav aria-label={textos.comun.ruta} className="mb-3 text-sm text-selva-400">
            <Link href={ruta(lang, "/juega/")} className="transition-colors hover:text-jade-300">
              {textos.paginas.juega.titulo}
            </Link>
            <span className="mx-2 text-selva-600" aria-hidden="true">
              /
            </span>
          </nav>
          <h1 className="font-display text-4xl text-jade-400 md:text-5xl">{d.titulo}</h1>
          <p className="mt-3 text-base leading-relaxed text-selva-300">{d.instruccion}</p>
        </header>

        <DadosCliente dados={dados} textos={d} />

        <TarjetaDanza lang={lang} className="mt-20" />
      </div>
    </div>
  );
}
