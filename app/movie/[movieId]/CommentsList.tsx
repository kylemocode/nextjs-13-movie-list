'use client';

import { FC, FormEvent, useMemo, useState, useEffect } from 'react';
import { Comments } from '@prisma/client';

interface ICommentsListProps {
  movieId: number;
  comments: Comments[];
}

const CommentsList: FC<ICommentsListProps> = ({
  movieId,
  comments: originalComments,
}) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] =
    useState<Comments[]>(originalComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (author === '' || comment === '') {
      return alert('請填入正確資訊');
    }

    try {
      setIsSubmitting(true);
      const body = { author, content: comment };

      const createdComment: Comments = await fetch(
        `/api/movie/${movieId}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      ).then(res => res.json());

      setCommentsData(prev => [...prev, createdComment]);
      setAuthor('');
      setComment('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentsContent = useMemo(() => {
    if (!commentsData.length) {
      return <p className='text-red-300'>There is no comment now.</p>;
    }

    return commentsData.map(comment => (
      <div key={comment.id} className='p-2 bg-white rounded-md mt-1 mb-2'>
        <p>Author: {comment.author}</p>
        <p>Content: {comment.content}</p>
      </div>
    ));
  }, [commentsData]);

  return (
    <>
      {commentsContent}
      <form onSubmit={handleSubmit} className='mt-4'>
        <input
          type='text'
          value={author}
          placeholder='Enter your name'
          onChange={e => setAuthor(e.target.value)}
          className='border-1 p-1 rounded-md mr-4'
        />
        <input
          type='text'
          value={comment}
          placeholder='Enter your comment'
          onChange={e => setComment(e.target.value)}
          className='border-1 p-1 rounded-md mr-3'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-1 px-2 rounded-lg'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default CommentsList;
