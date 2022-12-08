import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Comments } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comments | Comments[]>
) {
  const { movieId } = req.query;

  if (!movieId) {
    return res.status(404);
  }

  if (req.method === 'POST') {
    const { author, content } = req.body;

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

    return res.status(201).send(result);
  }

  if (req.method === 'GET') {
    const comments = await prisma.comments.findMany({
      where: {
        movieId: parseInt(movieId as string),
      },
    });

    return res.status(200).send(comments);
  }
}
