"use client";

import SectionHeader from "@/components/compendio/SectionHeader";
import type { CompendiumEntry } from "@/lib/data";
import Image from "next/image";
import { useMemo, useState } from "react";

interface DeitiesFlipGridProps {
  items: CompendiumEntry[];
  title: string;
  subtitle: string;
  columns?: 2 | 3;
  largeImage?: boolean;
}

const FALLBACK_IMAGE = "/images/piramides_azteca_final_1920.jpg";

export default function DeitiesFlipGrid({ items, title, subtitle, columns = 3, largeImage = false }: DeitiesFlipGridProps) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const cards = useMemo(
    () =>
      items.map((item) => {
        const imageSrc = item.coverImageSrc || FALLBACK_IMAGE;
        const descriptionSection = item.sections.find((section) => section.title === "Descripcion");
        const noteSection = item.sections.find((section) => section.title === "Nota");
        const descriptionText = (descriptionSection?.content || item.description).trim();
        const noteText = noteSection?.content?.trim() || null;

        return {
          ...item,
          imageSrc,
          descriptionText,
          noteText,
        };
      }),
    [items],
  );

  function toggleCard(slug: string) {
    setFlipped((previous) => ({
      ...previous,
      [slug]: !previous[slug],
    }));
  }

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />

        <div className={`grid gap-6 sm:grid-cols-2 ${columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {cards.map((item) => {
            const isFlipped = Boolean(flipped[item.slug]);

            return (
              <div key={item.slug} className="h-[520px] [perspective:1200px] md:h-[560px] lg:h-[600px]">
                <button
                  type="button"
                  aria-pressed={isFlipped}
                  onClick={() => toggleCard(item.slug)}
                  className="block h-full w-full text-left"
                >
                  <div
                    className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    <article className="glass-card absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]">
                      <div className={`relative w-full ${largeImage ? "h-[68%]" : "h-[52%]"}`}>
                        <Image
                          src={item.imageSrc}
                          alt={item.coverImageAlt || `${item.name} en Tonaltlan`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />
                      </div>

                      <div className={`flex flex-col justify-between p-5 ${largeImage ? "h-[32%]" : "h-[48%]"}`}>
                        <div>
                          <h2 className="mb-2 font-serif text-2xl font-semibold text-gold">{item.name}</h2>
                          <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                        </div>
                        <div className="mt-3 flex items-end justify-end">
                          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                            Tocar para girar
                          </span>
                        </div>
                      </div>
                    </article>

                    <article className="glass-card absolute inset-0 flex rounded-2xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex w-full min-h-0 flex-col justify-between gap-4">
                        <div className="min-h-0">
                          <h3 className="mb-3 font-serif text-2xl font-semibold text-gold">{item.name}</h3>
                          <div className="max-h-[270px] space-y-4 overflow-y-auto pr-1 md:max-h-[320px] lg:max-h-[360px]">
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal">Descripcion</p>
                              <p className="text-sm leading-relaxed text-muted whitespace-pre-line">{item.descriptionText}</p>
                            </div>

                            {item.noteText ? (
                              <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Nota</p>
                                <p className="text-sm leading-relaxed text-muted whitespace-pre-line">{item.noteText}</p>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                            Tocar para regresar
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
