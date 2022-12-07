'use client';

import {
  FC,
  ChangeEvent,
  useState,
  useMemo,
  useEffect,
  useTransition,
} from 'react';
import Link from 'next/link';
import { Movies } from '@prisma/client';
import debouce from 'lodash.debounce';

interface IMoviesListProps {
  movies: Movies[];
}

const MoviesList: FC<IMoviesListProps> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      /* Mark updates as transitions */
      setSearchTerm(e.target.value);
    });
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const filteredMovies = movies.filter(movie => {
    return movie.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <>
      <input
        type='text'
        placeholder='Enter the search term'
        onChange={debouncedResults}
        className='border-2 p-1 rounded-md mb-2'
      />
      {filteredMovies.map(movie => (
        <p key={movie.id} className='p-1'>
          <Link href={`/movie/${movie.id}`} prefetch={false}>
            {movie.name}
          </Link>
        </p>
      ))}
    </>
  );
};

export default MoviesList;
