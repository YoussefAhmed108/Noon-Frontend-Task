"use client";

import React, { useEffect, useState } from "react";
import { Movie, VideoTrailer } from "@/types/movie";
import { getBackdropUrl } from "@/app/utils/tmdb";
import MovieBanner from "./components/MovieBanner";
import MovieDetails from "./components/MovieDetails";
import MovieTrailer from "./components/MovieTrailer";
import CastAndCrew from "./components/CastAndCrew";
import styles from "./page.module.css";

interface MovieClientProps {
  movie: Movie;
  trailer?: VideoTrailer;
}

/**
 * Client Component for movie details
 * Handles client-side functionality like responsive layout detection
 * @param props - MovieClientProps containing movie data and trailer info
 */
export default function MovieClient({ movie, trailer }: MovieClientProps) {
  // Track whether the viewport is mobile sized
  const [isMobile, setIsMobile] = useState(false);
  // Track the loaded backdrop image URL
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle backdrop image preloading
  useEffect(() => {
    if (!movie?.backdrop_path) return;
    
    const img = new Image();
    img.src = getBackdropUrl(movie.backdrop_path, 'w1280');
    img.onload = () => {
      setBackdropLoaded(true);
    };
  }, [movie?.backdrop_path]);

  // Create backdrop style
  const backdropStyle = {
    background: '#111',
    backgroundImage: (backdropLoaded && movie?.backdrop_path)
      ? `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url(${getBackdropUrl(movie.backdrop_path, 'w1280')})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    color: '#fff',
  };

  return (
    <div className={styles.backdropContainer} style={backdropStyle}>
      <div className={styles.centerCard}>
        <div className={styles.movieInfo}>
          {movie && <MovieBanner movie={movie} />}
          {movie && <MovieDetails movie={movie} isMobile={isMobile} />}
        </div>

        <MovieTrailer trailer={trailer} />

        <CastAndCrew movie={movie} />
      </div>
    </div>
  );
}
