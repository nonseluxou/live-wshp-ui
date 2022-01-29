export const logLevel =
  process.env.NEXT_PUBLIC_LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'debug' : 'trace');

export const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/api/graphql';

export const userCookieName = 'user-id';
