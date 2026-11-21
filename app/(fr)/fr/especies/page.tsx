import Especies, { metadataEspecies } from "@/components/paginas/Especies";

export const metadata = metadataEspecies("fr");

export default function Page() {
  return <Especies lang="fr" />;
}
