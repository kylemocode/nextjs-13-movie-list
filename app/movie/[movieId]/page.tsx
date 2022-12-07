import React from 'react';
import { notFound } from 'next/navigation';
import { Movies } from '@prisma/client';

type PageProps = {
  params: {
    movieId: string;
  };
};

const fetchMovie = async (movieId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/movie/${movieId}`, {
    cache: 'no-store',
  });
  const movie: Movies = await res.json();
  return movie;
};

async function MovieDetail({ params: { movieId } }: PageProps) {
  const movie = await fetchMovie(movieId);

  if (!movie.id) return notFound();
  console.log(movie);
  return (
    <div className='p-10 bg-gray-100 border-2 m-2 shadow-lg'>
      <p className='text-xl font-medium mb-2'>
        #{movie.id}: {movie.name}
      </p>
      <p>Genre: {movie.genre}</p>
      <p>By Studio: {movie.studio}</p>
      <p>User Rating: {movie.userRating}%</p>
      <p>Profitability: {movie.profitability}</p>
      <p>Rotten Tomatoes Rating: {movie.rottenTomatoes}%</p>
      <p>World Wide Gross: {movie.worldwideGross}m</p>
      <p>Release Year: {movie.year}</p>
      <p className='border-t border-black mt-5 text-left pt-2'>comments:</p>
    </div>
  );
}

export default MovieDetail;
