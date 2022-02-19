import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import { ApolloProvider } from '../modules/apollo';
import { GlobalStyles } from '../modules/styles';
import * as intl from '../modules/intl';
import { AuthProvider } from '../modules/auth';

export default function App({ Component, pageProps }: AppProps) {
  const { locale: localeParam } = useRouter();
  const locale = localeParam ?? 'en';

  const messages = useMemo(() => {
    // eslint-disable-next-line import/namespace
    const result = intl[locale as keyof typeof intl] ?? {};
    return { ...intl.en, ...result };
  }, [locale]);

  return (
    <AuthProvider value={pageProps.user}>
      <ApolloProvider userId={pageProps.user?.id}>
        <IntlProvider messages={messages} locale={locale} defaultLocale="en">
          <Head>
            <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          </Head>
          <GlobalStyles />
          <Component {...pageProps} />
        </IntlProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
