import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

import { apolloClient } from '../modules/apollo';
import { GlobalStyles } from '../modules/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
