import React from "react";
import { Movie } from "@/types/movie";
import { useFavMovieStore } from "@/stores/useMovieStore";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { getPosterUrl } from "@/app/utils/tmdb";
import styles from "./MovieCard.module.css";
import Image from "next/image";
import { toast } from 'react-toastify';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { movies, add, remove, isFavourite } = useFavMovieStore();

  const handleAddToFavorites = () => {
    add(movie);
    toast.success(`"${movie.original_title}" added to favorites!`, {
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
    toast.info(`"${movie.original_title}" removed from favorites!`, {
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
      <Link href={`/movie/${movie.id}`}>
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
          <p>{movie.original_title}</p>
          <p>{movie.vote_average.toPrecision(2)}&#9733;</p>
        </div>
        <div className={styles.movieDateAndButton}>
          <div>
            <p>{movie.release_date.split("-")[0]}</p>
          </div>
          <p>&#x2022; </p>
          <div className={styles.favButton}>            <button
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
