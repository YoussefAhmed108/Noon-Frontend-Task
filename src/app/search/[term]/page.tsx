'use client';

import React, { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import MovieCard from '@/components/MovieCard';

import { usePagination } from '@/hooks/usePagination';

import Error from './error';
import SearchLoading from './loading';

import styles from './page.module.css';


const Search = () => {
  const router = useRouter();
  const { term } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const [searchTerm, setSearchTerm] = useState(String(term));

  const {
    movies,
    isLoading,
    error,
    page,
    totalPages,
    totalResults,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination({
    term: String(term),
    apiKey: API_KEY || '',
    maxPages: 10,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  if (error) return <Error error={error} reset={() => {}} />;
  if (isLoading) return <SearchLoading />;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search by movie title...'
          className={styles.searchInput}
        />
        <button
          type='submit'
          className={styles.searchButton}
          disabled={!searchTerm.trim()}
        >
          Search
        </button>
      </form>

      {movies && (
        <div className={styles.resultsInfo}>
          <h1 className={styles.searchTitle}>
            {totalResults > 0
              ? `Results for '${term}'`
              : `No results found for '${term}'`}
          </h1>
          <p className={styles.resultsCount}>
            {totalResults > 0 && `Found ${totalResults} movies`}
          </p>
        </div>
      )}

      <div className={styles.moviesGrid}>
        {movies && movies.length !== 0 ? (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <div className={styles.noMovies}>
            <p>No movies found for this search term</p>
            <p>Try searching for something else</p>
          </div>
        )}
      </div>

      {totalResults > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={!hasPreviousPage}
            onClick={goToPreviousPage}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <p className={styles.pageIndicator}>
            Page {page} of {totalPages}
          </p>
          <button
            disabled={!hasNextPage}
            onClick={goToNextPage}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
