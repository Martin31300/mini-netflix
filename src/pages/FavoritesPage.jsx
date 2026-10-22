import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl text-white">Mes favoris</h2>

      {favorites.length === 0 ? (
        <p className="text-zinc-400">Aucun favori pour l'instant.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
