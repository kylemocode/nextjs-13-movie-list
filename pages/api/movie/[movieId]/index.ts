import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Movies } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movies | null>
) {
  const { movieId } = req.query;

  if (!movieId) {
    return res.status(404);
  }

  const movie = await prisma.movies.findUnique({
    where: {
      id: parseInt(movieId as string),
    },
    include: {
      comments: true,
    },
  });

  res.status(200).send(movie);
}
