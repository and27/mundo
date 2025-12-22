type FilterKey = "todos" | "favoritos" | "nuevos";

const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: "todos", label: "Todos", icon: "🌟" },
  { key: "favoritos", label: "Favoritos", icon: "🤍" },
  { key: "nuevos", label: "Nuevos", icon: "✨" },
];

export function KidsFilters({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}) {
  return (
    <div className="pt-5 text-white">
      <div className="max-w-4xl mx-auto flex justify-center gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onChange(filter.key)}
            className={`border px-6 min-w-[40px] text-md py-2 rounded-lg ${
              active === filter.key
                ? "bg-white text-black border-white"
                : "border-white/20"
            }
              `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
