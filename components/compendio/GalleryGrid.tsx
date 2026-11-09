"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { labelFromPath } from "@/lib/site";
import { variante } from "@/lib/imagenes";

const CLOSE_MS = 150;

/**
 * Mosaico de ilustraciones con vista ampliada (clic, flechas y Esc).
 * Abrir: fondo con fade y la imagen crece desde 0.96 (250ms ease-out).
 * Cerrar con clic: 150ms (salida mas rapida que la entrada).
 * Teclado (Esc / flechas): sin animacion, la respuesta es inmediata.
 */
export default function GalleryGrid({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const finishClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    setClosing(false);
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const close = useCallback(
    (animated: boolean) => {
      if (!animated || prefersReducedMotion()) {
        finishClose();
        return;
      }
      setClosing(true);
      closeTimer.current = setTimeout(finishClose, CLOSE_MS);
    },
    [finishClose],
  );

  function open(index: number, trigger: HTMLElement) {
    triggerRef.current = trigger;
    clearTimeout(closeTimer.current);
    setClosing(false);
    setOpenIndex(index);
  }
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) => (current === null ? null : (current + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
                onClick={(event) => open(index, event.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-selva-800/60 ring-1 ring-selva-700/70 transition duration-200 hover:ring-oro-400/60 motion-safe:active:scale-[0.98]"
                aria-label={`Ampliar ${name}`}
              >
                <Image
                  src={variante(src, 1200)}
                  alt={name}
                  width={800}
                  height={1000}
                  priority={index < 3}
                  className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-selva-950/90 via-selva-950/30 to-transparent px-5 pb-4 pt-12 text-left font-display text-lg text-selva-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
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
          data-closing={closing}
          className="lightbox-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-selva-950/95 p-4 backdrop-blur-sm"
          onClick={() => close(true)}
        >
          <figure
            className="lightbox-content relative flex h-full w-full max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[80vh] w-full">
              <Image src={variante(current, 1800)} alt={labelFromPath(current)} fill className="object-contain" sizes="100vw" />
            </div>
            <figcaption className="mt-4 font-display text-lg text-selva-200">
              {labelFromPath(current)}
              <span className="ml-3 text-sm text-selva-500">
                {openIndex + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            ref={closeButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              close(true);
            }}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-selva-800 text-selva-100 transition duration-150 hover:bg-selva-700 motion-safe:active:scale-[0.97]"
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
              className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-selva-800/80 text-selva-100 transition duration-150 hover:bg-oro-400 hover:text-selva-950 motion-safe:active:scale-[0.97] ${
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
