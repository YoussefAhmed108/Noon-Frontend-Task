import React from "react";
import { Movie } from "@/types/movie";
import { useFavMovieStore } from "@/stores/useMovieStore";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { movies, add, remove , isFavourite } = useFavMovieStore();
  
  return (
    <div>
      {movie.original_title}
      <img src={movie.poster_path}/>
      <button onClick={() => {add(movie);console.log("Movie added")}}>Add to Favourite List</button>
    </div>
  );
};

export default MovieCard;
