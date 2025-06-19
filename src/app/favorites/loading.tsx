import React from 'react';
import Spinner from '@/components/Spinner';
import styles from './page.module.css';

/**
 * Loading component for favorites page
 * Displayed during navigation to favorites page
 */
export default function FavoritesLoading() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner />
      <h2 className={styles.loadingText}>Loading your favorites...</h2>
    </div>
  );
}
