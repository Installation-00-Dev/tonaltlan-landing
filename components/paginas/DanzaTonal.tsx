import Image from "next/image";
import Link from "next/link";
import TarjetaTest from "@/components/afinidad/TarjetaTest";
import DanzaTonalCliente, { type GlifoDanza } from "@/components/danza/DanzaTonalCliente";
import { getCompendio } from "@/lib/compendio";
import { DEIDAD_DE_GLIFO, GLIFOS } from "@/lib/danza-core";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { emblemas, themeFor } from "@/lib/site";

const RUTA = "/juega/danza-tonal/";

export function metadataDanzaTonal(lang: Lang) {
  const d = t(lang).paginas.danza;
  return metaPagina(lang, RUTA, d.meta, d.metaDesc);
}

/** Las dos figuras de los Puntos Tonal (arte de /mundo), cada una en sus tres capas. */
const FIGURAS = [
  ["tonal_figura_silueta", "tonal_figura_corazon", "tonal_figura_energia"],
  ["tonal_figura_hombre_silueta", "tonal_figura_hombre_corazon", "tonal_figura_hombre_energia"],
].map((capas) => capas.map((nombre) => variante(`/images/mundo/${nombre}.webp`, 360)));

/**
 * Danza Tonal (/juega/danza-tonal): minijuego de memoria con los glifos de los siete dioses.
 * El servidor arma los datos de cada glifo en el idioma del visitante (emblema, color de
 * su deidad y nombres del compendio) y los textos; la parte interactiva vive en DanzaTonalCliente.
 * En escritorio lo acompaña el Mitotiani, el Danzante Tonal, con enlace a su clase.
 */
export default function DanzaTonal({ lang }: { lang: Lang }) {
  const textos = t(lang);
  const d = textos.paginas.danza;
  const { deidades, clases } = getCompendio(lang);
  const glifos: GlifoDanza[] = GLIFOS.map((id) => {
    const slug = DEIDAD_DE_GLIFO[id];
    const deidad = deidades.find((x) => x.slug === slug);
    return {
      id,
      emblema: emblemas[slug],
      color: themeFor(slug).hex,
      deidad: deidad?.name ?? slug,
      elemento: deidad?.tags[0] ?? id,
    };
  });
  const mitotiani = clases.find((c) => c.slug === "mitotiani");

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] xl:gap-20">
          {mitotiani?.coverImageSrc ? (
            <Link
              href={ruta(lang, "/clases/#mitotiani")}
              className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-jade-400/15 via-selva-800/40 to-selva-900 ring-1 ring-selva-700/70 transition duration-200 hover:ring-jade-400/60 lg:block"
            >
              <Image
                src={variante(mitotiani.coverImageSrc, 1200)}
                alt={mitotiani.coverImageAlt ?? mitotiani.name}
                fill
                className="object-contain p-8"
                sizes="(min-width: 1280px) 560px, 45vw"
              />
            </Link>
          ) : null}

          <div className="lg:order-none">
            <header className="mx-auto mb-6 max-w-[26rem]">
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

            <DanzaTonalCliente glifos={glifos} figuras={FIGURAS} textos={d} enlace={`https://tonaltlan.com${ruta(lang, RUTA)}`} />
          </div>
        </div>

        <TarjetaTest lang={lang} className="mt-20" />
      </div>
    </div>
  );
}
