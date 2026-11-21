import { notFound } from "next/navigation";
import { DetalleEspecie, metadataEspecie, slugsEspecies } from "@/components/paginas/Detalles";
import { getCompendio } from "@/lib/compendio";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return slugsEspecies();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return metadataEspecie("fr", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getCompendio("fr").especies.some((item) => item.slug === slug)) notFound();
  return <DetalleEspecie lang="fr" slug={slug} />;
}
