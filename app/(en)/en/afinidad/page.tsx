import Afinidad from "@/components/paginas/Afinidad";
import { metaPagina, t } from "@/lib/i18n";

export const metadata = metaPagina("en", "/afinidad/", t("en").paginas.afinidad.meta);

export default function Page() {
  return <Afinidad lang="en" />;
}
