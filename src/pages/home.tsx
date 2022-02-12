import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import { User } from '../modules/auth';
import { Home } from '../scenes/Home';
import { getUserInfo } from '../server/auth';

export default function HomePage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'home.title' })}</title>
      </Head>
      <Home />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({ req, res }) => {
  const user = await getUserInfo({ req, res });
  return {
    props: { user },
    redirect: !user ? { destination: '/', permanent: false } : undefined,
  };
};
