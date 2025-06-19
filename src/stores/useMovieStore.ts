// src/store/useFavMovieStore.ts

/**
 * Zustand store for managing a list of favorite movies with persistence in localStorage.
 * @module useFavMovieStore
 */
import { Movie } from '@/types/movie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * State and actions related to favorite movies.
 */
interface FavMoviesState {
  /**
   * Array of movies marked as favorites.
   */
  movies: Movie[];

  /**
   * Adds a movie to the favorites list if it's not already present.
   * @param {Movie} movie - The movie to add to favorites.
   */
  add: (movie: Movie) => void;

  /**
   * Removes a movie from the favorites list by its ID.
   * @param {number} movieID - The ID of the movie to remove from favorites.
   */
  remove: (movieID: number) => void;

  /**
   * Checks if a movie is already in the favorites list.
   * @param {number} movieID - The ID of the movie to check.
   * @returns {boolean} True if the movie is in favorites, false otherwise.
   */
  isFavourite: (movieID: number) => boolean;
}

/**
 * Custom hook providing access to favorite movies store.
 * Includes methods to add, remove, and check favorite movies,
 * with state persisted to localStorage under the key 'fav-movies'.
 */
export const useFavMovieStore = create<FavMoviesState>()(
  persist(
    (set, get) => ({
      /**
       * List of favorite movies.
       */
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
      /**
       * Key used to store and retrieve the persisted state in localStorage.
       */
      name: 'fav-movies',
      // getStorage: () => localStorage // defaults to localStorage
    }
  )
);
