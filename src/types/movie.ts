export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: { id: number; name: string; logo_path?: string; origin_country?: string }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: { iso_639_1: string; name: string }[];
  status?: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      profile_path?: string;
      character: string;
    }>;
    crew: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      profile_path?: string;
      job: string;
    }>;
    
  };  videos: {
    results: Array<VideoTrailer>;
  };
}

/**
 * Interface representing a video trailer from TMDB API
 */
export interface VideoTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}