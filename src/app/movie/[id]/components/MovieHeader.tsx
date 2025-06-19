import React from 'react';
import { Movie } from "@/types/movie";
import styles from "./components.module.css";
import FavoriteButton from './FavoriteButton';

interface MovieHeaderProps {
  movie: Movie;
  isMobile: boolean;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({ movie, isMobile }) => {
  return (
    <div className={styles.headerRow}>
      <h1 className={styles.title}>{movie.original_title}</h1>
      <FavoriteButton movie={movie} isMobile={isMobile} />
    </div>
  );
};

export default MovieHeader;
