// src/store/useFavMovieStore.ts
import { Movie } from '@/types/movie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavMoviesState {
  movies: Movie[];
  add: (movie: Movie) => void;
  remove: (movieID: number) => void;
  isFavourite: (movieID: number) => boolean;
}

export const useFavMovieStore = create<FavMoviesState>()(
  persist(
    (set, get) => ({
      movies: [],

      add: (movie: Movie) =>
        set((state) => ({
          movies: state.movies.find((m) => m.id === movie.id)
            ? state.movies
            : [...state.movies, movie],
        })),

      remove: (movieID: number) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieID),
        })),

      isFavourite: (movieID: number) => {
        return get().movies.some((m) => m.id === movieID);
      },
    }),
    {
      name: 'fav-movies'          // key in localStorage
      //getStorage: () => localStorage // defaults to localStorage
    }
  )
);
