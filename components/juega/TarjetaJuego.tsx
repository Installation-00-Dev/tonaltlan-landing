import TarjetaTest from "@/components/afinidad/TarjetaTest";
import TarjetaDados from "@/components/dados/TarjetaDados";
import TarjetaDanza from "@/components/danza/TarjetaDanza";
import type { Lang } from "@/lib/i18n";

/**
 * Registro de las experiencias de /juega: la tarjeta de invitación de cada una.
 * Es el único lugar que conoce a todos los juegos. Un juego que invita a otro
 * (al pie de su página) usa esta tarjeta y nunca importa la carpeta del otro.
 * Un juego nuevo se suma aquí y en la página Juega.
 */
const TARJETAS = {
  afinidad: TarjetaTest,
  danza: TarjetaDanza,
  dados: TarjetaDados,
};

export type JuegoId = keyof typeof TARJETAS;

export default function TarjetaJuego({ juego, lang, className }: { juego: JuegoId; lang: Lang; className?: string }) {
  const Tarjeta = TARJETAS[juego];
  return <Tarjeta lang={lang} className={className} />;
}
