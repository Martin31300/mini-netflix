const SORT_OPTIONS = [
  { value: "", label: "Popularité" },
  { value: "vote_average.desc", label: "Mieux notés" },
  { value: "primary_release_date.desc", label: "Plus récents" },
  { value: "title.asc", label: "Titre A → Z" },
];

const RATING_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear + 1 - i);

export default function FilterBar({ sort, year, rating, onChange, onReset }) {
  const selectClass = "rounded bg-zinc-800 px-3 py-2 text-sm text-white";

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <select
        value={sort}
        onChange={(e) => onChange("sort", e.target.value)}
        className={selectClass}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => onChange("year", e.target.value)}
        className={selectClass}
      >
        <option value="">Toutes les années</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={rating}
        onChange={(e) => onChange("rating", e.target.value)}
        className={selectClass}
      >
        <option value="">Toutes les notes</option>
        {RATING_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}+ ⭐
          </option>
        ))}
      </select>

      <button
        onClick={onReset}
        className="rounded bg-zinc-700 px-3 py-2 text-sm text-white"
      >
        Réinitialiser
      </button>
    </div>
  );
}
