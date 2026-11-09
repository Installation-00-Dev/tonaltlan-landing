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
 * Pagina larga con indice lateral fijo (desktop).
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-selva-500">{indexLabel}</p>
              <ol className="space-y-1 border-l border-selva-800">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-2 pl-4 text-sm text-selva-400 transition-colors hover:border-oro-400 hover:text-oro-300"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-20 lg:col-span-9">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mb-6 font-display text-3xl text-jade-400 md:text-4xl">{section.title}</h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
