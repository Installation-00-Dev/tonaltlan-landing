import DetailLayout from "@/components/compendio/DetailLayout";
import { monturas } from "@/lib/data";
import { notFound } from "next/navigation";

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
      coverImageSrc={item.coverImageSrc}
      coverImageAlt={item.coverImageAlt}
      backHref="/monturas"
      backLabel="Volver a Monturas"
    />
  );
}
