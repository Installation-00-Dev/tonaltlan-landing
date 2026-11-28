import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ContenidoSeccion from "@/components/compendio/ContenidoSeccion";
import { t, type Lang } from "@/lib/i18n";
import { variante } from "@/lib/imagenes";
import { themeFor } from "@/lib/site";
import { normalizar } from "@/lib/texto";

interface DetailSection {
  title: string;
  content: string;
}

interface DetailLayoutProps {
  title: string;
  tags: string[];
  sections: DetailSection[];
  coverImageSrc?: string;
  coverImageAlt?: string;
  backHref: string;
  backLabel: string;
  lang?: Lang;
  /** Slug de la deidad cuyo color se usa como acento. */
  accent?: string;
  /** Enlaces cruzados, p. ej. el linaje de una especie. */
  related?: { label: string; items: { name: string; href: string }[] };
  /** Contenido extra al final de la ficha (p. ej. la invitacion al Test de Afinidad). */
  pie?: ReactNode;
  /** Emblema junto al titulo (fichas de deidad). */
  emblema?: string;
}

export default function DetailLayout({
  title,
  tags,
  sections,
  coverImageSrc,
  coverImageAlt,
  backHref,
  backLabel,
  lang = "es",
  accent,
  related,
  pie,
  emblema,
}: DetailLayoutProps) {
  const theme = themeFor(accent);
  const dl = t(lang).paginas.detalle;

  function toAnchorId(value: string) {
    return normalizar(value)
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function extractBulletMap(content: string) {
    const map = new Map<string, string>();
    const lines = content
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "));

    for (const line of lines) {
      const cleanLine = line.slice(2);
      const separatorIndex = cleanLine.indexOf(":");
      if (separatorIndex === -1) continue;
      const key = normalizar(cleanLine.slice(0, separatorIndex).trim());
      const value = cleanLine.slice(separatorIndex + 1).trim();
      map.set(key, value);
    }

    return map;
  }

  function buildQuickFacts() {
    const rolSection = sections.find((section) => normalizar(section.title).includes("rol"));
    const generalesSection = sections.find((section) =>
      normalizar(section.title).includes("caracteristicas"),
    );

    if (!rolSection && !generalesSection) {
      return [];
    }

    const bulletMap = generalesSection ? extractBulletMap(generalesSection.content) : new Map();

    const rolText = rolSection?.content.split(".")[0]?.trim() || dl.rolDefecto;
    const atributoClave = tags.find((tag) =>
      ["inteligencia", "sabiduria", "carisma", "fuerza", "destreza", "constitucion"].includes(
        normalizar(tag),
      ),
    );

    return [
      { label: dl.rol, value: rolText },
      { label: dl.atributo, value: atributoClave ?? dl.porDefinir },
      { label: dl.dado, value: bulletMap.get("dado de golpe") ?? "-" },
      { label: dl.salvaciones, value: bulletMap.get("tiradas de salvacion") ?? "-" },
      { label: dl.armaduras, value: bulletMap.get("competencia con armaduras") ?? "-" },
      { label: dl.armas, value: bulletMap.get("competencia con armas") ?? "-" },
    ];
  }

  const quickFacts = buildQuickFacts();

  return (
    <div className="pb-24 pt-28 lg:pt-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-selva-400 transition-colors hover:text-oro-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLabel}
        </Link>

        {/* Title: con emblema (deidades) o con la barra de color */}
        {emblema ? (
          <div className="mb-5 flex items-center gap-4">
            <Image src={emblema} alt="" width={256} height={256} className="h-16 w-16 shrink-0" />
            <h1 className={`font-display text-4xl md:text-5xl ${theme.text}`}>{title}</h1>
          </div>
        ) : (
          <>
            <span className={`mb-4 block h-1 w-16 rounded-full ${theme.bar}`} aria-hidden="true" />
            <h1 className={`mb-5 font-display text-4xl md:text-5xl ${theme.text}`}>{title}</h1>
          </>
        )}

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${theme.chip}`}>
              {tag}
            </span>
          ))}
        </div>

        {coverImageSrc && (
          <div className={`relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-b ring-1 ring-selva-700/70 ${theme.glow}`}>
            <Image
              src={variante(coverImageSrc, 1200)}
              alt={coverImageAlt ?? title}
              width={896}
              height={600}
              className="relative h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {related && related.items.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-selva-800/40 p-4 ring-1 ring-selva-700/70">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-selva-400">{related.label}</span>
            {related.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors hover:bg-selva-800 ${theme.chip}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {quickFacts.length > 0 && (
          <section className="mb-8 rounded-2xl border border-oro-400/30 bg-gradient-to-br from-oro-400/10 via-selva-900/40 to-selva-900/20 p-4 md:p-6">
            <h2 className="mb-4 font-display text-2xl text-oro-400">{dl.fichaRapida}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickFacts.map((fact, idx) => (
                <article
                  key={`${fact.label}-${idx}`}
                  className={
                    idx === 0
                      ? "rounded-xl border border-selva-700 bg-selva-900/45 p-4 sm:col-span-2 lg:col-span-3"
                      : "rounded-xl border border-selva-700 bg-selva-900/45 p-4"
                  }
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-oro-400/90">{fact.label}</p>
                  <p className="text-sm leading-relaxed text-selva-100">{fact.value}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <nav className="mb-8 flex flex-wrap gap-2">
          {sections.map((section, idx) => {
            const id = toAnchorId(section.title);
            return (
              <a
                key={`${section.title}-${idx}`}
                href={`#${id}`}
                className="rounded-full border border-selva-700 bg-selva-900/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-selva-300 transition-colors hover:border-oro-400 hover:text-selva-100"
              >
                {section.title}
              </a>
            );
          })}
        </nav>

        {/* Content sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              id={toAnchorId(section.title)}
              className="scroll-mt-24 rounded-xl border border-selva-700/80 bg-selva-800/60 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-lg md:p-8"
            >
              <h2 className="mb-3 font-display text-xl text-selva-100">{section.title}</h2>
              <div className="space-y-4 text-selva-300">
                <ContenidoSeccion title={section.title} content={section.content} />
              </div>
            </section>
          ))}
        </div>

        {pie ? <div className="mt-10">{pie}</div> : null}
      </div>
    </div>
  );
}
