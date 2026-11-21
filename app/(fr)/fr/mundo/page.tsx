import Mundo, { metadataMundo } from "@/components/paginas/Mundo";

export const metadata = metadataMundo("fr");

export default function Page() {
  return <Mundo lang="fr" />;
}
