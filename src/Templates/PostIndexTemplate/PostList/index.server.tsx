import React from 'react';

import Link from 'next/link';

import { GetPostsDocument, GetPostsQuery } from '@/generates/graphql';
import { query } from '@/lib/ApolloClient';

const PostList: React.FC = async () => {
  const { data } = await query<GetPostsQuery>({
    query: GetPostsDocument,
  });

  const { posts } = data;
  if (!posts) return <p>No posts found</p>;

  return (
    <ul>
      {posts.map((post, index) => {
        return (
          <li key={index}>
            {post.title} <Link href={`/posts/${post.id}`}>[Detail]</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
