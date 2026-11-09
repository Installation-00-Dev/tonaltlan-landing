import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Texto pequeno sobre el titulo, p. ej. "Compendio". */
  eyebrow?: string;
  /** Enlace del eyebrow (miga de pan). */
  eyebrowHref?: string;
  center?: boolean;
}

export default function SectionHeader({ title, subtitle, eyebrow, eyebrowHref, center = false }: SectionHeaderProps) {
  const eyebrowClass =
    "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90";

  return (
    <header className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow ? (
        eyebrowHref ? (
          <Link href={eyebrowHref} className={`${eyebrowClass} transition-colors hover:text-amber-300`}>
            <span className="h-1.5 w-1.5 rotate-45 bg-amber-400" aria-hidden="true" />
            {eyebrow}
          </Link>
        ) : (
          <p className={eyebrowClass}>
            <span className="h-1.5 w-1.5 rotate-45 bg-amber-400" aria-hidden="true" />
            {eyebrow}
          </p>
        )
      ) : null}
      <h1 className="mb-4 font-serif text-4xl font-bold tracking-wide text-amber-300 md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className={`max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
