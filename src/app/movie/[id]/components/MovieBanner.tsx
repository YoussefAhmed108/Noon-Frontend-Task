import React from 'react';

import Image from 'next/image';

import { getPosterUrl } from '@/app/utils/tmdb';
import { Movie } from '@/types/movie';

import styles from './components.module.css';


interface MovieBannerProps {
  movie: Movie;
}

const MovieBanner: React.FC<MovieBannerProps> = ({ movie }) => {
  return (
    <div className={styles.posterCol}>
      {movie.poster_path ? (
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.original_title}
          className={styles.posterImg}
          width={300}
          height={450}
        />
      ) : (
        <div className={styles.noPoster}>No poster available</div>
      )}
    </div>
  );
};

export default MovieBanner;
