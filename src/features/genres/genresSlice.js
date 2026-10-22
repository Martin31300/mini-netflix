import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGenres } from "../../services/tmdb";

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const data = await getGenres();
  return data.genres;
});

const genresSlice = createSlice({
  name: "genres",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default genresSlice.reducer;
