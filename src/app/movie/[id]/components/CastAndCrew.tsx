import React from 'react';
import { Movie } from "@/types/movie";
import Image from "next/image";
import styles from "./components.module.css";

interface CastAndCrewProps {
  movie: Movie;
}

const CastAndCrew: React.FC<CastAndCrewProps> = ({ movie }) => {
  if (!movie?.credits?.cast?.length && !movie?.credits?.crew?.length) {
    return null;
  }

  return (
    <div className={styles.castCrewWrapper}>
      {/* Cast Table */}
      {movie?.credits?.cast?.length > 0 && (
        <div className={styles.castTableSection}>
          <div className={styles.castCrewHeaderRow}>
            <h2 className={styles.castCrewTitle}>Cast</h2>
          </div>
          <table className={styles.castTable}>
            <tbody>
              {movie?.credits?.cast?.slice(0, 8).map((actor) => (
                <tr key={actor.id} className={styles.castRow}>
                  <td className={styles.castImgCell}>
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                        alt={actor.name}
                        width={38}
                        height={38}
                        className={styles.castImg}
                      />
                    ) : (
                      <div className={styles.castImgPlaceholder}></div>
                    )}
                  </td>
                  <td className={styles.castNameCell}>
                    <span className={styles.castName}>{actor.name}</span>
                  </td>
                  <td className={styles.castRoleCell}>
                    <span className={styles.castRole}>{actor.character}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Crew Table */}
      {movie?.credits?.crew?.length > 0 && (
        <div className={styles.crewTableSection}>
          <div className={styles.castCrewHeaderRow}>
            <h2 className={styles.castCrewTitle}>Crew</h2>
          </div>
          <table className={styles.crewTable}>
            <tbody>
              {["Director", "Writer", "Producer", "Photography", "Musician"].map(
                (job) => {
                  const crewMembers = movie?.credits?.crew?.filter(
                    (c) => c.job === job
                  );
                  if (!crewMembers || crewMembers.length === 0) return null;
                  return (
                    <tr key={job} className={styles.crewRow}>
                      <td className={styles.crewJobCell}>
                        <span className={styles.crewJob}>{job}</span>
                      </td>
                      <td className={styles.crewNamesCell}>
                        {crewMembers.map((c, i) => (
                          <span key={c.id} className={styles.crewName}>
                            {c.name}
                            {i < crewMembers.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </td>
                      <td className={styles.crewImgCell}>
                        {crewMembers[0]?.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92${crewMembers[0].profile_path}`}
                            alt={crewMembers[0].name}
                            width={38}
                            height={38}
                            className={styles.crewImg}
                          />
                        ) : (
                          <div className={styles.crewImgPlaceholder}></div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CastAndCrew;
