import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Comments } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comments>
) {
  const { movieId } = req.query;
  const { author, content } = req.body;

  if (!movieId) {
    return res.status(404);
  }

  const result = await prisma.comments.create({
    data: {
      author,
      content,
      movie: {
        connect: {
          id: parseInt(movieId as string),
        },
      },
    },
  });

  res.status(201).send(result);
}
