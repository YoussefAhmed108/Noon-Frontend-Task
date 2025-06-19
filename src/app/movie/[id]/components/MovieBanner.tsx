import React from 'react';
import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/app/utils/tmdb";
import styles from "./components.module.css";

interface MovieBannerProps {
  movie: Movie;
}

const MovieBanner: React.FC<MovieBannerProps> = ({ movie }) => {
  return (
    <div className={styles.posterCol}>
      {movie.poster_path ? (
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.original_title}
          className={styles.posterImg}
        />
      ) : (
        <div className={styles.noPoster}>No poster available</div>
      )}
    </div>
  );
};

export default MovieBanner;
