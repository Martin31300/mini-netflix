import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";
import { fetchGenres } from "../features/genres/genresSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import GenreFilter from "../components/GenreFilter";
import FilterBar from "../components/FilterBar";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { items, totalPages, loading, error } = useSelector(
    (state) => state.movies,
  );
  const genres = useSelector((state) => state.genres.items);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchMovies({ page, query, filters: { genre, sort, year, rating } }),
    );
  }, [dispatch, page, query, genre, sort, year, rating]);

  const updateParams = (changes) => {
    const params = { ...Object.fromEntries(searchParams), ...changes };

    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });

    setSearchParams(params);
  };

  const goToPage = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo(0, 0);
  };

  const selectGenre = (genreId) => updateParams({ genre: genreId, page: "" });

  const changeFilter = (name, value) =>
    updateParams({ [name]: value, page: "" });

  const resetFilters = () => setSearchParams({});

  return (
    <div className="p-6">
      {query ? (
        <h2 className="mb-4 text-xl text-white">Résultats pour « {query} »</h2>
      ) : (
        <>
          <GenreFilter
            genres={genres}
            selected={genre}
            onSelect={selectGenre}
          />
          <FilterBar
            sort={sort}
            year={year}
            rating={rating}
            onChange={changeFilter}
            onReset={resetFilters}
          />
        </>
      )}

      {loading && <LoadingMessage />}
      <ErrorMessage message={error} />

      {!loading && !error && items.length === 0 && (
        <p className="text-zinc-400">Aucun film trouvé.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
}
