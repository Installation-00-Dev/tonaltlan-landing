"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mantener la pantalla encendida (Screen Wake Lock), para usar el sitio en la mesa.
 * `disponible` solo es true si el navegador tiene `navigator.wakeLock`: sin él, no se
 * muestra el interruptor. El sistema suelta la pantalla al cambiar de pestaña: al
 * volver se pide otra vez. Se suelta sola al salir de la página.
 */
export function usePantallaEncendida() {
  const [disponible, setDisponible] = useState(false);
  const [activa, setActiva] = useState(false);
  const activaRef = useRef(false);
  const sentinela = useRef<WakeLockSentinel | null>(null);

  async function pedir() {
    try {
      const nueva = await navigator.wakeLock.request("screen");
      sentinela.current = nueva;
      nueva.addEventListener("release", () => {
        if (sentinela.current === nueva) sentinela.current = null;
      });
    } catch {
      // El sistema no lo permitió (batería baja, permisos): el interruptor se apaga.
      activaRef.current = false;
      setActiva(false);
    }
  }

  async function alternar() {
    if (activaRef.current) {
      activaRef.current = false;
      setActiva(false);
      const actual = sentinela.current;
      sentinela.current = null;
      await actual?.release().catch(() => undefined);
      return;
    }
    activaRef.current = true;
    setActiva(true);
    await pedir();
  }

  useEffect(() => {
    setDisponible("wakeLock" in navigator);
    const alVolver = () => {
      if (document.visibilityState === "visible" && activaRef.current && !sentinela.current) void pedir();
    };
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      document.removeEventListener("visibilitychange", alVolver);
      void sentinela.current?.release().catch(() => undefined);
    };
  }, []);

  return { disponible, activa, alternar };
}
