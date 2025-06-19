import axios from 'axios';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
type PosterSize = 'w92'|'w154'|'w185'|'w342'|'w500'|'w780'|'original';
type BackdropSize = 'w300'|'w780'|'w1280'|'original';

/**
 * Returns the full URL for a movie poster image from TMDB.
 * @param path - The poster path returned by TMDB API (e.g., '/abc123.jpg').
 * @param size - The desired poster size (default: 'w500').
 * @returns The full image URL as a string, or a placeholder if path is invalid.
 */
export function getPosterUrl(path: string | null | undefined, size: PosterSize = 'w500') {
  if (!path) {
    // Return a placeholder image URL or null
    return '/placeholder.jpeg'; // Create this placeholder image in your public folder
  }
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

/**
 * Returns the full URL for a movie backdrop image from TMDB.
 * @param path - The backdrop path returned by TMDB API (e.g., '/abc123.jpg').
 * @param size - The desired backdrop size (default: 'w780').
 * @returns The full image URL as a string, or a placeholder if path is invalid.
 */
export function getBackdropUrl(path: string | null | undefined, size: BackdropSize = 'w780') {
  if (!path) {
    // Return a placeholder image URL or null
    return '/placeholder-backdrop.jpg'; // Create this placeholder image in your public folder
  }
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export interface Genre {
  id: number;
  name: string;
}

/**
 * Fetches the list of movie genres from the TMDB API.
 * @param apiKey - The TMDB API Bearer token.
 * @returns A promise that resolves to an array of Genre objects.
 * @throws If the request fails or the response is not 200.
 */
export async function fetchGenres(apiKey: string): Promise<Genre[]> {
  const res = await axios('https://api.themoviedb.org/3/genre/movie/list?',  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: 'application/json',
    },
  });
  if (res.status !== 200) throw new Error('Failed to load genres');
  return res.data.genres as Genre[];
}

/**
 * Formats a runtime in minutes as a string in 'Xh Ym' format.
 * @param minutes - The runtime in minutes.
 * @returns The formatted runtime string (e.g., '2h 15m').
 */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
