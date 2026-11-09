import Deidades, { metadataDeidades } from "@/components/paginas/Deidades";

export const metadata = metadataDeidades("en");

export default function Page() {
  return <Deidades lang="en" />;
}
