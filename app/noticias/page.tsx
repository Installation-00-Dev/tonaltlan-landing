import SectionHeader from "@/components/compendio/SectionHeader";
import Pendiente from "@/components/ui/Pendiente";

export const metadata = {
  title: "Noticias - Tonaltlan",
  description: "Avances del desarrollo de Tonaltlan.",
};

export default function NoticiasPage() {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeader eyebrow="Estudio" title="Noticias" />

        {/* Esqueleto de como se vera cada entrada */}
        <div className="mb-10 grid gap-6 md:grid-cols-2" aria-hidden="true">
          {[0, 1].map((index) => (
            <div key={index} className="overflow-hidden rounded-2xl bg-slate-800/40 ring-1 ring-slate-700/70">
              <div className="aspect-[16/9] w-full motion-safe:animate-pulse bg-slate-800" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-24 rounded bg-slate-700" />
                <div className="h-5 w-3/4 rounded bg-slate-700" />
                <div className="h-3 w-full rounded bg-slate-800" />
                <div className="h-3 w-5/6 rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        <Pendiente id="noticias" />
      </div>
    </div>
  );
}
