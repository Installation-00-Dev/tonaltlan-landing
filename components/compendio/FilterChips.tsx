"use client";

interface FilterChipsProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export default function FilterChips({ filters, active, onChange }: FilterChipsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={`min-h-[36px] rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            active === filter
              ? "border-teal bg-teal/15 text-teal"
              : "border-glass-border text-muted hover:border-teal/30 hover:text-foreground"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
