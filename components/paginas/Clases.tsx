import ClassSelector from "@/components/compendio/ClassSelector";
import SectionHeader from "@/components/compendio/SectionHeader";
import { getCompendio } from "@/lib/compendio";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";
import { getTextos } from "@/lib/textos";

export function metadataClases(lang: Lang) {
  const d = t(lang).paginas.clases;
  return metaPagina(lang, "/clases/", d.meta, d.metaDesc);
}

export default function Clases({ lang }: { lang: Lang }) {
  const textos = getTextos(lang).clases;
  const { clases } = getCompendio(lang);
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          lang={lang}
          eyebrow={t(lang).comun.compendio}
          eyebrowHref={ruta(lang, "/explorar/")}
          title={textos.titulo}
          subtitle={textos.intro}
        />
        <ClassSelector items={clases} lang={lang} />
        <p className="mx-auto mt-20 max-w-2xl text-center font-display text-2xl text-jade-300 [text-wrap:balance] md:text-3xl">
          {textos.cierre}
        </p>
      </div>
    </div>
  );
}
