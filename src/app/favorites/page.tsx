'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import MovieCard from '@/components/MovieCard';
import { useFavMovieStore } from '@/stores/useMovieStore';

import styles from './page.module.css';

const FavouritesPage = () => {
  const { movies } = useFavMovieStore();
  const [mounted, setMounted] = useState(false);

  // Ensure we only render after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Favorites</h1>
        {mounted && movies?.length > 0 ? (
          <div className={styles.moviesGrid}>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIcon}>💔</div>
            <div className={styles.emptyStateText}>
              {mounted
                ? "You haven't added any favorite movies yet. Browse movies to find your favorites!"
                : 'Loading your favorite movies...'}
            </div>
            {mounted && (
              <Link href='/'>
                <button className={styles.browseButton}>Browse Movies</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
