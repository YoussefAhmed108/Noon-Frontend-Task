import React from 'react';
import { Movie } from "@/types/movie";
import { useFavMovieStore } from "@/stores/useMovieStore";
import { toast } from 'react-toastify';
import styles from "./components.module.css";

interface FavoriteButtonProps {
  movie: Movie;
  isMobile: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, isMobile }) => {
  const { isFavourite, add, remove } = useFavMovieStore();
  
  const handleAddToFavorites = () => {
    add(movie);
    toast.success(`"${movie.original_title}" added to favorites!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRemoveFromFavorites = () => {
    remove(movie.id);
    toast.info(`"${movie.original_title}" removed from favorites!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  return (
    <div className={styles.buttonContainer}>
      {typeof movie.id === "number" && (
        isFavourite(movie.id) ? (
          <button
            className={styles.rmvFavBtn}
            onClick={handleRemoveFromFavorites}
          >
            <span className={styles.favIcon}>💔</span> {!isMobile && "Remove from Favourites"}
            {isMobile && "Remove"}
          </button>
        ) : (
          <button 
            className={styles.favBtn} 
            onClick={handleAddToFavorites}
          >
            <span className={styles.favIcon}>🤍</span> {!isMobile && "Add to Favourites"}
            {isMobile && "Add"}
          </button>
        )
      )}
    </div>
  );
};

export default FavoriteButton;
