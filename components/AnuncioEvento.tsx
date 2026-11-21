"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { t, type Lang } from "@/lib/i18n";
import { getTextos } from "@/lib/textos";

const CLOSE_MS = 150;

/**
 * Anuncio del proximo evento: los carteles se abren en grande al entrar a la
 * landing (uno de ellos, al azar) y se cierran con la X, el boton "Cerrar", un clic fuera o Esc.
 * - Solo aparece mientras el evento no ha pasado (`anuncioHasta` en lib/textos.ts).
 * - Una vez cerrado, no vuelve a salir en la misma sesion del navegador.
 * - Entra desde scale(0.96) con opacidad y cierra mas rapido (clases .lightbox-*).
 */
export default function AnuncioEvento({ lang = "es" }: { lang?: Lang }) {
  const d = t(lang).comun;
  const noticia = getTextos(lang).noticias.find((n) => n.anuncioHasta);
  const clave = noticia ? `anuncio-cerrado:${noticia.id}` : "";
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focoPrevio = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Decide en el navegador si se muestra (fecha y si ya se cerro en esta sesion).
  useEffect(() => {
    if (!noticia?.anuncioHasta || Date.now() > Date.parse(noticia.anuncioHasta)) return;
    try {
      if (sessionStorage.getItem(clave)) return;
    } catch {
      // Sin acceso a sessionStorage: se muestra igual.
    }
    focoPrevio.current = document.activeElement as HTMLElement | null;
    setIndice(Math.floor(Math.random() * noticia.imagenes.length));
    setAbierto(true);
  }, [noticia, clave]);

  const finishClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    setClosing(false);
    setAbierto(false);
    try {
      sessionStorage.setItem(clave, "1");
    } catch {
      // Sin almacenamiento: puede volver a salir en la siguiente visita.
    }
    focoPrevio.current?.focus?.();
  }, [clave]);

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

  useEffect(() => {
    if (!abierto) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(false);
      // El foco no sale del anuncio mientras esta abierto.
      if (event.key === "Tab" && dialogRef.current) {
        const botones = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const i = botones.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        botones[(i + (event.shiftKey ? -1 : 1) + botones.length) % botones.length]?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [abierto, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  if (!abierto || !noticia) return null;
  const cartel = noticia.imagenes[indice] ?? noticia.imagenes[0];

  // Portal a <body>: la landing vive en un contenedor con z-10 y la barra quedaria encima.
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${noticia.titulo}. ${noticia.lugar}, ${noticia.fecha}`}
      data-closing={closing}
      className="lightbox-backdrop fixed inset-0 z-[70] flex flex-col items-center justify-center bg-selva-950/95 px-4 py-16 backdrop-blur-sm"
      onClick={() => close(true)}
    >
      <div
        className="lightbox-content flex max-h-full w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Un solo cartel, elegido al azar cada vez que se abre el anuncio */}
        <div className="relative aspect-[1131/1600] w-[min(82vw,26rem)] overflow-hidden rounded-2xl ring-1 ring-selva-700 md:w-auto md:h-[min(78vh,42rem)]">
          {/* Los carteles miden 1131 px de ancho: se usa el original para verlos nitidos en grande. */}
          <Image src={cartel.src} alt={cartel.alt} fill priority className="object-cover" sizes="(max-width: 768px) 82vw, 480px" />
        </div>

        <button
          type="button"
          onClick={() => close(true)}
          className="mt-6 rounded-full bg-oro-400 px-8 py-3 text-sm font-semibold text-selva-950 transition duration-200 hover:bg-oro-300 motion-safe:active:scale-[0.97]"
        >
          {d.cerrar}
        </button>
      </div>

      <button
        type="button"
        ref={closeButtonRef}
        onClick={(e) => {
          e.stopPropagation();
          close(true);
        }}
        aria-label={d.cerrar}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-selva-800 text-selva-100 transition duration-150 hover:bg-selva-700 motion-safe:active:scale-[0.97]"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
