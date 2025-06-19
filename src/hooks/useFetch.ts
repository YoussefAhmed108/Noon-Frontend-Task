'use client';

import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { Movie } from '@/types/movie';

interface SearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

interface UseFetchResult {
  data: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch(
  url: string,
  config?: AxiosRequestConfig,
): UseFetchResult {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Reset state if URL is empty
    if (!url) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    axios(url, config)
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error fetching data');
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(config)]);

  return { data, isLoading, error };
}
