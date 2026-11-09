"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { labelFromPath } from "@/lib/site";

/** Mosaico de ilustraciones con vista ampliada (clic, flechas y Esc). */
export default function GalleryGrid({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) => (current === null ? null : (current + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {images.map((src, index) => {
          const name = labelFromPath(src);
          return (
            <li key={src} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-slate-800/60 ring-1 ring-slate-700/70 transition-all duration-300 hover:ring-amber-400/60"
                aria-label={`Ampliar ${name}`}
              >
                <Image
                  src={src}
                  alt={name}
                  width={800}
                  height={1000}
                  priority={index < 3}
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent px-5 pb-4 pt-12 text-left font-serif text-lg font-semibold text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {current !== null && openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labelFromPath(current)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <figure className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[80vh] w-full">
              <Image src={current} alt={labelFromPath(current)} fill className="object-contain" sizes="100vw" />
            </div>
            <figcaption className="mt-4 font-serif text-lg text-slate-200">
              {labelFromPath(current)}
              <span className="ml-3 text-sm text-slate-500">
                {openIndex + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(direction);
              }}
              aria-label={direction === -1 ? "Anterior" : "Siguiente"}
              className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-800/80 text-slate-100 hover:bg-amber-400 hover:text-slate-950 ${
                direction === -1 ? "left-4" : "right-4"
              }`}
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
      ) : null}
    </>
  );
}
