import React from 'react';
import Spinner from '@/components/Spinner';
import styles from './page.module.css';

/**
 * Loading component for favorites page
 * Displayed during navigation to favorites page
 */
export default function FavoritesLoading() {
  return (
    <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Spinner />
      <h2 style={{ marginTop: '2rem' }}>Loading your favorites...</h2>
    </div>
  );
}
