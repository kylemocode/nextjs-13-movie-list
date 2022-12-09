import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Movies } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movies | String | null>
) {
  let { movieId } = req.query;

  if (!movieId) {
    return res.status(404).send('Need movieId');
  }

  if (Array.isArray(movieId)) [movieId] = movieId;

  try {
    const movie = await prisma.movies.findUnique({
      where: {
        id: parseInt(movieId),
      },
    });

    return res.status(200).send(movie);
  } catch {
    return res.status(500).send('Internal Server Error');
  }
}
