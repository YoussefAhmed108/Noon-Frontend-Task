"use client"
import MovieCard from '@/components/MovieCard';
import { useFavMovieStore } from '@/stores/useMovieStore';
import React from 'react'

const FavouritesPage = () => {
    const { movies, add, remove } = useFavMovieStore();
    console.log(movies)
  return (
    <div>
        {
            movies.map(movie => <MovieCard movie={movie}/>)
        }
    </div>
  )
}

export default FavouritesPage