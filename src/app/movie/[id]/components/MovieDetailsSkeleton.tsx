import React from 'react';
import Spinner from '@/components/Spinner';
import pageStyles from '../page.module.css';
import styles from './MovieDetailsSkeleton.module.css';

/**
 * Skeleton component displayed while movie details are loading
 * Provides a wireframe layout similar to the actual content
 */
export default function MovieDetailsSkeleton() {
  return (
    <div className={`${pageStyles.movieInfo} ${styles.skeletonContainer}`}>
      <div className={styles.posterSkeleton}/>
      <div className={styles.detailsContainer}>
        <div className={styles.titleSkeleton}/>
        <div className={styles.genreContainer}>
          <div className={styles.genreSkeleton}/>
          <div className={styles.genreSkeleton}/>
        </div>
        <div className={styles.infoSkeleton}/>
        <div className={styles.overviewSkeleton}/>
        <Spinner />
      </div>
    </div>  );
}
