import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Greca from "@/components/ui/Greca";
import { getFeatures } from "@/lib/features";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { getTextos } from "@/lib/textos";

/** Capas de la figura de los Puntos Tonal (arte del estudio, nov. 2026). */
const FIGURAS_TONAL = [
  "/images/mundo/tonal_figura_silueta.webp",
  "/images/mundo/tonal_figura_corazon.webp",
  "/images/mundo/tonal_figura_energia.webp",
];

export function metadataMundo(lang: Lang) {
  const d = t(lang).paginas.mundo;
  return metaPagina(lang, "/mundo/", d.meta, d.metaDesc, "/images/galeria/cosmovision_og.jpg");
}

export default function Mundo({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.mundo;
  const cosmovision = getTextos(lang).mundo.cosmovision;
  const sistemaTonal = getFeatures(lang).find((feature) => feature.id === "Sistema Tonal");
  return (
    <AnchorPage
      indexLabel={t(lang).comun.secciones}
      header={<SectionHeader lang={lang} eyebrow="Tonaltlan" title={d.titulo} />}
      sections={[
        {
          id: "cosmovision",
          title: d.secciones.cosmovision,
          content: (
            <div>
              <figure className="mb-10 overflow-hidden rounded-2xl ring-1 ring-selva-700/70">
                <Image
                  src={variante("/images/galeria/cosmovision.webp", 1600)}
                  alt={d.cosmovisionAlt}
                  width={1600}
                  height={685}
                  priority
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 960px"
                />
              </figure>
              <div className="max-w-3xl">
              <p className="font-display text-2xl leading-snug text-selva-100 [text-wrap:balance] md:text-3xl">
                {cosmovision.titulo}
              </p>
              <div className="mt-6 max-w-[65ch] space-y-5 text-base leading-8 text-selva-300">
                {cosmovision.parrafos.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
              <Greca className="mt-10 w-40 text-oro-400/60" />
              <p className="mt-6 font-display text-2xl text-jade-400 [text-wrap:balance]">{cosmovision.cierre}</p>
              </div>
            </div>
          ),
        },
        {
          id: "puntos-tonal",
          title: d.secciones.puntos,
          content: (
            <div className="space-y-6">
              {sistemaTonal ? (
                <div className="flex gap-5 rounded-2xl bg-selva-800/40 p-6 ring-1 ring-selva-700/70 md:p-8">
                  <div className="h-fit shrink-0 rounded-xl bg-oro-400/10 p-3 text-oro-300 ring-1 ring-oro-400/25">
                    {sistemaTonal.icon}
                  </div>
                  <p className="max-w-[65ch] text-base leading-8 text-selva-300">{sistemaTonal.description}</p>
                </div>
              ) : null}
              {/* La figura de los Puntos Tonal por capas: silueta, los siete en el pecho y el Tonal recorriendo el cuerpo. */}
              <ol className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-3 ring-1 ring-selva-700 md:grid-cols-3 md:gap-4 md:p-5">
                {FIGURAS_TONAL.map((src, i) => (
                  <li key={src} className={i === FIGURAS_TONAL.length - 1 ? "col-span-2 md:col-span-1" : undefined}>
                    <Image
                      src={variante(src, i === FIGURAS_TONAL.length - 1 ? 1200 : 480)}
                      alt={d.figurasAlt[i]}
                      width={1289}
                      height={1346}
                      className="h-auto w-full"
                      sizes={i === FIGURAS_TONAL.length - 1 ? "(max-width: 768px) 90vw, 300px" : "(max-width: 768px) 45vw, 300px"}
                    />
                  </li>
                ))}
              </ol>
              <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-selva-700">
                <Image
                  src={variante("/images/mundo/puntos_tonales.webp", 1800)}
                  alt={d.puntosAlt}
                  width={1600}
                  height={1125}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </figure>
            </div>
          ),
        },
        {
          id: "regiones",
          title: d.secciones.regiones,
          content: (
            <div className="space-y-6">
              <figure className="overflow-hidden rounded-2xl bg-selva-800 ring-1 ring-selva-700">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={variante("/images/galeria/Mapa.webp", 1800)}
                    alt={d.mapaAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
              </figure>
            </div>
          ),
        },
      ]}
    />
  );
}
