import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities'; // eslint-disable-line import/no-internal-modules

import { graphqlEndpoint } from '../env';

export const apolloClient = new ApolloClient({
  uri: graphqlEndpoint,
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
