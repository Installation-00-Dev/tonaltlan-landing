import AfinidadCliente, { type InfoEspecies } from "@/components/paginas/AfinidadCliente";
import { RACE_KEYS, RACE_SLUG } from "@/lib/affinity-test";
import { getCompendio } from "@/lib/compendio";
import type { Lang } from "@/lib/i18n";

/**
 * Test de Afinidad. Junta en el servidor el arte y los nombres de cada especie y
 * de su dios (salen del compendio), para no cargar las fichas completas en el
 * navegador. La parte interactiva vive en AfinidadCliente.
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

  return <AfinidadCliente lang={lang} info={info} />;
}
