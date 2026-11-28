import TarjetaTest from "@/components/afinidad/TarjetaTest";
import TarjetaDados from "@/components/dados/TarjetaDados";
import TarjetaDanza from "@/components/danza/TarjetaDanza";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Pendiente from "@/components/ui/Pendiente";
import { getFeatures } from "@/lib/features";
import { metaPagina, t, type Lang } from "@/lib/i18n";

export function metadataJuega(lang: Lang) {
  const d = t(lang).paginas.juega;
  return metaPagina(lang, "/juega/", d.meta, d.metaDesc);
}

/** `id` es el titulo en espanol del tema (ver lib/features.tsx). */
function FeatureCard({ id, lang }: { id: string; lang: Lang }) {
  const feature = getFeatures(lang).find((item) => item.id === id);
  if (!feature) return null;
  return (
    <div className="rounded-2xl bg-selva-800/40 p-6 ring-1 ring-selva-700/70 md:p-8">
      <h3 className="mb-3 flex items-center gap-3 font-display text-xl text-selva-100">
        <span className="inline-flex shrink-0 rounded-xl bg-oro-400/10 p-2.5 text-oro-300 ring-1 ring-oro-400/25" aria-hidden="true">
          {feature.icon}
        </span>
        {feature.title}
      </h3>
      <p className="text-sm leading-7 text-selva-300 md:text-base">{feature.description}</p>
    </div>
  );
}

export default function Juega({ lang }: { lang: Lang }) {
  const d = t(lang).paginas.juega;
  return (
    <AnchorPage
      indexLabel={t(lang).comun.secciones}
      header={<SectionHeader lang={lang} eyebrow="Tonaltlan" title={d.titulo} />}
      sections={[
        {
          id: "como-empezar",
          title: d.secciones.empezar,
          content: <Pendiente id="juega-como-empezar" lang={lang} />,
        },
        {
          id: "afinidad",
          title: d.secciones.afinidad,
          content: (
            <TarjetaTest lang={lang} />
          ),
        },
        {
          id: "danza-tonal",
          title: d.secciones.danza,
          content: <TarjetaDanza lang={lang} />,
        },
        {
          id: "dados",
          title: d.secciones.dados,
          content: <TarjetaDados lang={lang} />,
        },
        {
          id: "descargas",
          title: d.secciones.descargas,
          content: (
            <div className="space-y-6">
              <FeatureCard id="Códices de Personaje" lang={lang} />
              <Pendiente id="juega-descargas" lang={lang} />
            </div>
          ),
        },
        {
          id: "narradores",
          title: d.secciones.narradores,
          content: (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FeatureCard id="Guías para Narradores" lang={lang} />
                <FeatureCard id="Construye tu Mundo" lang={lang} />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
