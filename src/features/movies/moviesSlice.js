import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { discoverMovies, searchMovies } from "../../services/tmdb";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, query = "", filters = {} } = {}) => {
    if (query) {
      return searchMovies(query, page);
    }
    return discoverMovies(page, filters);
  },
);

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: true,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur lors du chargement des films";
      });
  },
});

export default moviesSlice.reducer;
