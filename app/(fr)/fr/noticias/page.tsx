import Noticias, { metadataNoticias } from "@/components/paginas/Noticias";

export const metadata = metadataNoticias("fr");

export default function Page() {
  return <Noticias lang="fr" />;
}
