"use client";

import Image from "next/image";
import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { labelFromPath } from "@/lib/site";
import { variante } from "@/lib/imagenes";

const tints = ["from-rose-400/20", "from-oro-400/20", "from-turquesa-400/20", "from-sky-400/20"];

export default function MountCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-2">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => scrollBy(direction)}
            aria-label={direction === -1 ? "Anterior" : "Siguiente"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-selva-800 text-selva-200 ring-1 ring-selva-700 transition duration-150 hover:bg-oro-400 hover:text-selva-950 motion-safe:active:scale-[0.97]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={direction === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
        ))}
      </div>

      <ul
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto motion-safe:scroll-smooth px-6 pb-6 [scrollbar-width:thin] lg:-mx-8 lg:px-8"
      >
        {images.map((src, index) => {
          const name = labelFromPath(src, "Montura");
          return (
            <li
              key={src}
              className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            >
              <article className="group overflow-hidden rounded-3xl bg-selva-800/40 ring-1 ring-selva-700/70 transition duration-200 hover:ring-oro-400/60">
                <div className={`relative aspect-[3/4] bg-gradient-to-b ${tints[index % tints.length]} via-selva-800/40 to-selva-900`}>
                  <Image
                    src={variante(src, 1200)}
                    alt={name}
                    fill
                    priority={index < 3}
                    className="object-contain p-6 transition-transform duration-500 motion-safe:group-hover:scale-105"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 31vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <h2 className="font-display text-xl text-selva-100">{name}</h2>
                  <span className="rounded-full border border-dashed border-selva-600 px-3 py-1 text-[11px] uppercase tracking-wider text-selva-500">
                    Tipo
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
