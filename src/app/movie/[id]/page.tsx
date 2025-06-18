"use client";
import { formatRuntime, getBackdropUrl, getPosterUrl } from "@/app/utils/tmdb";
import { useFetch } from "@/hooks/useFetch";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import styles from "./page.module.css";
import { useFavMovieStore } from "@/stores/useMovieStore";

const MoviePage = () => {
  const { id } = useParams();
  const { movies, add, remove, isFavourite } = useFavMovieStore();
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

  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovie(json);
        setIsLoading(false);
        console.log(json);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [url]);

  const trailer = movie?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official &&
      video.name.includes("Official Trailer")
  );

  if (isLoading) return <Spinner />;

  // Helper for genres
  const genreNames = movie?.genres?.map((g) => g.name).join(", ");
  // Helper for cast
  const castNames = movie?.credits?.cast
    ?.map((c) => c.name)
    .slice(0, 6)
    .join(", ");
  // Helper for production
  const production = movie?.production_companies?.[0]?.name;
  // Helper for country
  const country = movie?.production_countries?.map((c) => c.name).join(", ");
  // Helper for release date
  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div
      className={styles.backdropContainer}
      style={{
        backgroundImage: movie?.backdrop_path
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${getBackdropUrl(
              movie.backdrop_path
            )})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <div className={styles.centerCard}>
        <div className={styles.movieInfo}>
          <div className={styles.posterCol}>
            {movie?.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.original_title}
                className={styles.posterImg}
              />
            ) : (
              <div className={styles.noPoster}>No poster available</div>
            )}
          </div>
          <div className={styles.infoCol}>
            <div className={styles.headerRow}>
              <h1 className={styles.title}>{movie?.original_title}</h1>
              {movie && typeof movie.id === "number" ? (
                isFavourite(movie.id) ? (
                  <button
                    className={styles.rmvFavBtn}
                    onClick={() => remove(movie.id)}
                  >
                    <span className={styles.favIcon}>💔</span> Remove from
                    Favourites
                  </button>
                ) : (
                  <button className={styles.favBtn} onClick={() => add(movie)}>
                    <span className={styles.favIcon}>🤍</span> Add to Favourites
                  </button>
                )
              ) : null}
            </div>
            <div className={styles.metaRow}>
              {movie?.genres?.slice(0, 3).map((g) => (
                <span className={styles.genreTag} key={g.id}>
                  {g.name}
                </span>
              ))}
              <span className={styles.metaItem}>
                &#x1F4C5; {movie?.release_date?.split("-")[0]}
              </span>
              <span className={styles.metaItem}>
                &#x23F1; {movie?.runtime ? formatRuntime(movie.runtime) : ""}
              </span>
              <span className={styles.metaItem}>★ {movie?.vote_average.toPrecision(2)}</span>
            </div>
            <p className={styles.overview}>{movie?.overview}</p>
            <div className={styles.detailsTable}>
              <div>
                <span>Country :</span> <span>{country}</span>
              </div>
              <div>
                <span>Genre :</span> <span>{genreNames}</span>
              </div>
              <div>
                <span>Date Release :</span> <span>{releaseDate}</span>
              </div>
              <div>
                <span>Production :</span> <span>{production}</span>
              </div>
              <div>
                <span>Cast :</span> <span>{castNames}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.trailerSection}>
          <h2 className={styles.trailerTitle}>Trailer</h2>
          {trailer ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.trailer}
            ></iframe>
          ) : (
            <div className={styles.noTrailer}>No trailer available</div>
          )}
        </div>

        {/* Cast and Crew Side by Side */}
        {(movie?.credits?.cast?.length || movie?.credits?.crew?.length) && (
          <div className={styles.castCrewWrapper}>
            {/* Cast Table */}
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
            {/* Crew Table */}
            <div className={styles.crewTableSection}>
              <div className={styles.castCrewHeaderRow}>
                <h2 className={styles.castCrewTitle}>Crew</h2>
                {/* <span className={styles.viewAll}>View all ▼</span> */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
