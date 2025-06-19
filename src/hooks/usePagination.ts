"use client";

import { useState, useEffect, useRef } from "react";
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
  const cacheRef = useRef<{ [key: string]: { results: Movie[], totalResults: number, totalPages: number } }>({});
  const previousTermRef = useRef<string>(term);
  
  // Reset page to 1 when term changes
  useEffect(() => {
    if (previousTermRef.current !== term) {
      setPage(1);
      previousTermRef.current = term;
    }
  }, [term]);
  
  useEffect(() => {
    const fetchMovies = async () => {
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
        console.log(`Loaded page ${page} for term '${term}' from cache.`);
        return;
      }
      
      // Otherwise fetch from API
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching page ${page} for term '${term}' from API.`);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(term)}&page=${page}&include_adult=false&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              accept: "application/json",
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success === false) {
          throw new Error(data.status_message || "Error from TMDB API");
        }
        
        if (data && data.results) {
          // Store in cache
          cacheRef.current[cacheKey] = {
            results: data.results,
            totalResults: data.total_results || 0,
            totalPages: data.total_pages || 1
          };
          
          setMovies(data.results);
          setTotalResults(data.total_results || 0);
          setTotalPages(Math.min(data.total_pages || 1, maxPages));
        } else {
          setMovies([]);
          setTotalResults(0);
          setTotalPages(0);
        }
      } catch (err: any) {
        console.error("Search API error:", err);
        setError(err.message || "Error fetching data");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, [term, page, apiKey, maxPages]);
  
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  
  const goToNextPage = () => {
    if (hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setPage(prevPage => prevPage - 1);
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
