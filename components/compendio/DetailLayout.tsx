import Link from "next/link";
import TagChips from "./TagChips";

interface DetailSection {
  title: string;
  content: string;
}

interface DetailLayoutProps {
  title: string;
  tags: string[];
  sections: DetailSection[];
  backHref: string;
  backLabel: string;
}

export default function DetailLayout({
  title,
  tags,
  sections,
  backHref,
  backLabel,
}: DetailLayoutProps) {
  function parsePipeRow(line: string) {
    return line
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean);
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
            <div key={`${heading}-${idx}`} className="rounded-lg border border-glass-border/60 bg-background/25 p-4">
              <h3 className="mb-2 text-base font-semibold text-gold">{heading}</h3>
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
        {elements.map((element) => (
          <div key={element.name} className="rounded-lg border border-glass-border/70 bg-background/25 p-5">
            <h3 className="mb-1 font-serif text-xl font-semibold text-gold">{element.name}</h3>
            <p className="mb-4 text-sm font-medium text-foreground">{element.role}</p>
            <ul className="space-y-3 text-base leading-relaxed text-muted">
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
          </div>
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

  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Back link */}
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-teal/80"
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
        <h1 className="mb-4 font-serif text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Tags */}
        <div className="mb-8">
          <TagChips tags={tags} variant="gold" />
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="glass-card rounded-xl p-6 md:p-8">
              <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="space-y-4 text-muted">{renderSectionContent(section)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
