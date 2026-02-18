import Link from "next/link";
import TagChips from "./TagChips";

interface DetailSection {
  title: string;
  content: string;
}

interface DetailLayoutProps {
  title: string;
  tags: string[];
  sections: DetailSection[];
  backHref: string;
  backLabel: string;
}

export default function DetailLayout({
  title,
  tags,
  sections,
  backHref,
  backLabel,
}: DetailLayoutProps) {
  return (
    <div className="pt-24 pb-16 lg:pt-32">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Back link */}
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-teal/80"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLabel}
        </Link>

        {/* Title */}
        <h1 className="mb-4 font-serif text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Tags */}
        <div className="mb-8">
          <TagChips tags={tags} variant="gold" />
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="glass-card rounded-xl p-6 md:p-8">
              <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="text-base leading-relaxed text-muted">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
