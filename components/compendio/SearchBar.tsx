"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por nombre...",
}: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <label htmlFor="search-input" className="sr-only">
        {placeholder}
      </label>
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="glass-card min-h-[48px] w-full rounded-xl py-3 pl-12 pr-4 text-base text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-teal"
      />
    </div>
  );
}
