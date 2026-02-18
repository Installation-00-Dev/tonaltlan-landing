"use client";

import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";
import TagChips from "@/components/compendio/TagChips";

const exploreSections = [
  {
    title: "Clases",
    description: "Guerreros, sacerdotes, hechiceros y mas arquetipos del mundo antiguo.",
    tags: ["Combate", "Magia", "Sigilo"],
    href: "/clases",
  },
  {
    title: "Especies",
    description: "Seres nacidos del maiz, la obsidiana y el aliento de los dioses.",
    tags: ["Humanos", "Nahual", "Tlalocan"],
    href: "/especies",
  },
  {
    title: "Bestiario",
    description: "Criaturas del Mictlan y bestias de selvas y montanas sagradas.",
    tags: ["Mictlan", "Selva", "Celestial"],
    href: "/bestiario",
  },
  {
    title: "Monturas",
    description: "Companeros leales que surcan cielos, rios y caminos ancestrales.",
    tags: ["Voladora", "Acuatica", "Terrestre"],
    href: "/monturas",
  },
  {
    title: "Deidades",
    description: "Los dioses que tejen el destino del cosmos y sus elegidos.",
    tags: ["Creacion", "Destruccion", "Equilibrio"],
    href: "/deidades",
  },
  {
    title: "Galeria",
    description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.",
    tags: ["Arte", "Conceptos", "Mapas"],
    href: "/galeria",
  },
];

export default function ExplorePreview() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="explorar-preview"
      ref={sectionRef}
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 font-serif text-3xl font-bold text-gold md:text-4xl">
              Explorar Tonaltlan
            </h2>
            <p className="max-w-lg text-base text-muted">
              Descubre los secretos del mundo mesoamericano a traves de su compendio viviente.
            </p>
          </div>
          <Link
            href="/explorar"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal px-6 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:flex-shrink-0"
          >
            Ver todo el compendio
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exploreSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="glass-card-hover group flex flex-col rounded-xl p-5 md:p-6"
            >
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-teal md:text-xl">
                {section.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                {section.description}
              </p>
              <div className="mb-4">
                <TagChips tags={section.tags} />
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal">
                Ver
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
