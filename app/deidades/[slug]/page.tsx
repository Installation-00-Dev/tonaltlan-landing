import DetailLayout from "@/components/compendio/DetailLayout";
import { deidades } from "@/lib/data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return deidades.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = deidades.find((d) => d.slug === slug);
  if (!item) return { title: "No encontrado - Tonaltlan" };
  return {
    title: `${item.name} - Deidades - Tonaltlan`,
    description: item.description,
  };
}

export default async function DeidadDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = deidades.find((d) => d.slug === slug);
  if (!item) notFound();

  return (
    <DetailLayout
      title={item.name}
      tags={item.tags}
      sections={item.sections}
      coverImageSrc={item.coverImageSrc}
      coverImageAlt={item.coverImageAlt}
      backHref="/deidades"
      backLabel="Volver a Deidades"
    />
  );
}
