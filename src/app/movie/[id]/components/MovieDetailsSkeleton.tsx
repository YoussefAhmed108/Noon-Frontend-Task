import React from 'react';

import Spinner from '@/components/Spinner';

import styles from '../page.module.css';


/**
 * Skeleton component displayed while movie details are loading
 * Provides a wireframe layout similar to the actual content
 */
export default function MovieDetailsSkeleton() {
  return (
    <div className={styles.movieInfo} style={{ gap: '1rem' }}>
      <div style={{ width: '300px', height: '450px', background: '#333', borderRadius: '8px' }}></div>
      <div style={{ flex: '1' }}>
        <div style={{ height: '40px', width: '70%', background: '#333', borderRadius: '4px', marginBottom: '1rem' }}></div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ height: '30px', width: '80px', background: '#444', borderRadius: '20px' }}></div>
          <div style={{ height: '30px', width: '80px', background: '#444', borderRadius: '20px' }}></div>
        </div>
        <div style={{ height: '20px', width: '40%', background: '#333', borderRadius: '4px', marginBottom: '1rem' }}></div>
        <div style={{ height: '100px', width: '90%', background: '#333', borderRadius: '4px', marginBottom: '1rem' }}></div>
        <Spinner />
      </div>
    </div>
  );
}
