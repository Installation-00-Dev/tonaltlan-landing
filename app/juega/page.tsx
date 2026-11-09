import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import AnchorPage from "@/components/ui/AnchorPage";
import Pendiente from "@/components/ui/Pendiente";
import { features } from "@/lib/features";

export const metadata = {
  title: "Juega - Tonaltlan",
  description: "Todo lo necesario para jugar en Tonaltlan: cómo empezar, Test de Afinidad, descargas y recursos para narradores.",
};

function FeatureCard({ title }: { title: string }) {
  const feature = features.find((item) => item.title === title);
  if (!feature) return null;
  return (
    <div className="rounded-2xl bg-slate-800/40 p-6 ring-1 ring-slate-700/70 md:p-8">
      <div className="mb-4 inline-flex rounded-xl bg-amber-400/10 p-3 text-amber-300 ring-1 ring-amber-400/25">
        {feature.icon}
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-slate-100">{feature.title}</h3>
      <p className="text-sm leading-7 text-slate-300 md:text-base">{feature.description}</p>
    </div>
  );
}

export default function JuegaPage() {
  return (
    <AnchorPage
      header={<SectionHeader eyebrow="Tonaltlan" title="Juega" />}
      sections={[
        {
          id: "como-empezar",
          title: "Cómo empezar",
          content: <Pendiente id="juega-como-empezar" />,
        },
        {
          id: "afinidad",
          title: "Test de Afinidad",
          content: (
            <Link
              href="/afinidad"
              className="group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400/15 via-slate-800/60 to-slate-900 p-8 ring-1 ring-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:ring-amber-400/70 md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div>
                <p className="mb-2 font-serif text-2xl font-bold text-amber-300">Test de Afinidad</p>
                <p className="max-w-xl text-base leading-relaxed text-slate-300">
                  Descubre con que energia racial resuena tu energia tonal. Responde las preguntas y encuentra tu afinidad en el mundo de Tonaltlan.
                </p>
              </div>
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-950 transition-transform duration-300 group-hover:translate-x-1"
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
          title: "Descargas",
          content: (
            <div className="space-y-6">
              <FeatureCard title="Codices de Personaje" />
              <Pendiente id="juega-descargas" />
            </div>
          ),
        },
        {
          id: "narradores",
          title: "Narradores",
          content: (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FeatureCard title="Guias para Narradores" />
                <FeatureCard title="Construye tu Mundo" />
              </div>
              <Pendiente id="juega-narradores" />
            </div>
          ),
        },
      ]}
    />
  );
}
