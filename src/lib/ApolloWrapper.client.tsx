'use client';

import { FC, ReactNode } from 'react';

import { HttpLink, NormalizedCacheObject } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

import { backend_url } from '@/config/const';

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: `${backend_url}/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

interface ApolloWrapperProps {
  children: ReactNode;
}

export const ApolloWrapper: FC<ApolloWrapperProps> = ({ children }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
