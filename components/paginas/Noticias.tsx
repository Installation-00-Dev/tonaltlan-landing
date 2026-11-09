import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";
import { metaPagina, t, type Lang } from "@/lib/i18n";

export function metadataNoticias(lang: Lang) {
  const d = t(lang).paginas.noticias;
  return metaPagina(lang, "/noticias/", d.meta, d.metaDesc);
}

export default function Noticias({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.noticias;
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeader lang={lang} eyebrow="Estudio" title={d.titulo} />

        {/* Esqueleto de como se vera cada entrada */}
        <div className="mb-10 grid gap-6 md:grid-cols-2" aria-hidden="true">
          {[0, 1].map((index) => (
            <div key={index} className="overflow-hidden rounded-2xl bg-selva-800/40 ring-1 ring-selva-700/70">
              <div className="aspect-[16/9] w-full motion-safe:animate-pulse bg-selva-800" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-24 rounded bg-selva-700" />
                <div className="h-5 w-3/4 rounded bg-selva-700" />
                <div className="h-3 w-full rounded bg-selva-800" />
                <div className="h-3 w-5/6 rounded bg-selva-800" />
              </div>
            </div>
          ))}
        </div>

        <Pendiente id="noticias" lang={lang} />
      </div>
    </div>
  );
}
