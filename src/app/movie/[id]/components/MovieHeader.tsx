import React from 'react';

import { Movie } from '@/types/movie';

import FavoriteButton from './FavoriteButton';
import styles from './components.module.css';

interface MovieHeaderProps {
  movie: Movie;
  isMobile: boolean;
}

/**
 * Component for displaying the movie title and favorite button
 * @param props - Contains the movie object and isMobile flag
 * @returns React component with movie title and favorite button
 */
const MovieHeader: React.FC<MovieHeaderProps> = ({ movie, isMobile }) => {
  return (
    <div className={styles.headerRow}>
      <h1 className={styles.title}>{movie.original_title}</h1>
      <FavoriteButton movie={movie} isMobile={isMobile} />
    </div>
  );
};

export default MovieHeader;
