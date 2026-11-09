import type { ReactNode } from "react";

export interface AnchorSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface AnchorPageProps {
  header: ReactNode;
  sections: AnchorSection[];
  /** Etiqueta del indice lateral. */
  indexLabel?: string;
}

/**
 * Pagina larga con indice lateral fijo (desktop) y secciones numeradas.
 * Se usa en /mundo y /juega.
 */
export default function AnchorPage({ header, sections, indexLabel = "En esta página" }: AnchorPageProps) {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {header}

        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label={indexLabel} className="sticky top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{indexLabel}</p>
              <ol className="space-y-1 border-l border-slate-800">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex items-baseline gap-3 border-l border-transparent py-2 pl-4 text-sm text-slate-400 transition-colors hover:border-amber-400 hover:text-amber-300"
                    >
                      <span className="font-serif text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-20 lg:col-span-9">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="font-serif text-sm text-amber-400/70">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-serif text-2xl font-bold tracking-wide text-slate-100 md:text-3xl">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
