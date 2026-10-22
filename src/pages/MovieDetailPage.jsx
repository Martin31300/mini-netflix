import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../services/tmdb";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";

const IMAGE_URL = "https://image.tmdb.org/t/p/w780";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovie(id);
        setMovie(data);
      } catch {
        setError("Impossible de charger ce film");
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading)
    return (
      <div className="p-6">
        <LoadingMessage />
      </div>
    );
  if (error)
    return (
      <div className="p-6">
        <ErrorMessage message={error} />
      </div>
    );

  const infos = [
    movie.release_date,
    movie.runtime > 0 && `${movie.runtime} min`,
    `⭐ ${movie.vote_average.toFixed(1)}`,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 text-white md:px-12 md:py-14">
      <Link to="/" className="text-zinc-400 hover:text-white">
        ← Retour
      </Link>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-12">
        {movie.poster_path && (
          <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-sm self-start rounded-lg shadow-2xl md:h-[70vh] md:w-auto md:max-w-none"
          />
        )}

        <div className="md:py-4">
          <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>
          <p className="mt-3 text-lg text-zinc-400">{infos.join(" · ")}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-700 px-4 py-1.5"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
