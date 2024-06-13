import PageTopTemplate from '@/Templates/PageTopTemplate/index.client';

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {

  return <PageTopTemplate searchParams={searchParams} />;
}
