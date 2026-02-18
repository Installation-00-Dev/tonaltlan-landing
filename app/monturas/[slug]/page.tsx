import { notFound } from "next/navigation";
import { monturas } from "@/lib/data";
import DetailLayout from "@/components/compendio/DetailLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return monturas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = monturas.find((m) => m.slug === slug);
  if (!item) return { title: "No encontrado - Tonaltlan" };
  return {
    title: `${item.name} - Monturas - Tonaltlan`,
    description: item.description,
  };
}

export default async function MonturaDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = monturas.find((m) => m.slug === slug);
  if (!item) notFound();

  return (
    <DetailLayout
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      backHref="/monturas"
      backLabel="Volver a Monturas"
    />
  );
}
