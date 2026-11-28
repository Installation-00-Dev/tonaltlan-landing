import Dados, { metadataDados } from "@/components/paginas/Dados";

export const metadata = metadataDados("en");

export default function Page() {
  return <Dados lang="en" />;
}
