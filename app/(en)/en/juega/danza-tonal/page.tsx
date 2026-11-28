import DanzaTonal, { metadataDanzaTonal } from "@/components/paginas/DanzaTonal";

export const metadata = metadataDanzaTonal("en");

export default function Page() {
  return <DanzaTonal lang="en" />;
}
