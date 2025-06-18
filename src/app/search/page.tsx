"use client";

import React, { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Error from "./error";
import Spinner from "@/components/Spinner";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

const Search = () => {
  const {term} = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: movies,
    isLoading,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/search/movie?language=en-US& query=${term}& page=${page}& include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    }
  );
  const itemsPerPage = 10;
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  useEffect(() => {
    const itemsPerPage = 10;
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    setPage(1);
  }, [filteredMovies]);

  useEffect(() => {
    setFilteredMovies(movies || []);
  }, [movies]);

  const searchMovies = (searchTerm: string) => {
    setFilteredMovies(
      movies
        ? movies.filter((movie) =>
            movie.original_title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        : []
    );
  };
  if (error) return <Error />;
  if (isLoading) return <Spinner />;
  console.log(filteredMovies);
  return (
    <div className={styles.container}>
      <span className={styles.searchBar}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search By Movie title..."
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </span>
      <div className={styles.moviesGrid}>
        {filteredMovies?.length != 0 ? (
          filteredMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
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
