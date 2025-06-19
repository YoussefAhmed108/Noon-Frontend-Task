import { Movie, VideoTrailer } from '@/types/movie';

/**
 * Configuration object for movie data fetching
 */
interface MovieFetchConfig {
  /** The time in seconds to cache the data (default: 3600) */
  cacheTime?: number;
  /** The language to fetch the movie data in (default: en-US) */
  language?: string;
  /** Additional data to append to the response */
  appendToResponse?: string[];
}

/**
 * Default configuration for movie data fetching
 */
const DEFAULT_CONFIG: MovieFetchConfig = {
  cacheTime: 3600,
  language: 'en-US',
  appendToResponse: ['credits', 'videos'],
};

/**
 * Create the fetch request for a movie without awaiting the response
 * @param id - Movie ID to fetch
 * @param config - Optional configuration for the request
 * @returns Promise containing movie data
 */
export function createMovieRequest(id: string, config?: MovieFetchConfig): Promise<Response> {
  const { language, appendToResponse } = { ...DEFAULT_CONFIG, ...config };
  
  const API_KEY = process.env.API_KEY;
  const appendString = appendToResponse?.length ? `&append_to_response=${appendToResponse.join(',')}` : '';
  const url = `https://api.themoviedb.org/3/movie/${id}?language=${language}${appendString}`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    next: { revalidate: config?.cacheTime || DEFAULT_CONFIG.cacheTime },
  };

  return fetch(url, options);
}

/**
 * Fetches movie data from TMDB API
 * @param id - Movie ID to fetch
 * @param config - Optional configuration for the request
 * @returns Promise containing movie data
 */
export async function fetchMovieData(id: string, config?: MovieFetchConfig): Promise<Movie> {
  const res = await createMovieRequest(id, config);
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.status_message || `Failed to fetch movie data for ID: ${id}`;
    throw new Error(errorMessage);
  }
  
  return res.json();
}

/**
 * Helper types for filtering videos
 */
export type VideoSite = 'YouTube' | 'Vimeo' | string;
export type VideoType = 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | string;

/**
 * Video filter configuration
 */
interface VideoFilterOptions {
  site?: VideoSite;
  type?: VideoType;
  official?: boolean;
  nameIncludes?: string;
}

/**
 * Default options for finding official trailers
 */
const OFFICIAL_TRAILER_FILTER: VideoFilterOptions = {
  site: 'YouTube',
  type: 'Trailer',
  official: true,
  nameIncludes: 'Official Trailer',
};

/**
 * Finds a specific video in the movie's videos list based on filter criteria
 * @param movie - Movie object containing videos
 * @param options - Filter options to search for specific videos (default: official trailer)
 * @returns The matching video object or undefined
 */
export function findVideo(movie: Movie, options: VideoFilterOptions = OFFICIAL_TRAILER_FILTER): VideoTrailer | undefined {
  const { site, type, official, nameIncludes } = options;
  
  return movie?.videos?.results?.find(
    (video) => {
      let matches = true;
      
      if (site && video.site !== site) matches = false;
      if (type && video.type !== type) matches = false;
      if (official !== undefined && video.official !== official) matches = false;
      if (nameIncludes && !video.name.includes(nameIncludes)) matches = false;
      
      return matches;
    },
  );
}

/**
 * Finds the official trailer in the movie's videos list
 * @param movie - Movie object containing videos
 * @returns The official trailer video object or undefined
 */
export function findOfficialTrailer(movie: Movie): VideoTrailer | undefined {
  return findVideo(movie, OFFICIAL_TRAILER_FILTER);
}
