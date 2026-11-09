import Image from "next/image";
import Link from "next/link";
import Greca from "@/components/ui/Greca";
import { variante } from "@/lib/imagenes";
import { galleryImages } from "@/lib/site";

// Tira de la franja de Galeria: algunas ilustraciones reales.
const tiraGaleria = galleryImages.filter((src) => !src.includes("Mapa")).slice(0, 5);

const exploreSections: { title: string; description: string; tags: string[]; href: string; imagen?: string }[] = [
  {
    title: "Clases",
    description: "Guerreros, sacerdotes, hechiceros y más arquetipos del mundo antiguo.",
    tags: ["Combate", "Magia", "Sigilo"],
    href: "/clases",
    imagen: "/images/Brujo_Catemaco.webp",
  },
  {
    title: "Especies",
    description: "Seres nacidos del maíz, la obsidiana y el aliento de los dioses.",
    tags: ["Humanos", "Nahual", "Tlalocan"],
    href: "/especies",
    imagen: "/images/especie_Hekari.webp",
  },
  {
    title: "Bestiario",
    description: "Criaturas del Mictlan y bestias de selvas y montañas sagradas.",
    tags: ["Mictlan", "Selva", "Celestial"],
    href: "/bestiario",
  },
  {
    title: "Monturas",
    description: "Compañeros leales que surcan cielos, ríos y caminos ancestrales.",
    tags: ["Voladora", "Acuática", "Terrestre"],
    href: "/monturas",
    imagen: "/images/monturas/ajolote-cue.webp",
  },
  {
    title: "Deidades",
    description: "Los dioses que tejen el destino del cosmos y sus elegidos.",
    tags: ["Creación", "Destrucción", "Equilibrio"],
    href: "/deidades",
    imagen: "/images/Heka.webp",
  },
  {
    title: "Galería",
    description: "Arte conceptual, ilustraciones y vistazos al universo de Tonaltlan.",
    tags: ["Arte", "Conceptos", "Mapas"],
    href: "/galeria",
  },
];

/**
 * Mosaico del compendio: cada seccion se presenta con su arte.
 * Clases ocupa el bloque grande. Las secciones sin contenido (`proximamente`)
 * muestran la greca en lugar de ilustracion.
 */
export default function ExplorePreview({ proximamente = [] }: { proximamente?: string[] }) {
  return (
    <section id="explorar-preview" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl text-jade-400 md:text-5xl">Explorar Tonaltlan</h2>
          <p className="max-w-md text-base leading-relaxed text-selva-300 md:text-right md:text-lg">
            Descubre los secretos del mundo mesoamericano a través de su compendio viviente.
          </p>
        </div>

        <ul className="grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4">
          {exploreSections.map((section, index) => {
            const pendiente = proximamente.includes(section.title);
            const grande = index === 0;
            // La ultima seccion cierra el mosaico como franja de ancho completo.
            const franja = index === exploreSections.length - 1;
            return (
              <li
                key={section.title}
                className={grande ? "sm:col-span-2 sm:row-span-2" : franja ? "sm:col-span-2 lg:col-span-4" : ""}
              >
                <Link
                  href={section.href}
                  className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-selva-800 ring-1 ring-selva-700/70 transition duration-200 hover:ring-jade-400/70 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-300"
                >
                  {franja ? (
                    <div className="absolute inset-y-0 right-0 grid w-full grid-cols-5 md:w-3/5" aria-hidden="true">
                      {tiraGaleria.map((src) => (
                        <div key={src} className="relative overflow-hidden">
                          <Image
                            src={variante(src, 480)}
                            alt=""
                            fill
                            className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                            sizes="(max-width: 768px) 20vw, 12vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : section.imagen ? (
                    <Image
                      src={variante(section.imagen, grande ? 1200 : 480)}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                      sizes={grande ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-center gap-3 text-jade-400/20" aria-hidden="true">
                      <Greca />
                      <Greca className="rotate-180" />
                      <Greca />
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 ${franja ? "bg-gradient-to-t from-selva-950 via-selva-950/60 to-transparent md:bg-gradient-to-r md:via-selva-950/70" : "bg-gradient-to-t from-selva-950 via-selva-950/55 to-transparent"}`}
                    aria-hidden="true"
                  />

                  <div className={`relative p-6 ${franja ? "md:max-w-xl md:p-8" : ""}`}>
                    <div className={`flex items-center gap-3 ${franja ? "" : "justify-between"}`}>
                      <h3 className={`font-display text-selva-50 ${grande || franja ? "text-4xl" : "text-2xl"}`}>{section.title}</h3>
                      {pendiente ? (
                        <span className="shrink-0 rounded-full border border-oro-400/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-oro-300">
                          Próximamente
                        </span>
                      ) : (
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-selva-50/10 text-selva-100 backdrop-blur-sm transition duration-200 motion-safe:group-hover:translate-x-1 group-hover:bg-oro-400 group-hover:text-selva-950"
                          aria-hidden="true"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 leading-relaxed text-selva-200 ${grande || franja ? "max-w-md text-base" : "text-sm"}`}>
                      {section.description}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-turquesa-300/90">{section.tags.join(" · ")}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
