import Especies, { metadataEspecies } from "@/components/paginas/Especies";

export const metadata = metadataEspecies("es");

export default function Page() {
  return <Especies lang="es" />;
}
