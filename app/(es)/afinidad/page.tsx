import Afinidad from "@/components/paginas/Afinidad";
import { metaPagina, t } from "@/lib/i18n";

export const metadata = metaPagina("es", "/afinidad/", t("es").paginas.afinidad.meta, t("es").paginas.afinidad.subtitulo);

export default function Page() {
  return <Afinidad lang="es" />;
}
