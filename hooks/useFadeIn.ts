"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Hace aparecer un elemento cuando entra en pantalla.
 * - Normal: sube 16px y aparece (animate-fade-in).
 * - Reducir movimiento: solo opacidad, sin desplazamiento (animate-fade-only).
 * - Sin IntersectionObserver: se muestra de inmediato para no dejar contenido oculto.
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animationClass = prefersReducedMotion() ? "animate-fade-only" : "animate-fade-in";

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add(animationClass);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(animationClass);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
