import Link from "next/link";
import SectionHeader from "@/components/compendio/SectionHeader";
import { pendientes } from "@/lib/pendientes";

export const metadata = {
  title: "Contenido pendiente - Tonaltlan",
  robots: { index: false, follow: false },
};

export default function PendientesPage() {
  const items = Object.entries(pendientes).filter(([, info]) => info.necesita.length > 0);

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Uso interno"
          title="Contenido pendiente"
          subtitle={`${items.length} secciones esperan contenido. Cada tarjeta indica qué se necesita y en qué página aparece.`}
        />

        <ol className="space-y-4">
          {items.map(([id, info], index) => (
            <li key={id} className="rounded-2xl bg-selva-800/40 p-6 ring-1 ring-selva-700/70">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg text-selva-100">
                  <span className="mr-3 text-sm text-oro-400/70">{String(index + 1).padStart(2, "0")}</span>
                  {info.titulo}
                </h2>
                <Link href={info.donde} className="text-sm font-medium text-oro-300 hover:text-oro-200 hover:underline">
                  {info.donde}
                </Link>
              </div>
              <ul className="space-y-1.5 text-sm leading-relaxed text-selva-300">
                {info.necesita.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-selva-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
