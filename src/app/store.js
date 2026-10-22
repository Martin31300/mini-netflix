import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import genresReducer from "../features/genres/genresSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    genres: genresReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(store.getState().favorites.items),
  );
});
