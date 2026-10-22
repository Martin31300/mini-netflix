import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discoverMovies } from '../../services/tmdb'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (page = 1) => {
  const data = await discoverMovies(page)
  return data
})

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.results
        state.page = action.payload.page
        state.totalPages = action.payload.total_pages
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false
        state.error = 'Erreur lors du chargement des films'
      })
  },
})

export default moviesSlice.reducer