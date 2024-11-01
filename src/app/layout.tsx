import React from 'react';

import Header from '@/components/parts/Header/index.client';
import { YearMonthProvider } from '@/hooks/YearMonthContext';
import { ApolloWrapper } from '@/lib/ApolloWrapper.client';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// NOTE: 一律でキャッシュ期間を1秒に設定しています。特定のリクエストでは長く保持したい等あればfetch時に指定することで変更できます。
export const revalidate = 1;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <YearMonthProvider>
          <Header />
          <ApolloWrapper>{children}</ApolloWrapper>
        </YearMonthProvider>
      </body>
    </html>
  );
}
