import Link from "next/link";
import type { ReactNode } from "react";

/** Color de cada tarjeta (clases completas para que Tailwind las detecte). */
const TONOS = {
  oro: { desde: "from-oro-400/15", anillo: "ring-oro-400/30", hover: "hover:ring-oro-400/70" },
  jade: { desde: "from-jade-400/15", anillo: "ring-jade-400/30", hover: "hover:ring-jade-400/70" },
  turquesa: { desde: "from-turquesa-400/15", anillo: "ring-turquesa-400/30", hover: "hover:ring-turquesa-400/70" },
};

/**
 * Marco de las tarjetas de invitación de /juega (Test de Afinidad y cada juego):
 * toda la tarjeta es el enlace y la flecha de oro va a la derecha. Cada juego
 * pone dentro su arte, su nombre y su línea (Tarjeta<Juego> en su carpeta).
 */
export default function MarcoTarjeta({
  href,
  tono,
  className = "",
  children,
}: {
  href: string;
  tono: keyof typeof TONOS;
  className?: string;
  children: ReactNode;
}) {
  const { desde, anillo, hover } = TONOS[tono];
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-br ${desde} via-selva-800/60 to-selva-900 p-8 ring-1 ${anillo} transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] ${hover} md:flex-row md:items-center md:justify-between md:p-10 ${className}`}
    >
      {children}
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oro-400 text-selva-950 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
        aria-hidden="true"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
        </svg>
      </span>
    </Link>
  );
}
