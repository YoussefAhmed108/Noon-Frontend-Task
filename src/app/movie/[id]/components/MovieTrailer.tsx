import React from 'react';
import { VideoTrailer } from '@/types/movie';

import styles from './components.module.css';

interface MovieTrailerProps {
  trailer: VideoTrailer | undefined;
}

/**
 * Component for displaying a YouTube movie trailer
 * @param props - Contains the trailer object with YouTube key and other metadata
 * @returns React component with embedded YouTube player or "no trailer" message
 */
const MovieTrailer: React.FC<MovieTrailerProps> = ({ trailer }) => {
  return (
    <div className={styles.trailerSection}>
      <h2 className={styles.trailerTitle}>Trailer</h2>
      {trailer ? (
        <div className={styles.trailerWrapper}>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className={styles.trailer}
          />
        </div>
      ) : (
        <div className={styles.noTrailer}>No trailer available</div>
      )}
    </div>
  );
};

export default MovieTrailer;
