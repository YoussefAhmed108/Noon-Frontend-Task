import React from 'react';
import Spinner from '@/components/Spinner';
import styles from './page.module.css';

/**
 * Loading component for movie detail page
 * Displayed during navigation to movie pages while data is being fetched
 */
export default function MovieLoading() {
  return (
    <div className={styles.backdropContainer} style={{ background: '#111' }}>
      <div className={styles.centerCard} style={{ justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Spinner />
        <h2 style={{ marginTop: '2rem', color: 'white' }}>Loading movie details...</h2>
      </div>
    </div>
  );
}
