import PostEditTemplate from '@/Templates/PostEditTemplate/index.client';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
  return <PostEditTemplate id={params.id} />;
};

export default EditPostPage;
