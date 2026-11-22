import Afinidad from "@/components/paginas/Afinidad";
import { metaPagina, t } from "@/lib/i18n";

export const metadata = metaPagina("en", "/afinidad/", t("en").paginas.afinidad.meta, t("en").paginas.afinidad.subtitulo);

export default function Page() {
  return <Afinidad lang="en" />;
}
