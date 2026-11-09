import type { ReactNode } from "react";
import Greca from "@/components/ui/Greca";

export interface AnchorSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface AnchorPageProps {
  header: ReactNode;
  sections: AnchorSection[];
  /** Nombre accesible del indice (no se muestra). */
  indexLabel?: string;
}

/**
 * Pagina larga por secciones (se usa en /mundo y /juega).
 * Arriba, las secciones como accesos directos (tambien en movil); cada seccion
 * se separa con la greca.
 */
export default function AnchorPage({ header, sections, indexLabel = "Secciones" }: AnchorPageProps) {
  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {header}

        <nav aria-label={indexLabel} className="-mt-4 mb-16">
          <ul className="flex flex-wrap gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center rounded-full bg-selva-800 px-5 py-2.5 font-display text-lg text-selva-100 ring-1 ring-selva-700 transition duration-200 hover:bg-jade-400/15 hover:text-jade-200 hover:ring-jade-400/60 motion-safe:active:scale-[0.97]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              {index > 0 ? <Greca className="mb-16 text-oro-400/30" /> : null}
              <h2 className="mb-8 font-display text-4xl text-jade-400 md:text-5xl">{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
