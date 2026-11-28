"use client";

import { useState } from "react";
import { getFeatures } from "@/lib/features";
import { t, type Lang } from "@/lib/i18n";

/*
 * "Tonaltlan de un Vistazo" como quincunce: el cosmograma mesoamericano de los
 * cuatro rumbos y el centro. El titulo vive en el emblema central y cada tema
 * ocupa un rumbo; al pasar el cursor (o enfocar) un tema se ilumina su rayo.
 */

type Rumbo = "norte" | "este" | "oeste" | "sur";

// Orden de los textos en lib/features.tsx -> rumbo que ocupa cada uno.
const RUMBOS: Rumbo[] = ["norte", "este", "oeste", "sur"];

const celda: Record<Rumbo, string> = {
  norte: "lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:text-center lg:items-center",
  este: "lg:col-start-3 lg:row-start-2 lg:text-left lg:items-start",
  oeste: "lg:col-start-1 lg:row-start-2 lg:text-right lg:items-end",
  sur: "lg:col-span-3 lg:col-start-1 lg:row-start-3 lg:text-center lg:items-center",
};

// Rayo de cada rumbo en el emblema (viewBox 0 0 320 320, centro 160,160).
const rayo: Record<Rumbo, { x1: number; y1: number; x2: number; y2: number }> = {
  norte: { x1: 160, y1: 52, x2: 160, y2: 4 },
  este: { x1: 268, y1: 160, x2: 316, y2: 160 },
  oeste: { x1: 52, y1: 160, x2: 4, y2: 160 },
  sur: { x1: 160, y1: 268, x2: 160, y2: 316 },
};

function Emblema({ activo }: { activo: Rumbo | null }) {
  return (
    <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Anillos */}
      <circle cx="160" cy="160" r="108" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="160" cy="160" r="96" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" strokeDasharray="6 6" />
      <circle cx="160" cy="160" r="82" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      {/* Escalones en los cuatro rumbos */}
      {(Object.keys(rayo) as Rumbo[]).map((r) => {
        const { x1, y1, x2, y2 } = rayo[r];
        const on = activo === r;
        return (
          <g key={r} className="transition-colors duration-200" style={{ color: on ? "#f5b82e" : "currentColor" }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={on ? 1 : 0.35} strokeWidth={on ? 3 : 1.5} />
            {/* Rombo sobre el anillo exterior, en la direccion del rumbo */}
            <rect
              x={160 + ((x1 - 160) / 108) * 108 - 7}
              y={160 + ((y1 - 160) / 108) * 108 - 7}
              width="14"
              height="14"
              transform={`rotate(45 ${160 + ((x1 - 160) / 108) * 108} ${160 + ((y1 - 160) / 108) * 108})`}
              fill="currentColor"
              fillOpacity={on ? 1 : 0.3}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Features({ lang = "es" }: { lang?: Lang }) {
  const features = getFeatures(lang);
  const [activo, setActivo] = useState<Rumbo | null>(null);

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1fr_20rem_1fr] lg:grid-rows-[auto_20rem_auto] lg:gap-x-12 lg:gap-y-8 lg:px-8">
        {/* Centro: emblema con el titulo */}
        <div className="relative mx-auto aspect-square w-64 text-jade-400 sm:w-72 lg:col-start-2 lg:row-start-2 lg:w-80">
          <Emblema activo={activo} />
          <h2 className="absolute inset-0 flex items-center justify-center px-[24%] text-center font-display text-2xl leading-tight text-jade-400 [text-wrap:balance] sm:text-3xl">
            {t(lang).vistazo.titulo}
          </h2>
        </div>

        {/* Los cuatro rumbos */}
        {features.map((feature, index) => {
          const rumbo = RUMBOS[index] ?? "sur";
          const on = activo === rumbo;
          return (
            <article
              key={feature.title}
              tabIndex={0}
              onMouseEnter={() => setActivo(rumbo)}
              onMouseLeave={() => setActivo(null)}
              onFocus={() => setActivo(rumbo)}
              onBlur={() => setActivo(null)}
              className={`flex max-w-md flex-col gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-oro-300 ${celda[rumbo]} ${
                rumbo === "norte" || rumbo === "sur" ? "lg:mx-auto lg:max-w-md" : "lg:max-w-sm"
              }`}
            >
              <div
                className={`flex items-center gap-3 font-display text-2xl transition-colors duration-200 md:text-3xl ${
                  on ? "text-oro-300" : "text-selva-50"
                } ${rumbo === "oeste" ? "lg:flex-row-reverse" : ""} ${rumbo === "norte" || rumbo === "sur" ? "lg:justify-center" : ""}`}
              >
                <span className="shrink-0 text-oro-400 [&>svg]:h-7 [&>svg]:w-7" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
              </div>
              <p className="text-base leading-7 text-selva-300">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
