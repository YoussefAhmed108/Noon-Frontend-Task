import axios from "axios";

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
type PosterSize = 'w92'|'w154'|'w185'|'w342'|'w500'|'w780'|'original';
type BackdropSize = 'w300'|'w780'|'w1280'|'original';

export function getPosterUrl(path: string, size: PosterSize = 'w500') {
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export function getBackdropUrl(path: string, size: BackdropSize = 'w780') {
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export interface Genre {
  id: number;
  name: string;
}

export async function fetchGenres(apiKey: string): Promise<Genre[]> {
  const res = await axios(`https://api.themoviedb.org/3/genre/movie/list?`,  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      accept: "application/json",
    },
  });
  if (res.status !== 200) throw new Error('Failed to load genres');
  return res.data.genres as Genre[];
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
