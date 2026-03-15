import SectionHeader from "@/components/compendio/SectionHeader";
import TagChips from "@/components/compendio/TagChips";
import { especies } from "@/lib/data";
import Image from "next/image";

export const metadata = {
  title: "Especies - Tonaltlan",
  description: "Explora las especies jugables de Tonaltlan: humanos, ahuizotl, tlalocan-i y mas.",
};

export default function EspeciesPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title="Especies"
          subtitle="Seres nacidos del maiz, la obsidiana y el aliento de los dioses. Aqui puedes ver todas las especies en una sola pantalla."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {especies.map((item) => {
            const descriptionSection = item.sections.find((section) => section.title === "Descripcion");
            const noteSection = item.sections.find((section) => section.title === "Nota");

            return (
              <article key={item.slug} className="glass-card overflow-hidden rounded-2xl">
                <div className="relative h-56 w-full bg-background/40">
                  {item.coverImageSrc ? (
                    <Image
                      src={item.coverImageSrc}
                      alt={item.coverImageAlt || `${item.name} en Tonaltlan`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                      Imagen pendiente
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>

                <div className="p-6 md:p-7">
                  <h2 className="mb-2 font-serif text-2xl font-semibold text-gold">{item.name}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{item.description}</p>

                  <div className="mb-5">
                    <TagChips tags={item.tags} variant="teal" />
                  </div>

                  {descriptionSection ? (
                    <div className="mb-4 rounded-xl border border-glass-border bg-background/25 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                        Descripcion
                      </p>
                      <p className="text-sm leading-relaxed text-muted">{descriptionSection.content}</p>
                    </div>
                  ) : null}

                  {noteSection ? (
                    <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                        Nota
                      </p>
                      <p className="text-sm leading-relaxed text-muted">{noteSection.content}</p>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
