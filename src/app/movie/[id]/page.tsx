import { Suspense } from 'react';
import { fetchMovieData, findOfficialTrailer } from '@/hooks/useMovieData';

import MovieClient from './MovieClient';
import MovieDetailsSkeleton from './components/MovieDetailsSkeleton';

/**
 * Movie details component that fetches and displays movie data
 */
async function MovieDetails({ id }: { id: string }) {
  const movie = await fetchMovieData(id, {
    cacheTime: 3600, // 1 hour cache
    language: 'en-US',
    appendToResponse: ['credits', 'videos']
  });
  const trailer = findOfficialTrailer(movie);
  
  return <MovieClient movie={movie} trailer={trailer} />;
}

/**
 * Server Component for the Movie detail page
 * Uses suspense boundaries for streaming content
 */
export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetails id={params.id} />
    </Suspense>
  );
}
