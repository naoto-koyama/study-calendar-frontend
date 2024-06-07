'use client';

import React from 'react';

import Link from 'next/link';

import { useGetPostQuery } from '@/generates/graphql';

interface PostShowTemplateProps {
  id: string;
}

const PostShowTemplate: React.FC<PostShowTemplateProps> = ({ id }) => {
  const { data: { post } = {} } = useGetPostQuery({
    variables: { id },
  });

  if (!post) return <p>No post found</p>;

  return (
    <>
      <h2>title: {post.title}</h2>
      <div className="mb-4">
        <p>{post.body}</p>
        <Link href={`/posts/${id}/edit`}>[Edit]</Link>
      </div>
      <Link href="/posts">Go back</Link>
    </>
  );
};

export default PostShowTemplate;
