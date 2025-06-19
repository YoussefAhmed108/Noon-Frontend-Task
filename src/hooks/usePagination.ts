"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import { useFetch } from "./useFetch";
import { Movie } from "@/types/movie";

interface UsePaginationOptions {
  term: string;
  initialPage?: number;
  apiKey: string;
  itemsPerPage?: number;
  maxPages?: number;
}

interface UsePaginationReturn {
  movies: Movie[] | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (value: number | ((prevPage: number) => number)) => void;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const usePagination = ({
  term,
  initialPage = 1,
  apiKey,
  itemsPerPage = 20,
  maxPages = 10,
}: UsePaginationOptions): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const cacheRef = useRef<{
    [key: string]: {
      results: Movie[];
      totalResults: number;
      totalPages: number;
    };
  }>({});
  const previousTermRef = useRef<string>(term);

  // Reset page to 1 when term changes
  useEffect(() => {
    if (previousTermRef.current !== term) {
      setPage(1);
      previousTermRef.current = term;
    }
  }, [term]);

  // Construct the API URL and config based on current state
  const url = useMemo(() => {
    if (!term.trim()) return "";
    return `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(
      term
    )}&page=${page}&include_adult=false&sort_by=popularity.desc`;
  }, [term, page]);

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        accept: "application/json",
      },
    };
  }, [apiKey]);
  
  // Use the useFetch hook to fetch data
  const {
    data: fetchedData,
    isLoading: fetchLoading,
    error: fetchError,
  } = useFetch(url, url ? config : undefined);

  // Handle the API response
  useEffect(() => {
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

    // Return data from cache if available
    if (cacheRef.current[cacheKey]) {
      const cachedData = cacheRef.current[cacheKey];
      setMovies(cachedData.results);
      setTotalResults(cachedData.totalResults);
      setTotalPages(Math.min(cachedData.totalPages, maxPages));
      setIsLoading(false);
      setError(null);
      return;
    }

    // Update state based on fetch results
    setIsLoading(fetchLoading);

    if (fetchError) {
      setError(fetchError);
      setMovies([]);
      return;
    }

    if (fetchedData) {
      // Store results in cache
      cacheRef.current[cacheKey] = {
        results: fetchedData.results,
        totalResults: fetchedData.total_results || 0,
        totalPages: fetchedData.total_pages || 1,
      };

      setMovies(fetchedData.results);
      setTotalResults(fetchedData.total_results || 0);
      setTotalPages(Math.min(fetchedData.total_pages || 1, maxPages));
    } else if (!fetchLoading) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
    }
  }, [term, page, apiKey, maxPages, fetchedData, fetchLoading, fetchError]);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const goToNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
