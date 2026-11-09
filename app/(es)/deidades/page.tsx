import Deidades, { metadataDeidades } from "@/components/paginas/Deidades";

export const metadata = metadataDeidades("es");

export default function Page() {
  return <Deidades lang="es" />;
}
