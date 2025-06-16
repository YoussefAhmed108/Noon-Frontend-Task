
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
type PosterSize = 'w92'|'w154'|'w185'|'w342'|'w500'|'w780'|'original';
type BackdropSize = 'w300'|'w780'|'w1280'|'original';

export function getPosterUrl(path: string, size: PosterSize = 'w500') {
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

function getBackdropUrl(path: string, size: BackdropSize = 'w780') {
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

export interface Genre {
  id: number;
  name: string;
}

export async function fetchGenres(apiKey: string): Promise<Genre[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
  if (!res.ok) throw new Error('Failed to load genres');
  const json = await res.json();
  return json.genres as Genre[];
}

export function makeGenreMap(genres: Genre[]): Record<number, string> {
  return genres.reduce((map, g) => {
    map[g.id] = g.name;
    return map;
  }, {} as Record<number, string>);
}

export function getGenreName(id: number , genreMap:Record<number,string>): string {
  return genreMap[id] ?? 'Unknown';
}
