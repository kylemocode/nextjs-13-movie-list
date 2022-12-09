import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Movies } from '@prisma/client';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Movies[] | String>
) {
  try {
    const movies = await prisma.movies.findMany();
    return res.status(200).send(movies);
  } catch {
    return res.status(500).send('Internal Server Error');
  }
}
