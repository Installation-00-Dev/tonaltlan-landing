interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 font-serif text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
