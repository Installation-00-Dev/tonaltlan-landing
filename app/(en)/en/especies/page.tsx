import Especies, { metadataEspecies } from "@/components/paginas/Especies";

export const metadata = metadataEspecies("en");

export default function Page() {
  return <Especies lang="en" />;
}
