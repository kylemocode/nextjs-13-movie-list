import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Comments } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comments | Comments[] | String>
) {
  let { movieId } = req.query;

  if (!movieId) {
    return res.status(404).send('Need movieId');
  }

  if (Array.isArray(movieId)) [movieId] = movieId;

  if (req.method === 'POST') {
    try {
      const { author, content } = req.body;

      const result = await prisma.comments.create({
        data: {
          author,
          content,
          movie: {
            connect: {
              id: parseInt(movieId),
            },
          },
        },
      });
      return res.status(201).send(result);
    } catch {
      return res.status(500).send('Internal Server Error');
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comments.findMany({
        where: {
          movieId: parseInt(movieId),
        },
      });

      return res.status(200).send(comments);
    } catch {
      return res.status(500).send('Internal Server Error');
    }
  }
}
