import React from 'react';
import Spinner from '@/components/Spinner';
import styles from './page.module.css';

/**
 * Loading component for search results page
 * Displayed during navigation to search pages while data is being fetched
 */
export default function SearchLoading() {
  return (
    <div className={`${styles.container} ${styles.loadingContainer}`}>
      <Spinner />
    </div>
  );
}
