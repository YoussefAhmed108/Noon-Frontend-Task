import React from "react";
import { Movie } from "@/types/movie";
import { useFavMovieStore } from "@/stores/useMovieStore";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { getPosterUrl } from "@/app/utils/tmdb";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { movies, add, remove, isFavourite } = useFavMovieStore();

  return (
    <div className={styles.cardContainer}>
      <Link href={`/movie/${movie.id}`}>
        {" "}
        <img src={getPosterUrl(movie.poster_path)} />{" "}
      </Link>
      <div className={styles.movieDetails}>
        <div className={styles.movieTitleAndRating}>
          <p>{movie.original_title}</p>
          <p>{movie.vote_average.toPrecision(2)}★</p>
        </div>
        <div className={styles.movieDateAndButton}>
          <div>
            <p>{movie.release_date.split("-")[0]}</p>
          </div>
          <p>&#x2022; </p>
          <div className={styles.favButton}>
            <button
              className={styles.favBtn}
              onClick={
                isFavourite(movie.id)
                  ? () => remove(movie.id)
                  : () => add(movie)
              }
              aria-label={
                isFavourite(movie.id)
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
            >
              {isFavourite(movie.id) ? "★" : "☆"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
