import MountCarousel from "@/components/compendio/MountCarousel";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
import { mountImages } from "@/lib/site";

export function metadataMonturas(lang: Lang) {
  const d = t(lang).paginas.monturas;
  return metaPagina(lang, "/monturas/", d.meta, d.metaDesc);
}

export default function Monturas({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.monturas;
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          lang={lang}
          eyebrow={t(lang).comun.compendio}
          eyebrowHref={ruta(lang, "/explorar/")}
          title={d.titulo}
          subtitle={d.subtitulo}
        />
        <MountCarousel images={mountImages} lang={lang} />
        <Pendiente id="monturas" className="mt-10" lang={lang} />
      </div>
    </div>
  );
}
