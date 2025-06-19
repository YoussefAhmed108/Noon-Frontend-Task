"use client";
import React from 'react';
import { useEffect } from 'react';
import styles from './error.module.css';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string } | string;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  const router = useRouter();
  
  // Error emoji options
  const errorEmojis = ['⚠️', '🚫', '❌', '⛔', '🔴', '❗', '‼️'];
  const randomEmoji = errorEmojis[Math.floor(Math.random() * errorEmojis.length)];
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Search page error:', error);
  }, [error]);
  
  const handleRetry = () => {
    // Attempt to recover by trying to re-render the segment
    reset();
  };
  
  const handleGoHome = () => {
    router.push('/');
  };
  
  // Get the error message
  const errorMessage = typeof error === 'string' 
    ? error 
    : error.message || 'An unexpected error occurred';
    return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>        <div className={styles.errorEmoji} aria-hidden="true">
          {randomEmoji}
        </div>
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        <p className={styles.errorSubtitle}>{errorMessage}</p>
        <div className={styles.errorActions}>
          <button 
            onClick={handleRetry} 
            className={styles.retryButton}
          >
            Try again
          </button>
          <button
            onClick={handleGoHome}
            className={styles.homeButton}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;