import Afinidad from "@/components/paginas/Afinidad";
import { metaPagina, t } from "@/lib/i18n";

export const metadata = metaPagina("fr", "/afinidad/", t("fr").paginas.afinidad.meta, t("fr").paginas.afinidad.subtitulo);

export default function Page() {
  return <Afinidad lang="fr" />;
}
