import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";

export const metadata = {
  title: "Bestiario - Tonaltlan",
  description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas.",
};

// Regiones tomadas de las etiquetas del Bestiario en la landing.
const regiones = ["Mictlan", "Selva", "Celestial"];
const atributos = ["FUE", "DES", "CON", "INT", "SAB", "CAR"];

function Campo({ className = "" }: { className?: string }) {
  return <span className={`block h-3 rounded bg-slate-700/70 ${className}`} />;
}

export default function BestiarioPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Compendio"
          eyebrowHref="/explorar"
          title="Bestiario"
          subtitle="Criaturas del Mictlan y bestias de selvas y montanas sagradas."
        />

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Región</span>
          {regiones.map((region) => (
            <span
              key={region}
              className="rounded-full bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-slate-700"
            >
              {region}
            </span>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Plantilla: asi se vera cada criatura (ficha estilo manual de monstruos) */}
          <article
            aria-label="Ejemplo de ficha de criatura"
            className="overflow-hidden rounded-3xl bg-slate-800/40 ring-1 ring-slate-700/70"
          >
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-b from-violet-500/15 via-slate-800/40 to-slate-900">
              <span className="rounded-full border border-dashed border-slate-600 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                Ilustración
              </span>
            </div>
            <div className="space-y-5 p-6 md:p-8" aria-hidden="true">
              <div className="space-y-2">
                <Campo className="h-6 w-1/2 bg-slate-600/70" />
                <Campo className="w-1/3" />
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
              <div className="grid grid-cols-3 gap-3 text-xs">
                {["CA", "PG", "Velocidad"].map((label) => (
                  <div key={label} className="rounded-lg bg-slate-900/60 p-3">
                    <p className="mb-2 font-semibold uppercase tracking-wider text-amber-400/90">{label}</p>
                    <Campo className="w-2/3" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-2 text-center text-xs">
                {atributos.map((attr) => (
                  <div key={attr} className="rounded-lg bg-slate-900/60 p-2">
                    <p className="mb-2 font-semibold text-slate-400">{attr}</p>
                    <Campo className="mx-auto w-8" />
                  </div>
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">Acciones</p>
                <Campo />
                <Campo className="w-5/6" />
                <Campo className="w-2/3" />
              </div>
            </div>
          </article>

          <Pendiente id="bestiario" className="h-fit" />
        </div>
      </div>
    </div>
  );
}
