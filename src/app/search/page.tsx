"use client"

import React, { useEffect, useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import Error from './error';
import Spinner from '@/components/Spinner';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

const Search = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const [searchTerm , setSearchTerm] = useState<string>("")
  const { data: movies, isLoading, error } = useFetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc',
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: 'application/json',
      },
    }
  );
  const [filteredMovies , setFilteredMovies] = useState<Movie[] | null>([])
  useEffect(() => {
    setFilteredMovies(movies)
  },[movies])
  const searchMovies = (searchTerm : string) => {
    console.log(searchTerm)
    console.log(movies?.filter(movie => movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())))
    setFilteredMovies(movies? movies.filter(movie => movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())) : null)
  }
  if (error) return <Error/>
  if (isLoading) return <Spinner/>
  console.log(filteredMovies)
  return (
    <div>
        <span>
          <input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search By Movie title...'/>
          <button onClick={() => searchMovies(searchTerm)}>Search</button>
        </span>
        <div>
          {
            filteredMovies?.length != 0?
            filteredMovies?.map(movie => <MovieCard movie={movie} key={movie.id}/>)
            :
            <span>No Movies found for this search term</span>

          }
        </div>
    </div>
  )
}

export default Search