import GalleryGrid from "@/components/compendio/GalleryGrid";
import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { metaPagina, t, type Lang } from "@/lib/i18n";
import { galleryImages } from "@/lib/site";

export function metadataGaleria(lang: Lang) {
  const d = t(lang).paginas.galeria;
  return metaPagina(lang, "/galeria/", d.meta, d.metaDesc);
}

export default function Galeria({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.galeria;
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader lang={lang} eyebrow="Tonaltlan" title={d.titulo} subtitle={d.subtitulo} />
        <GalleryGrid images={galleryImages} lang={lang} />
        <Pendiente id="galeria" className="mt-10" lang={lang} />
      </div>
    </div>
  );
}
