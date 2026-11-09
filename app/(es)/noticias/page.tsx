import Noticias, { metadataNoticias } from "@/components/paginas/Noticias";

export const metadata = metadataNoticias("es");

export default function Page() {
  return <Noticias lang="es" />;
}
