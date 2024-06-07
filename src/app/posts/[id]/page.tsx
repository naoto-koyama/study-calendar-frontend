import PostShowTemplate from '@/Templates/PostShowTemplate/index.client';

export const dynamic = 'force-dynamic';

type PostPageProps = {
  params: {
    id: string;
  };
};

const PostPage = ({ params }: PostPageProps) => {
  return <PostShowTemplate id={params.id} />;
};

export default PostPage;
