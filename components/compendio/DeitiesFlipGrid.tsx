"use client";

import SectionHeader from "@/components/compendio/SectionHeader";
import TagChips from "@/components/compendio/TagChips";
import type { CompendiumEntry } from "@/lib/data";
import Image from "next/image";
import { useMemo, useState } from "react";

interface DeitiesFlipGridProps {
  items: CompendiumEntry[];
}

const FALLBACK_IMAGE = "/images/piramides_azteca_final_1920.jpg";

function firstParagraph(text: string): string {
  const normalized = text.replace(/\n+/g, " ").trim();
  const firstSentence = normalized.split(".")[0]?.trim();

  if (!firstSentence) {
    return normalized;
  }

  return `${firstSentence}.`;
}

export default function DeitiesFlipGrid({ items }: DeitiesFlipGridProps) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const cards = useMemo(
    () =>
      items.map((item) => {
        const imageSrc = item.coverImageSrc || FALLBACK_IMAGE;
        const backText = firstParagraph(item.sections[0]?.content || item.description);

        return {
          ...item,
          imageSrc,
          backText,
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
          title="Deidades"
          subtitle="Toca cada tarjeta para verla al reverso. Al frente veras su imagen; al girar, su descripcion corta."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((item) => {
            const isFlipped = Boolean(flipped[item.slug]);

            return (
              <div key={item.slug} className="h-[420px] [perspective:1200px]">
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
                      <div className="relative h-[62%] w-full">
                        <Image
                          src={item.imageSrc}
                          alt={item.coverImageAlt || `${item.name} en Tonaltlan`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />
                      </div>

                      <div className="flex h-[38%] flex-col justify-between p-5">
                        <div>
                          <h2 className="mb-2 font-serif text-2xl font-semibold text-gold">{item.name}</h2>
                          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{item.description}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <TagChips tags={item.tags.slice(0, 3)} variant="gold" />
                          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                            Tocar para girar
                          </span>
                        </div>
                      </div>
                    </article>

                    <article className="glass-card absolute inset-0 flex rounded-2xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex w-full flex-col justify-between gap-4">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal">Descripcion</p>
                          <h3 className="mb-3 font-serif text-2xl font-semibold text-gold">{item.name}</h3>
                          <p className="text-sm leading-relaxed text-muted">{item.backText}</p>
                        </div>

                        <div>
                          <TagChips tags={item.tags.slice(0, 3)} variant="teal" />
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
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
