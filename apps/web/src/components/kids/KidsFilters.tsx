type FilterKey = "todos" | "favoritos" | "nuevos";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "favoritos", label: "Favoritos" },
  { key: "nuevos", label: "Nuevos" },
];

export function KidsFilters({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}) {
  return (
    <div className="pt-6 pb-2">
      <div className="max-w-4xl mx-auto flex justify-center gap-3 px-4">
        {FILTERS.map((filter) => {
          const isActive = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(filter.key)}
              // Manos pequenas: minimo 56px de alto, no los 34px de antes.
              className={`mi-voice-kid min-h-[56px] px-7 text-lg font-bold rounded-[var(--radius-kid)] transition-colors ${
                isActive
                  ? "mi-cta-primary"
                  : "mi-cta-ghost text-white"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
