import { createSlice } from "@reduxjs/toolkit";

function loadFavorites() {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((item) => item.id === movie.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== movie.id);
      } else {
        state.items.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        });
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
