import React from 'react';
import Spinner from '@/components/Spinner';
import pageStyles from '../page.module.css';
import styles from './MovieDetailsSkeleton.module.css';

/**
 * Skeleton component displayed while movie details are loading
 * Provides a wireframe layout that closely matches the actual MovieDetails component
 * with appropriate spacing, dimensions, and responsive behavior
 */
export default function MovieDetailsSkeleton() {
  return (
    <div className={`${pageStyles.movieInfo} ${styles.skeletonContainer}`}>
      {/* Poster skeleton */}
      <div className={styles.posterSkeleton}></div>
      
      {/* Details container */}
      <div className={styles.detailsContainer}>
        {/* Header with title and favorite button */}
        <div className={styles.headerRow}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.buttonSkeleton}></div>
        </div>
        
        {/* Meta row with genres and info items */}
        <div className={styles.metaRow}>
          <div className={styles.genreSkeleton}></div>
          <div className={styles.genreSkeleton}></div>
          <div className={styles.genreSkeleton}></div>
          <div className={styles.metaItemSkeleton}></div>
          <div className={styles.metaItemSkeleton}></div>
          <div className={styles.metaItemSkeleton}></div>
        </div>
        
        {/* Overview paragraph */}
        <div className={styles.overviewSkeleton}></div>
        
        {/* Details table */}
        <div className={styles.detailsTableSkeleton}>
          <div className={styles.detailsRowSkeleton}>
            <div className={styles.detailsLabelSkeleton}></div>
            <div className={styles.detailsValueSkeleton}></div>
          </div>
          <div className={styles.detailsRowSkeleton}>
            <div className={styles.detailsLabelSkeleton}></div>
            <div className={styles.detailsValueSkeleton}></div>
          </div>
          <div className={styles.detailsRowSkeleton}>
            <div className={styles.detailsLabelSkeleton}></div>
            <div className={styles.detailsValueSkeleton}></div>
          </div>
          <div className={styles.detailsRowSkeleton}>
            <div className={styles.detailsLabelSkeleton}></div>
            <div className={styles.detailsValueSkeleton}></div>
          </div>
          <div className={styles.detailsRowSkeleton}>
            <div className={styles.detailsLabelSkeleton}></div>
            <div className={styles.detailsValueSkeleton}></div>
          </div>
        </div>
        
        {/* Loading spinner at the bottom */}
        <div style={{ marginTop: '1rem' }}>
          <Spinner />
        </div>
      </div>
    </div>
  );
}
