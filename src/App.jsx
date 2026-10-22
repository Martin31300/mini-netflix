import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from './features/movies/moviesSlice'

export default function App() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovies(1))
  }, [dispatch])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>{error}</p>

  return (
    <ul>
      {items.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}