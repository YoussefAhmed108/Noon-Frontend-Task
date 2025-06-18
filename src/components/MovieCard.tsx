import React from "react";
import { Movie } from "@/types/movie";
import { useFavMovieStore } from "@/stores/useMovieStore";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { getPosterUrl } from "@/app/utils/tmdb";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { movies, add, remove , isFavourite } = useFavMovieStore();
  
  
  return (
    <div>
      <Link href={`/movie/${movie.id}`}> <img src={getPosterUrl(movie.poster_path)}/> </Link>
      <div>
        <div>
            {movie.original_title}
        </div>
        <div>
            <p>Release Year : {movie.release_date.split("-")[0]}</p>
        </div>
      </div>
      <button onClick={() => {add(movie);console.log("Movie added")}}>Add to Favourite List</button>

    </div>
  );
};

export default MovieCard;
