"use client";

import { useEffect, useRef, useState } from "react";
import { ruta, t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";

/** Datos que van en la imagen para compartir. */
export interface TarjetaAfinidad {
  encabezado: string; // "Ana, eres"
  especie: string;
  slug: string;
  imagen?: string;
  arquetipo: string;
  linaje: string; // "Hijos de Lok · Agua"
  frase: string;
  hex: string; // color de su deidad
  hexTexto: string;
}

// Formato de historia de Instagram. Lo importante va entre y=250 y y=1670:
// arriba y abajo la app pone su propia interfaz.
const ANCHO = 1080;
const ALTO = 1920;

function cargarImagen(src: string) {
  return new Promise<HTMLImageElement>((listo, falla) => {
    const img = new Image();
    img.onload = () => listo(img);
    img.onerror = falla;
    img.src = src;
  });
}

/** Familia real de una clase de fuente (next/font le pone un nombre propio). */
function familiaDe(clase: string) {
  const el = document.createElement("span");
  el.className = clase;
  el.style.cssText = "position:absolute;visibility:hidden";
  el.textContent = "Aa";
  document.body.appendChild(el);
  const familia = getComputedStyle(el).fontFamily;
  el.remove();
  return familia;
}

function conAlfa(hex: string, alfa: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alfa})`;
}

function lineas(ctx: CanvasRenderingContext2D, texto: string, anchoMax: number) {
  const resultado: string[] = [];
  let actual = "";
  for (const palabra of texto.split(/\s+/)) {
    const prueba = actual ? `${actual} ${palabra}` : palabra;
    if (ctx.measureText(prueba).width > anchoMax && actual) {
      resultado.push(actual);
      actual = palabra;
    } else {
      actual = prueba;
    }
  }
  if (actual) resultado.push(actual);
  return resultado;
}

async function dibujar(datos: TarjetaAfinidad, pie: string): Promise<Blob> {
  await document.fonts.ready;
  const display = familiaDe("font-display");
  const sans = familiaDe("font-sans");
  const [logo, retrato] = await Promise.all([
    cargarImagen("/images/tonaltlan_logo_nav.webp"),
    datos.imagen ? cargarImagen(variante(datos.imagen, 1200)) : Promise.resolve(null),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = ANCHO;
  canvas.height = ALTO;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Sin canvas");

  // Fondo selva con el brillo del color de su dios.
  ctx.fillStyle = "#0b1d19";
  ctx.fillRect(0, 0, ANCHO, ALTO);
  const brillo = ctx.createRadialGradient(ANCHO / 2, 760, 0, ANCHO / 2, 760, 820);
  brillo.addColorStop(0, conAlfa(datos.hex, 0.4));
  brillo.addColorStop(1, conAlfa(datos.hex, 0));
  ctx.fillStyle = brillo;
  ctx.fillRect(0, 0, ANCHO, ALTO);

  // Logo y retrato.
  const anchoLogo = 300;
  ctx.drawImage(logo, (ANCHO - anchoLogo) / 2, 250, anchoLogo, (anchoLogo * logo.height) / logo.width);
  if (retrato) {
    const caja = { x: 120, y: 430, w: 840, h: 660 };
    const k = Math.min(caja.w / retrato.width, caja.h / retrato.height);
    const w = retrato.width * k;
    const h = retrato.height * k;
    ctx.drawImage(retrato, caja.x + (caja.w - w) / 2, caja.y + caja.h - h, w, h);
  }

  // Textos centrados.
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  let y = 1160;
  ctx.fillStyle = "#d3e6db";
  ctx.font = `500 44px ${sans}`;
  ctx.fillText(datos.encabezado, ANCHO / 2, y);

  let tam = 160;
  ctx.font = `${tam}px ${display}`;
  while (ctx.measureText(datos.especie).width > 940 && tam > 90) {
    tam -= 6;
    ctx.font = `${tam}px ${display}`;
  }
  y += tam * 0.92;
  ctx.fillStyle = datos.hexTexto;
  ctx.fillText(datos.especie, ANCHO / 2, y);

  y += 104; // aire para las colas de Macondo (la "Q" de Quinametzin)
  ctx.fillStyle = "#ecf5ef";
  ctx.font = `60px ${display}`;
  ctx.fillText(datos.arquetipo, ANCHO / 2, y);

  y += 54;
  ctx.fillStyle = "#86ab9b";
  ctx.font = `400 34px ${sans}`;
  ctx.fillText(datos.linaje, ANCHO / 2, y);

  y += 76;
  ctx.fillStyle = "#d3e6db";
  ctx.font = `400 40px ${sans}`;
  for (const linea of lineas(ctx, datos.frase, 860).slice(0, 3)) {
    ctx.fillText(linea, ANCHO / 2, y);
    y += 56;
  }

  ctx.fillStyle = "#f8cf63";
  ctx.font = `600 34px ${sans}`;
  ctx.fillText(pie, ANCHO / 2, Math.max(y + 30, 1660));

  return new Promise((listo, falla) =>
    canvas.toBlob((blob) => (blob ? listo(blob) : falla(new Error("Sin imagen"))), "image/jpeg", 0.92),
  );
}

function descargar(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Boton principal del resultado: genera una imagen vertical para historias
 * (retrato, nombre, una frase y el logo) y abre el menu de compartir del
 * celular. Donde no se puede compartir archivos (computadora), la descarga.
 * La imagen se prepara en segundo plano al llegar el resultado, para que el
 * menu de compartir abra al instante (iOS lo exige dentro del toque).
 */
export default function CompartirResultado({
  lang,
  datos,
  className = "",
}: {
  lang: Lang;
  datos: TarjetaAfinidad;
  className?: string;
}) {
  const d = t(lang).paginas.afinidad;
  const urlTest = `https://tonaltlan.com${ruta(lang, "/afinidad/")}`;
  const pie = `${d.tarjetaPie} ${urlTest.replace("https://", "").replace(/\/$/, "")}`;
  const [estado, setEstado] = useState<"listo" | "preparando" | "descargada">("listo");
  const blobRef = useRef<Promise<Blob> | null>(null);

  // Prepara la imagen cuando ya termino la animacion del resultado.
  useEffect(() => {
    blobRef.current = null;
    const id = window.setTimeout(() => {
      blobRef.current = dibujar(datos, pie);
      blobRef.current.catch(() => {
        blobRef.current = null;
      });
    }, 1400);
    return () => window.clearTimeout(id);
  }, [datos, pie]);

  async function compartir() {
    setEstado("preparando");
    const nombre = `tonaltlan-${datos.slug}.jpg`;
    let blob: Blob;
    try {
      blob = await (blobRef.current ?? dibujar(datos, pie));
    } catch {
      setEstado("listo");
      return;
    }
    const archivo = new File([blob], nombre, { type: "image/jpeg" });
    const texto = `${d.compartirTexto.replace("{especie}", datos.especie).replace("{arquetipo}", datos.arquetipo)} ${urlTest}`;
    try {
      if (navigator.canShare?.({ files: [archivo] })) {
        await navigator.share({ files: [archivo], text: texto });
        setEstado("listo");
        return;
      }
    } catch (error) {
      // Cancelar el menu de compartir no es un error.
      if ((error as DOMException)?.name === "AbortError") {
        setEstado("listo");
        return;
      }
    }
    descargar(blob, nombre);
    setEstado("descargada");
    window.setTimeout(() => setEstado("listo"), 3000);
  }

  return (
    <>
      <button type="button" onClick={compartir} disabled={estado === "preparando"} className={className}>
        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3m0 0L8 7m4-4l4 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        {estado === "preparando" ? d.preparando : d.compartir}
      </button>
      <span className="sr-only" aria-live="polite">
        {estado === "descargada" ? d.descargada : ""}
      </span>
      {estado === "descargada" ? (
        <span className="text-center text-sm text-selva-300 sm:basis-full">{d.descargada}</span>
      ) : null}
    </>
  );
}
