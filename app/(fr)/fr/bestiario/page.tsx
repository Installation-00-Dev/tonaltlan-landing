import Bestiario, { metadataBestiario } from "@/components/paginas/Bestiario";

export const metadata = metadataBestiario("fr");

export default function Page() {
  return <Bestiario lang="fr" />;
}
