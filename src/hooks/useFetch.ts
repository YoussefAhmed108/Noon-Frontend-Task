'use client';

import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { Movie } from '@/types/movie';

interface UseFetchResult {
  data: Movie[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch(
  url: string,
  config?: AxiosRequestConfig,
): UseFetchResult {
  const [data, setData] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    axios(url, config)
      .then((response) => {
        if (isMounted) {
          setData(response.data.results);
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
