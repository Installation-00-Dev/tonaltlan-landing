import Deidades, { metadataDeidades } from "@/components/paginas/Deidades";

export const metadata = metadataDeidades("fr");

export default function Page() {
  return <Deidades lang="fr" />;
}
