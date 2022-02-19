import React, { useMemo } from 'react';
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

const buildClient = ({ userId }: { userId?: string } = {}) => {
  return new ApolloClient({
    link: buildLink({ userId }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            timeline: relayStylePagination(),
          },
        },
      },
    }),
  });
};

export const apolloClient = buildClient();

export const ApolloProvider = ({
  children,
  userId,
}: {
  children?: React.ReactNode;
  userId?: string;
}) => {
  const client = useMemo(() => buildClient({ userId }), [userId]);
  return <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>;
};
