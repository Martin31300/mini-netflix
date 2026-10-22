export default function GenreFilter({ genres, selected, onSelect }) {
  const baseClass = "rounded-full px-4 py-1 text-sm text-white";

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={`${baseClass} ${selected === "" ? "bg-red-600" : "bg-zinc-800"}`}
      >
        Tous
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(String(genre.id))}
          className={`${baseClass} ${selected === String(genre.id) ? "bg-red-600" : "bg-zinc-800"}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
