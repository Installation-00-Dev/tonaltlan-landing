import Noticias, { metadataNoticias } from "@/components/paginas/Noticias";

export const metadata = metadataNoticias("en");

export default function Page() {
  return <Noticias lang="en" />;
}
