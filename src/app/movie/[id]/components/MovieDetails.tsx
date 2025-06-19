import React from 'react';

import { formatRuntime } from '@/app/utils/tmdb';
import { Movie } from '@/types/movie';

import MovieHeader from './MovieHeader';
import styles from './components.module.css';

interface MovieDetailsProps {
  movie: Movie;
  isMobile: boolean;
}

/**
 * Component for displaying detailed movie information
 * @param props - Contains the movie object and isMobile flag for responsive display
 * @returns React component with formatted movie details
 */
const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, isMobile }) => {
  // Helper for genres
  const genreNames = movie?.genres?.map((g) => g.name).join(', ');
  
  // Helper for cast
  const castNames = movie?.credits?.cast
    ?.map((c) => c.name)
    .slice(0, 6)
    .join(', ');
    
  // Helper for production
  const production = movie?.production_companies?.[0]?.name;
  
  // Helper for country
  const country = movie?.production_countries?.map((c) => c.name).join(', ');
  
  // Helper for release date
  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    : '';

  return (
    <div className={styles.infoCol}>
      <MovieHeader movie={movie} isMobile={isMobile} />
      
      <div className={styles.metaRow}>
        {movie?.genres?.slice(0, isMobile ? 2 : 3).map((g) => (
          <span className={styles.genreTag} key={g.id}>
            {g.name}
          </span>
        ))}
        <span className={styles.metaItem}>
          &#x1F4C5; {movie?.release_date?.split('-')[0]}
        </span>
        <span className={styles.metaItem}>
          &#x23F1; {movie?.runtime ? formatRuntime(movie.runtime) : ''}
        </span>
        <span className={styles.metaItem}>★ {movie?.vote_average.toPrecision(2)}</span>
      </div>
      
      <p className={styles.overview}>{movie?.overview}</p>
      
      <div className={styles.detailsTable}>
        <div>
          <span>Country :</span> <span>{country}</span>
        </div>
        <div>
          <span>Genre :</span> <span>{genreNames}</span>
        </div>
        <div>
          <span>Date Release :</span> <span>{releaseDate}</span>
        </div>
        <div>
          <span>Production :</span> <span>{production}</span>
        </div>
        <div>
          <span>Cast :</span> <span>{castNames}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
