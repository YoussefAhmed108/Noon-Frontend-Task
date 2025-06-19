"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import { Movie } from "@/types/movie";

/**
 * Options for usePagination hook
 */
interface UsePaginationOptions {
  /** Search term to query for */
  term: string;
  /** Initial page number to start from */
  initialPage?: number;
  /** API key for TMDB */
  apiKey: string;
  /** Number of items per page (defaults to 20, but controlled by API) */
  itemsPerPage?: number;
  /** Maximum pages to load (defaults to 10) */
  maxPages?: number;
}

/**
 * Return type for usePagination hook
 */
interface UsePaginationReturn {
  /** List of movies for the current page */
  movies: Movie[] | null;
  /** Whether data is currently being loaded */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Current page number */
  page: number;
  /** Function to set the page number */
  setPage: (value: number | ((prevPage: number) => number)) => void;
  /** Total number of results across all pages */
  totalResults: number;
  /** Total number of available pages */
  totalPages: number;
  /** Whether there is a next page available */
  hasNextPage: boolean;
  /** Whether there is a previous page available */
  hasPreviousPage: boolean;
  /** Function to go to the next page */
  goToNextPage: () => void;
  /** Function to go to the previous page */
  goToPreviousPage: () => void;
}

/**
 * Interface for TMDB API response
 */
interface SearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

/**
 * Hook for handling paginated search results with caching
 */
export const usePagination = ({
  term,
  initialPage = 1,
  apiKey,
  itemsPerPage = 20,
  maxPages = 50,
}: UsePaginationOptions): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Cache for storing fetched results
  const cacheRef = useRef<{
    [key: string]: {
      results: Movie[];
      totalResults: number;
      totalPages: number;
    };
  }>({});
  
  // Keep track of the previous search term to reset page
  const previousTermRef = useRef<string>(term);
  
  // Track the current request to handle race conditions
  const activeRequestRef = useRef<string | null>(null);

  // Reset page to 1 when search term changes
  useEffect(() => {
    if (previousTermRef.current !== term) {
      setPage(1);
      previousTermRef.current = term;
    }
  }, [term]);

  /**
   * Fetch data from the TMDB API
   */
  const fetchData = useCallback(async () => {
    // Don't proceed if API key is missing
    if (!apiKey) {
      setError("API key is missing. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    // Don't proceed if search term is empty
    if (!term.trim()) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
      setIsLoading(false);
      setError(null);
      return;
    }

    const cacheKey = `${term}-${page}`;

    // Check cache first
    if (cacheRef.current[cacheKey]) {
      const cachedData = cacheRef.current[cacheKey];
      setMovies(cachedData.results);
      setTotalResults(cachedData.totalResults);
      setTotalPages(Math.min(cachedData.totalPages, maxPages));
      setIsLoading(false);
      setError(null);
      return;
    }

    // Show loading state
    setIsLoading(true);
    
    // Create a unique identifier for this request
    const requestId = `${term}-${page}-${Date.now()}`;
    activeRequestRef.current = requestId;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(
        term
      )}&page=${page}&include_adult=false&sort_by=popularity.desc`;
      
      const config = {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      };

      const response = await axios.get<SearchResponse>(url, config);
      
      // Only update state if this is still the active request
      if (activeRequestRef.current === requestId) {
        const data = response.data;
        
        // Store results in cache
        cacheRef.current[cacheKey] = {
          results: data.results || [],
          totalResults: data.total_results || 0,
          totalPages: data.total_pages || 1,
        };
        
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(Math.min(data.total_pages || 1, maxPages));
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      // Only update error state if this is still the active request
      if (activeRequestRef.current === requestId) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setMovies([]);
        setIsLoading(false);
      }
    }
  }, [term, page, apiKey, maxPages]);
  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
    
    // Cleanup when component unmounts or dependencies change
    return () => {
      // Cancel the current request on cleanup
      activeRequestRef.current = null;
    };
  }, [fetchData]);
  
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  
  /**
   * Go to the next page if available
   */
  const goToNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * Go to the previous page if available
   */
  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return {
    movies,
    isLoading,
    error,
    page,
    setPage,
    totalResults,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  };
};
