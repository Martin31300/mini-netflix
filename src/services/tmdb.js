const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, params = {}) {
  const query = new URLSearchParams({ language: "fr-FR", ...params });

  const response = await fetch(`${BASE_URL}${path}?${query}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur TMDB ${response.status}`);
  }

  return response.json();
}

export function discoverMovies(page = 1, filters = {}) {
  const { genre, sort, year, rating } = filters;
  const params = { page };

  if (genre) params.with_genres = genre;
  if (sort) params.sort_by = sort;
  if (year) params.primary_release_year = year;
  if (rating) params["vote_average.gte"] = rating;

  if (rating || sort === "vote_average.desc") {
    params["vote_count.gte"] = 100;
  }

  if (sort === "primary_release_date.desc") {
    params["primary_release_date.lte"] = new Date().toISOString().slice(0, 10);
  }

  return request("/discover/movie", params);
}

export function getGenres() {
  return request("/genre/movie/list");
}

export function searchMovies(query, page = 1) {
  return request("/search/movie", { query, page });
}

export function getMovie(id) {
  return request(`/movie/${id}`);
}
