import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Movies } from '@prisma/client';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Movies[]>
) {
  const movies = await prisma.movies.findMany();
  res.status(200).send(movies);
}
