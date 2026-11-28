import Image from "next/image";
import { enfoque, type InfoEspecies } from "@/components/afinidad/comun";
import type { Option, Question } from "@/lib/affinity-core";
import { variante } from "@/lib/imagenes";
import { themeFor } from "@/lib/site";

/** Anillo de la opcion elegida: oro (estado activo); al pasar el cursor, jade. */
const anillo = (elegida: boolean) =>
  elegida ? "ring-oro-400" : "ring-transparent hover:ring-jade-400/60";

/** Preguntas visuales de un toque: retratos de los dioses, sus emblemas o sus colores. */
export default function OpcionesVisuales({
  question,
  info,
  currentAnswerId,
  disabled,
  onSelect,
}: {
  question: Question;
  info: InfoEspecies;
  currentAnswerId?: string;
  disabled: boolean;
  onSelect: (id: string) => void;
}) {
  const props = (option: Option) => ({
    type: "button" as const,
    onClick: () => onSelect(option.id),
    disabled,
    "aria-pressed": currentAnswerId === option.id,
  });

  if (question.tipo === "deidad") {
    return (
      <ul className="flex flex-wrap justify-center gap-3">
        {question.options.map((option) => {
          const deidad = option.race ? info[option.race].deidad : null;
          const theme = themeFor(deidad?.slug);
          return (
            <li key={option.id} className="w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.5625rem)]">
              <button
                {...props(option)}
                className={`group block w-full rounded-2xl text-center transition duration-200 motion-safe:active:scale-[0.97] ${enfoque}`}
              >
                <span
                  className={`relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b ring-2 ring-offset-2 ring-offset-selva-900 transition duration-200 ${theme.glow} ${anillo(currentAnswerId === option.id)}`}
                >
                  {deidad?.imagen ? (
                    <Image
                      src={variante(deidad.imagen, 480)}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                      sizes="(max-width: 640px) 30vw, 160px"
                    />
                  ) : null}
                </span>
                <span className={`mt-2 block font-display text-lg ${theme.text}`}>{deidad?.nombre ?? option.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  // Simbolo y color: circulos que se eligen de un toque, siempre en filas de 4 + 3.
  return (
    <ul className="mx-auto flex max-w-[28rem] flex-wrap justify-center gap-3 sm:gap-5">
      {question.options.map((option) => (
        <li key={option.id}>
          <button
            {...props(option)}
            aria-label={option.text}
            title={option.text}
            className={`block rounded-full ring-2 ring-offset-4 ring-offset-selva-900 transition duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-[0.97] ${enfoque} ${anillo(currentAnswerId === option.id)}`}
          >
            {question.tipo === "simbolo" && option.imagen ? (
              <Image src={option.imagen} alt="" width={256} height={256} className="h-16 w-16 sm:h-24 sm:w-24" />
            ) : (
              <span className={`block h-16 w-16 rounded-full shadow-inner sm:h-20 sm:w-20 ${option.color ?? ""}`} />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
