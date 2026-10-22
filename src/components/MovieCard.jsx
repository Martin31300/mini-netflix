import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.id === movie.id),
  );

  return (
    <div className="relative overflow-hidden rounded-lg bg-zinc-800 text-white">
      <Link to={`/movie/${movie.id}`} className="block">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full"
          />
        ) : (
          <div className="flex h-72 items-center justify-center bg-zinc-700">
            Pas d'affiche
          </div>
        )}
        <div className="p-3">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-sm text-zinc-400">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>

      <button
        onClick={() => dispatch(toggleFavorite(movie))}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
