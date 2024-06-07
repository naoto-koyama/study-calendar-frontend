'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { useGetPostQuery, useUpdatePostMutation } from '@/generates/graphql';

interface EditPostItemProps {
  id: string;
}

interface FormValues {
  title: string;
  body: string;
}

const PostEditTemplate: React.FC<EditPostItemProps> = ({ id }) => {
  const [message, setMessage] = useState<string>('');

  const { data: { post: post } = {} } = useGetPostQuery({
    variables: { id },
  });

  const [updatePost, { error: mutationError }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (post) {
      setValue('title', post.title);
      setValue('body', post.body);
    }
  }, [post, setValue]);

  const onSubmit = async (data: FormValues) => {
    const { title, body } = data;
    await updatePost({
      variables: {
        params: {
          id: parseInt(id, 10),
          title,
          body,
        },
      },
    });

    if (mutationError) {
      setMessage(`Error: ${JSON.stringify(mutationError)}`);
    } else {
      setMessage('Successfully saved');
    }
  };

  if (!post) return null;

  return (
    <>
      <h1>POST</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
            Save
          </button>
          {message && <span className="ml-4 text-blue-700">{message}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Body</label>
          <textarea
            id="body"
            {...register('body', { required: 'Body is required' })}
            rows={10}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </form>
      <Link href={`/posts/${id}`}>Go back</Link>
    </>
  );
};

export default PostEditTemplate;
