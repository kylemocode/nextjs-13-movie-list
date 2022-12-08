'use client';

import { FC, FormEvent, useMemo, useState, useEffect } from 'react';
import { Comments } from '@prisma/client';

interface ICommentsListProps {
  movieId: number;
}

const CommentsList: FC<ICommentsListProps> = ({ movieId }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] = useState<Comments[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (author === '' || comment === '') {
      return alert('請填入正確資訊');
    }

    try {
      setIsSubmitting(true);
      const body = { author, content: comment };

      await fetch(`/api/movie/${movieId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setAuthor('');
      setComment('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentsContent = useMemo(() => {
    if (isLoading) {
      return <p className='text-red-300'>Loading...</p>;
    }

    if (!commentsData.length && !isLoading) {
      return <p className='text-red-300'>There is no comment now.</p>;
    }

    return commentsData.map(comment => (
      <div key={comment.id} className='p-2 bg-white rounded-md mt-1 mb-2'>
        <p>Author: {comment.author}</p>
        <p>Content: {comment.content}</p>
      </div>
    ));
  }, [commentsData, isLoading]);

  useEffect(() => {
    if (isSubmitting) return;

    fetch(`/api/movie/${movieId}/comments`)
      .then(res => res.json())
      .then(data => {
        setCommentsData(data);
        setIsLoading(false);
      });
  }, [movieId, isSubmitting]);

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
