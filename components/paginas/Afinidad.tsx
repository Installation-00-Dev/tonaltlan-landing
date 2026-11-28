import AfinidadCliente from "@/components/afinidad/AfinidadCliente";
import type { InfoEspecies } from "@/components/afinidad/comun";
import { RACE_KEYS, RACE_SLUG, getNarrativas, getQuestions } from "@/lib/affinity-test";
import { getCompendio } from "@/lib/compendio";
import type { Lang } from "@/lib/i18n";

/**
 * Test de Afinidad. Prepara en el servidor, solo en el idioma del visitante, las
 * preguntas, las lecturas y el arte de cada especie y su dios (del compendio).
 * Asi el navegador no descarga los tres idiomas ni las fichas completas.
 * La parte interactiva vive en AfinidadCliente.
 */
export default function Afinidad({ lang }: { lang: Lang }) {
  const { especies, deidades } = getCompendio(lang);
  const info = Object.fromEntries(
    RACE_KEYS.map((race) => {
      const especie = especies.find((e) => e.slug === RACE_SLUG[race]);
      const deidad = deidades.find((x) => x.slug === especie?.deidad);
      return [
        race,
        {
          nombre: especie?.name ?? race,
          slug: RACE_SLUG[race],
          imagen: especie?.coverImageSrc,
          alt: especie?.coverImageAlt,
          deidad: deidad ? { nombre: deidad.name, slug: deidad.slug, imagen: deidad.coverImageSrc } : null,
        },
      ];
    }),
  ) as InfoEspecies;

  return <AfinidadCliente lang={lang} info={info} preguntas={getQuestions(lang)} narrativas={getNarrativas(lang)} />;
}
