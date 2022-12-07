import '@/styles/globals.css';
import { Movies } from '@prisma/client';
import Header from './Header';
import MoviesList from './MoviesList';

const fetchMovies = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/movies`, {
    /* like traditional getServerSideProps */
    cache: 'no-store',
  });

  const movies: Movies[] = await res.json();
  return movies;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const movies = await fetchMovies();

  return (
    <html>
      <head />
      <body>
        <Header />
        <main className='flex'>
          <div className='border-r-2 p-1 pr-2 overflow-y-scroll h-[calc(100vh-76px)]'>
            {/* TypeScript doesn't support async server component for now */}
            {/* @ts-ignore */}
            <MoviesList movies={movies} />
          </div>
          <div className='flex-1 p-10'>{children}</div>
        </main>
      </body>
    </html>
  );
}
