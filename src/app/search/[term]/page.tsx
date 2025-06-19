"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Error from "./error";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

const Search = () => {
  const { term } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<{ [key: string]: Movie[] }>({});

  useEffect(() => {
    const cacheKey = `${term}-${page}`;
    if (cacheRef.current[cacheKey]) {
      setMovies(cacheRef.current[cacheKey]);
      setIsLoading(false);
      setError(null);
      console.log(`Loaded page ${page} for term '${term}' from cache.`);
      return;
    }
    setIsLoading(true);
    setError(null);
    console.log(`Fetching page ${page} for term '${term}' from API.`);
    fetch(
      `https://api.themoviedb.org/3/search/movie?language=en-US&query=${term}&page=${page}&include_adult=false&sort_by=popularity.desc`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          cacheRef.current[cacheKey] = data.results;
          setMovies(data.results);
        } else {
          setMovies([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setIsLoading(false);
      });
  }, [term, page, API_KEY]);

  const itemsPerPage = 10;
  const totalPages = 10; // TMDB returns 20 per page, but you can adjust as needed

  if (error) return <Error />;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <span className={styles.searchBar}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search By Movie title..."
        />
        <button>Search</button>
      </span>
      <div className={styles.moviesGrid}>
        {movies && movies.length !== 0 ? (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <span className={styles.noMovies}>
            No Movies found for this search term
          </span>
        )}
      </div>
      <div className={styles.pagination}>
        <button disabled={page == 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <p>Page {page}</p>
        <button
          disabled={page == totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
