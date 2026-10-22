const BASE_URL = 'https://api.themoviedb.org/3'

async function request(path, params = {}) {
  const query = new URLSearchParams({ language: 'fr-FR', ...params })

  const response = await fetch(`${BASE_URL}${path}?${query}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erreur TMDB ${response.status}`)
  }

  return response.json()
}

export function discoverMovies(page = 1) {
  return request('/discover/movie', { page })
}

export function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page })
}

export function getMovie(id) {
  return request(`/movie/${id}`)
}