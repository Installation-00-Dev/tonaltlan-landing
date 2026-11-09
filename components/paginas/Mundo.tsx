import Image from "next/image";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Pendiente from "@/components/ui/Pendiente";
import { getFeatures } from "@/lib/features";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";

export function metadataMundo(lang: Lang) {
  const d = t(lang).paginas.mundo;
  return metaPagina(lang, "/mundo/", d.meta, d.metaDesc);
}

export default function Mundo({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.mundo;
  const sistemaTonal = getFeatures(lang).find((feature) => feature.id === "Sistema Tonal");
  return (
    <AnchorPage
      indexLabel={t(lang).comun.secciones}
      header={<SectionHeader lang={lang} eyebrow="Tonaltlan" title={d.titulo} />}
      sections={[
        {
          id: "cosmovision",
          title: d.secciones.cosmovision,
          content: <Pendiente id="mundo-cosmovision" lang={lang} />,
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
                  <p className="text-base leading-8 text-selva-300">{sistemaTonal.description}</p>
                </div>
              ) : null}
              <Pendiente id="mundo-puntos-tonal" lang={lang} />
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
              <Pendiente id="mundo-regiones" lang={lang} />
            </div>
          ),
        },
        {
          id: "historia",
          title: d.secciones.historia,
          content: <Pendiente id="mundo-historia" lang={lang} />,
        },
      ]}
    />
  );
}
