import Image from "next/image";
import Link from "next/link";
import { themeFor } from "@/lib/site";

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
  /** Slug de la deidad cuyo color se usa como acento. */
  accent?: string;
  /** Enlaces cruzados, p. ej. el linaje de una especie. */
  related?: { label: string; items: { name: string; href: string }[] };
}

export default function DetailLayout({
  title,
  tags,
  sections,
  coverImageSrc,
  coverImageAlt,
  backHref,
  backLabel,
  accent,
  related,
}: DetailLayoutProps) {
  const theme = themeFor(accent);
  const isHekaCover = (coverImageSrc ?? "").includes("Heka.webp");

  function toAnchorId(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function parsePipeRow(line: string) {
    return line
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean);
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
      const key = cleanLine.slice(0, separatorIndex).trim().toLowerCase();
      const value = cleanLine.slice(separatorIndex + 1).trim();
      map.set(key, value);
    }

    return map;
  }

  function buildQuickFacts() {
    const rolSection = sections.find((section) => section.title.toLowerCase().includes("rol"));
    const generalesSection = sections.find((section) =>
      section.title.toLowerCase().includes("caracteristicas"),
    );

    if (!rolSection && !generalesSection) {
      return [];
    }

    const bulletMap = generalesSection ? extractBulletMap(generalesSection.content) : new Map();

    const rolText = rolSection?.content.split(".")[0]?.trim() || "Clase de fantasia para Tonaltlan.";
    const atributoClave = tags.find((tag) =>
      ["inteligencia", "sabiduria", "carisma", "fuerza", "destreza", "constitucion"].includes(
        tag.toLowerCase(),
      ),
    );

    return [
      { label: "Rol", value: rolText },
      { label: "Atributo clave", value: atributoClave ?? "Por definir" },
      { label: "Dado de golpe", value: bulletMap.get("dado de golpe") ?? "-" },
      { label: "Salvaciones", value: bulletMap.get("tiradas de salvacion") ?? "-" },
      { label: "Armaduras", value: bulletMap.get("competencia con armaduras") ?? "-" },
      { label: "Armas", value: bulletMap.get("competencia con armas") ?? "-" },
    ];
  }

  function renderTable(content: string) {
    const lines = content
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.includes("|"));

    if (lines.length < 2) {
      return <p className="whitespace-pre-line text-base leading-relaxed text-muted">{content}</p>;
    }

    const headers = parsePipeRow(lines[0]);
    const rows = lines.slice(1).map(parsePipeRow).filter((row) => row.length > 0);

    if (headers.length < 2) {
      return <p className="whitespace-pre-line text-base leading-relaxed text-muted">{content}</p>;
    }

    return (
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-muted">
            <thead className="bg-background/60">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border border-glass-border px-3 py-2 text-left font-semibold text-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${rowIndex}-${row.join("-")}`}>
                  {headers.map((_, colIndex) => (
                    <td key={colIndex} className="border border-glass-border px-3 py-2 align-top">
                      {row[colIndex] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderRasgos(content: string) {
    const blocks = content
      .replace(/\r\n/g, "\n")
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    return (
      <div className="space-y-6">
        {blocks.map((block, idx) => {
          const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
          const heading = lines[0] ?? "";
          const bodyLines = lines.slice(1);
          const bulletLines = bodyLines.filter((line) => line.startsWith("- "));
          const plainLines = bodyLines.filter((line) => !line.startsWith("- "));

          return (
            <details
              key={`${heading}-${idx}`}
              className="rounded-lg border border-glass-border/60 bg-background/25 p-4"
              open={idx === 0}
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-gold">
                {heading}
              </summary>
              <div className="mt-3">
                {plainLines.length > 0 && (
                  <p className="mb-3 whitespace-pre-line text-base leading-relaxed text-muted">
                    {plainLines.join("\n")}
                  </p>
                )}
                {bulletLines.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-muted">
                    {bulletLines.map((line, lineIndex) => (
                      <li key={`${lineIndex}-${line}`}>{line.slice(2)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          );
        })}
      </div>
    );
  }

  function renderSubclases(content: string) {
    const lines = content
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const elementPattern = /^(Fuego|Agua|Tierra|Aire|Luz|Obscuridad|Rayo)\s-\s(.+)$/;
    const levelPattern = /^Nivel\s+\d+:/;

    const elements: { name: string; role: string; levels: string[] }[] = [];
    let current: { name: string; role: string; levels: string[] } | null = null;

    for (const line of lines) {
      const match = line.match(elementPattern);
      if (match) {
        current = { name: match[1], role: match[2], levels: [] };
        elements.push(current);
        continue;
      }

      if (current && levelPattern.test(line)) {
        current.levels.push(line);
      }
    }

    if (elements.length === 0) {
      return <p className="whitespace-pre-line text-base leading-relaxed text-muted">{content}</p>;
    }

    return (
      <div className="space-y-6">
        {elements.map((element, elementIndex) => (
          <details
            key={element.name}
            className="rounded-lg border border-glass-border/70 bg-background/25 p-5"
            open={elementIndex === 0}
          >
            <summary className="cursor-pointer list-none">
              <h3 className="mb-1 font-display text-xl text-gold">{element.name}</h3>
              <p className="text-sm font-medium text-foreground">{element.role}</p>
            </summary>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted">
              {element.levels.map((levelLine, idx) => {
                const [levelTitle, ...rest] = levelLine.split(":");
                return (
                  <li key={`${element.name}-${idx}`} className="rounded-md border border-glass-border/50 bg-background/40 p-3">
                    <span className="font-semibold text-foreground">{levelTitle}:</span>{" "}
                    <span>{rest.join(":").trim()}</span>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    );
  }

  function renderGenericContent(content: string) {
    const blocks = content
      .replace(/\r\n/g, "\n")
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    return (
      <div className="space-y-4">
        {blocks.map((block, idx) => {
          const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
          const allBullets = lines.length > 0 && lines.every((line) => line.startsWith("- "));

          if (allBullets) {
            return (
              <ul key={idx} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
                {lines.map((line, lineIdx) => (
                  <li key={`${idx}-${lineIdx}`}>{line.slice(2)}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={idx} className="whitespace-pre-line text-base leading-relaxed text-muted">
              {block}
            </p>
          );
        })}
      </div>
    );
  }

  function renderSectionContent(section: DetailSection) {
    const titleLower = section.title.toLowerCase();

    if (titleLower.includes("tabla") || titleLower.includes("estadisticas")) {
      return renderTable(section.content);
    }

    if (titleLower.includes("subclases")) {
      return renderSubclases(section.content);
    }

    if (titleLower.includes("rasgos")) {
      return renderRasgos(section.content);
    }

    return renderGenericContent(section.content);
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

        {/* Title */}
        <span className={`mb-4 block h-1 w-16 rounded-full ${theme.bar}`} aria-hidden="true" />
        <h1 className={`mb-5 font-display text-4xl md:text-5xl ${theme.text}`}>
          {title}
        </h1>

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
            {isHekaCover && (
              <div className="pointer-events-none absolute inset-4 rounded-2xl bg-sky-100/35" />
            )}
            <Image
              src={coverImageSrc}
              alt={coverImageAlt ?? title}
              width={896}
              height={600}
              className={[
                "relative h-auto w-full",
                isHekaCover ? "brightness-110 contrast-125" : "",
              ].join(" ")}
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {related && related.items.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-selva-800/40 p-4 ring-1 ring-selva-700/70">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-selva-500">{related.label}</span>
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
          <section className="mb-8 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-background/40 to-background/20 p-4 md:p-6">
            <h2 className="mb-4 font-display text-2xl text-gold">Ficha Rapida</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickFacts.map((fact, idx) => (
                <article
                  key={`${fact.label}-${idx}`}
                  className={
                    idx === 0
                      ? "rounded-xl border border-glass-border bg-background/45 p-4 sm:col-span-2 lg:col-span-3"
                      : "rounded-xl border border-glass-border bg-background/45 p-4"
                  }
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-oro-400/90">{fact.label}</p>
                  <p className="text-sm leading-relaxed text-foreground">{fact.value}</p>
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
                className="rounded-full border border-glass-border bg-background/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:border-oro-400 hover:text-selva-100"
              >
                {section.title}
              </a>
            );
          })}
        </nav>

        {/* Content sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <section
              key={section.title}
              id={toAnchorId(section.title)}
              className="glass-card scroll-mt-24 rounded-xl p-6 md:p-8"
            >
              <h2 className="mb-3 flex items-center gap-3 font-display text-xl text-foreground">
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-gold/60 bg-gold/10 px-2 text-xs font-bold text-gold">
                  {idx + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-4 text-muted">{renderSectionContent(section)}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
