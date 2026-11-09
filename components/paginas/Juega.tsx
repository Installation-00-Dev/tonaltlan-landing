import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Pendiente from "@/components/ui/Pendiente";
import { getFeatures } from "@/lib/features";
import { metaPagina, ruta, t, type Lang } from "@/lib/i18n";

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
      <div className="mb-4 inline-flex rounded-xl bg-oro-400/10 p-3 text-oro-300 ring-1 ring-oro-400/25">
        {feature.icon}
      </div>
      <h3 className="mb-2 font-display text-xl text-selva-100">{feature.title}</h3>
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
            <Link
              href={ruta(lang, "/afinidad/")}
              className="group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-oro-400/15 via-selva-800/60 to-selva-900 p-8 ring-1 ring-oro-400/30 transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] hover:ring-oro-400/70 md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div>
                <p className="mb-2 font-display text-2xl text-jade-400">{d.afinidadTitulo}</p>
                <p className="max-w-xl text-base leading-relaxed text-selva-300">{d.afinidadTexto}</p>
              </div>
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oro-400 text-selva-950 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </span>
            </Link>
          ),
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
              <Pendiente id="juega-narradores" lang={lang} />
            </div>
          ),
        },
      ]}
    />
  );
}
