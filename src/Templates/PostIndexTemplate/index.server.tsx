import PostsList from './PostList/index.server';

const PostIndexTemplate = () => {
  return (
    <div>
      <h1>POSTS</h1>
      <PostsList />
    </div>
  );
};

export default PostIndexTemplate;
