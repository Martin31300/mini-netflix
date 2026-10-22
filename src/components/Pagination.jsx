const MAX_PAGES = 500;

export default function Pagination({ page, totalPages, onPageChange }) {
  const lastPage = Math.min(totalPages, MAX_PAGES);

  if (lastPage <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-white">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded bg-zinc-800 px-4 py-2 disabled:opacity-40"
      >
        ← Précédent
      </button>

      <span>
        Page {page} / {lastPage}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= lastPage}
        className="rounded bg-zinc-800 px-4 py-2 disabled:opacity-40"
      >
        Suivant →
      </button>
    </div>
  );
}
