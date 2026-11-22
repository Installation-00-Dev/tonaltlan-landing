export interface AffinitySubmissionPayload {
  name: string;
  email: string;
  dominantResult: string;
  secondaryResult: string | null;
  /** Clave de la especie (igual en ambos idiomas, util para comparar en la hoja). */
  dominantRace: string;
  secondaryRace: string | null;
  scores: Record<string, number>;
  /** true en las suscripciones de "Mantente Informado". */
  subscribed: boolean;
  /** quiz/random: Test de Afinidad. newsletter: suscripcion desde la landing (sin datos del test). */
  mode: "quiz" | "random" | "newsletter";
  /** Idioma del sitio en el que se envio. */
  lang: "es" | "en" | "fr";
}

/** Fila de la hoja para una suscripcion: mismas columnas que el test, vacias salvo correo y subscribed. */
export function payloadSuscripcion(email: string, lang: AffinitySubmissionPayload["lang"]): AffinitySubmissionPayload {
  return {
    name: "",
    email: email.trim(),
    dominantResult: "",
    secondaryResult: null,
    dominantRace: "",
    secondaryRace: null,
    scores: {},
    subscribed: true,
    mode: "newsletter",
    lang,
  };
}

export type AffinitySubmissionOutcome = "saved" | "failed" | "skipped";

const WEBHOOK_TIMEOUT_MS = 8000;

export async function submitAffinityToWebhook(
  payload: AffinitySubmissionPayload,
): Promise<AffinitySubmissionOutcome> {
  const endpoint =
    process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_AFFINITY_WEBHOOK_URL?.trim() ||
    "https://script.google.com/macros/s/AKfycby91JQLzjqMfiW-5sTQ6X8potfntyLlvEFMPF0L6v9RwUuh_N-fOlQ7oSfJn1I2k3QEcQ/exec";

  if (!endpoint) {
    return "skipped";
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  const body = JSON.stringify({
    ...payload,
    submittedAt: new Date().toISOString(),
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        // text/plain avoids CORS preflight with Apps Script endpoints.
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
      signal: controller.signal,
    });

    return response.ok ? "saved" : "failed";
  } catch {
    try {
      // Best-effort fallback for deployments that still block CORS reads.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body,
      });

      return "saved";
    } catch {
      return "failed";
    }
  } finally {
    clearTimeout(timeout);
  }
}

/* ── Guardado a prueba de Wi-Fi de convención ──────────────────
   1. Se reintenta 2 veces con espera, solo si el envio no salio
      (sin conexion): asi no se duplican filas en la hoja.
   2. Si aun falla, se guarda en el telefono y se reenvia al volver la
      conexion o la proxima vez que se abra el sitio (vaciarCola).     */
const REINTENTOS_MS = [1500, 4000];
const COLA_KEY = "tonaltlan-afinidad-pendientes";
const COLA_MAX = 50;

function leerCola(): AffinitySubmissionPayload[] {
  try {
    const guardado = JSON.parse(localStorage.getItem(COLA_KEY) ?? "[]");
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

function guardarCola(cola: AffinitySubmissionPayload[]) {
  try {
    if (cola.length) localStorage.setItem(COLA_KEY, JSON.stringify(cola.slice(-COLA_MAX)));
    else localStorage.removeItem(COLA_KEY);
  } catch {
    // Sin almacenamiento (modo privado): solo queda el boton de reintentar.
  }
}

const mismaFila = (a: AffinitySubmissionPayload, b: AffinitySubmissionPayload) => JSON.stringify(a) === JSON.stringify(b);

async function enviarConReintentos(payload: AffinitySubmissionPayload) {
  let outcome = await submitAffinityToWebhook(payload);
  for (const espera of REINTENTOS_MS) {
    if (outcome !== "failed") break;
    await new Promise((listo) => setTimeout(listo, espera));
    outcome = await submitAffinityToWebhook(payload);
  }
  return outcome;
}

/**
 * Envia con reintentos. Si no hay conexion, deja el envio en la cola del
 * telefono y devuelve "failed" (la pagina ofrece "Reintentar").
 */
export async function guardarEnvio(payload: AffinitySubmissionPayload): Promise<AffinitySubmissionOutcome> {
  const outcome = await enviarConReintentos(payload);
  if (outcome === "saved") {
    guardarCola(leerCola().filter((p) => !mismaFila(p, payload)));
  } else if (outcome === "failed" && !leerCola().some((p) => mismaFila(p, payload))) {
    guardarCola([...leerCola(), payload]);
  }
  return outcome;
}

let vaciandoCola = false;
/** Reenvia lo que quedo pendiente en este telefono (al abrir el sitio o al volver la conexion). */
export async function vaciarCola() {
  if (vaciandoCola) return;
  vaciandoCola = true;
  try {
    const pendientes = leerCola();
    if (!pendientes.length) return;
    const quedan: AffinitySubmissionPayload[] = [];
    for (const payload of pendientes) {
      if ((await submitAffinityToWebhook(payload)) === "failed") quedan.push(payload);
    }
    // Lo que se agrego mientras se enviaba va al final de la cola.
    guardarCola([...quedan, ...leerCola().slice(pendientes.length)]);
  } finally {
    vaciandoCola = false;
  }
}
