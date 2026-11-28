import { normalizar } from "@/lib/texto";

/* Piezas de la ficha de detalle (DetailLayout): convierten el texto de cada seccion
   del compendio en tabla, subclases, rasgos o parrafos. */

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
    return <p className="whitespace-pre-line text-base leading-relaxed text-selva-300">{content}</p>;
  }

  const headers = parsePipeRow(lines[0]);
  const rows = lines.slice(1).map(parsePipeRow).filter((row) => row.length > 0);

  if (headers.length < 2) {
    return <p className="whitespace-pre-line text-base leading-relaxed text-selva-300">{content}</p>;
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-selva-300">
          <thead className="bg-selva-900/60">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border border-selva-700 px-3 py-2 text-left font-semibold text-selva-100"
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
                  <td key={colIndex} className="border border-selva-700 px-3 py-2 align-top">
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
            className="rounded-lg border border-selva-700/60 bg-selva-900/25 p-4"
            open={idx === 0}
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-oro-400">
              {heading}
            </summary>
            <div className="mt-3">
              {plainLines.length > 0 && (
                <p className="mb-3 whitespace-pre-line text-base leading-relaxed text-selva-300">
                  {plainLines.join("\n")}
                </p>
              )}
              {bulletLines.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-selva-300">
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
    return <p className="whitespace-pre-line text-base leading-relaxed text-selva-300">{content}</p>;
  }

  return (
    <div className="space-y-6">
      {elements.map((element, elementIndex) => (
        <details
          key={element.name}
          className="rounded-lg border border-selva-700/70 bg-selva-900/25 p-5"
          open={elementIndex === 0}
        >
          <summary className="cursor-pointer list-none">
            <h3 className="mb-1 font-display text-xl text-oro-400">{element.name}</h3>
            <p className="text-sm font-medium text-selva-100">{element.role}</p>
          </summary>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-selva-300">
            {element.levels.map((levelLine, levelIndex) => {
              const [levelTitle, ...rest] = levelLine.split(":");
              return (
                <li key={`${element.name}-${levelIndex}`} className="rounded-md border border-selva-700/50 bg-selva-900/40 p-3">
                  <span className="font-semibold text-selva-100">{levelTitle}:</span>{" "}
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
            <ul key={idx} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-selva-300">
              {lines.map((line, lineIdx) => (
                <li key={`${idx}-${lineIdx}`}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="whitespace-pre-line text-base leading-relaxed text-selva-300">
            {block}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Contenido de una seccion de ficha segun su titulo (comparado sin acentos): tabla,
 * subclases por elemento, rasgos desplegables o parrafos y listas.
 */
export default function ContenidoSeccion({ title, content }: { title: string; content: string }) {
  const titleLower = normalizar(title);

  if (titleLower.includes("tabla") || titleLower.includes("estadisticas")) {
    return renderTable(content);
  }

  if (titleLower.includes("subclases")) {
    return renderSubclases(content);
  }

  if (titleLower.includes("rasgos")) {
    return renderRasgos(content);
  }

  return renderGenericContent(content);
}
