"use client";
import { getBackdropUrl } from "@/app/utils/tmdb";
import { Movie } from "@/types/movie";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import styles from "./page.module.css";
import MovieBanner from "./components/MovieBanner";
import MovieDetails from "./components/MovieDetails";
import MovieTrailer from "./components/MovieTrailer";
import CastAndCrew from "./components/CastAndCrew";

const MoviePage = () => {
  const { id } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovie(json);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [url]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const trailer = movie?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official &&
      video.name.includes("Official Trailer")
  );

  if (isLoading) return <Spinner />;

  return (
    <div
      className={styles.backdropContainer}
      style={{
        backgroundImage: movie?.backdrop_path
          ? `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url(${getBackdropUrl(
              movie.backdrop_path
            )})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className={styles.centerCard}>
        <div className={styles.movieInfo}>
          <MovieBanner movie={movie!} />
          <MovieDetails movie={movie!} isMobile={isMobile} />
        </div>
        
        <MovieTrailer trailer={trailer} />
        
        {movie && <CastAndCrew movie={movie} />}
      </div>
    </div>
  );
};

export default MoviePage;
