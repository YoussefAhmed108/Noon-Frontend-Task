import React from "react";

import { toast } from "react-toastify";

import Image from "next/image";
import Link from "next/link";

import { getPosterUrl } from "@/app/utils/tmdb";
import { useFavMovieStore } from "@/stores/useMovieStore";
import { Movie } from "@/types/movie";

import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { movies, add, remove, isFavourite } = useFavMovieStore();

  const handleAddToFavorites = () => {
    add(movie);
    toast.success(`'${movie.original_title}' added to favorites!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRemoveFromFavorites = () => {
    remove(movie.id);
    toast.info(`'${movie.original_title}' removed from favorites!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className={styles.cardContainer}>
      <Link href={`/movie/${movie.id}`} prefetch>
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.original_title + " poster"}
          width={300}
          height={450}
          className={styles.poster}
          priority={false}
        />
      </Link>
      <div className={styles.movieDetails}>
        <div className={styles.movieTitleAndRating}>
          <Link href={`/movie/${movie.id}`} prefetch>
            <p className={styles.movieTitle}>{movie.original_title}</p>
          </Link>
          <p>{movie.vote_average.toPrecision(2)}&#9733;</p>
        </div>
        <div className={styles.movieDateAndButton}>
          <div>
            <p>{movie.release_date.split("-")[0]}</p>
          </div>
          <p>&#x2022; </p>
          <div className={styles.favButton}>
            {" "}
            <button
              className={styles.favBtn}
              onClick={
                isFavourite(movie.id)
                  ? handleRemoveFromFavorites
                  : handleAddToFavorites
              }
              aria-label={
                isFavourite(movie.id)
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
            >
              {isFavourite(movie.id) ? "\u2605" : "\u2606"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
