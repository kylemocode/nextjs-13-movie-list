import { Movies } from '@prisma/client';

const fetchMovies = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/movies`, {
    next: { revalidate: 60 },
  });

  const movies: Movies = await res.json();
  return movies;
};

export default async function Home() {
  const movies = await fetchMovies();
  console.log(movies);
  return <div className='text-red-500'>test</div>;
}
