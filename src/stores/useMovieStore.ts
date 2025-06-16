import { Movie } from '@/types/movie';
import { create } from 'zustand';

interface FavMoviesState {
    movies: Movie[];
    add: (movie: Movie) => void;
    remove: (movieID: number) => void;
    isFavourite: (movieID: number) => boolean;
}

export const useFavMovieStore = create<FavMoviesState>((set, get) => ({
    movies: [],
    add: (movie: Movie) => set((state) => ({ movies: [...state.movies, movie] })),
    remove: (movieID: number) => set((state) => ({ movies: state.movies.filter((m) => m.id !== movieID) })),
    isFavourite: (movieID: number) => {
        const { movies } = get();
        return movies.some((m) => m.id === movieID);
    },
}));