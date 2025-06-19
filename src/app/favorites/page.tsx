"use client";
import MovieCard from "@/components/MovieCard";
import { useFavMovieStore } from "@/stores/useMovieStore";
import React from "react";
import styles from "./page.module.css";

const FavouritesPage = () => {
  const { movies, add, remove } = useFavMovieStore();
  console.log(movies);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favourites</h1>
      <div className={styles.moviesGrid}>
        {movies?.length != 0 ? (
          movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <span className={styles.noMovies}>
            No Movies found for this search term
          </span>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
