import React, { useEffect } from 'react';
import {
  ApolloClient,
  ApolloProvider as OriginalApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'; // eslint-disable-line import/no-internal-modules
import { setContext } from '@apollo/client/link/context'; // eslint-disable-line import/no-internal-modules

import { graphqlEndpoint } from '../env';

const buildLink = ({ userId: userIdParam }: { userId?: string } = {}) => {
  const httpLink = createHttpLink({
    uri: graphqlEndpoint,
  });

  return setContext(async (_, { headers, userId }) => {
    const value = userIdParam ?? userId;
    return {
      headers: {
        ...headers,
        authorization: value ? `Bearer ${value}` : null,
      },
    };
  }).concat(httpLink);
};

export const apolloClient = new ApolloClient({
  link: buildLink(),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transactions: relayStylePagination(['where']),
        },
      },
    },
  }),
});

export const ApolloProvider = ({
  children,
  userId,
}: {
  children?: React.ReactNode;
  userId?: string;
}) => {
  useEffect(() => {
    apolloClient.setLink(buildLink({ userId }));
  }, [userId]);

  return <OriginalApolloProvider client={apolloClient}>{children}</OriginalApolloProvider>;
};
