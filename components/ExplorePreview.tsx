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
      className="relative py-24 opacity-0 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Encabezado centrado sin boton redundante */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-wide text-gold md:text-4xl">
            Explorar Tonaltlan
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Descubre los secretos del mundo mesoamericano a traves de su compendio viviente.
          </p>
        </div>

        {/* Tarjetas interactivas del compendio sin botones repetitivos en cada card */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exploreSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-[#0f172a]/70 to-[#07070a]/90 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-[0_12px_35px_rgba(45,212,191,0.12)] md:p-7"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-60 transition-opacity group-hover:via-teal/70 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-gold-light">
                    {section.title}
                  </h3>
                  <svg
                    className="h-4 w-4 text-gold/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal"
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
                </div>

                <p className="mb-6 text-sm leading-relaxed text-muted">
                  {section.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <TagChips tags={section.tags} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

