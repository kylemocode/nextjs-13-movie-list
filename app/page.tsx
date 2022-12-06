import prisma from '@/lib/prisma';

export default async function Home() {
  const movies = await prisma.movies.findMany();
  console.log(movies);
  return <div>test</div>;
}
