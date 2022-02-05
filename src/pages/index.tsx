import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { User } from '../modules/auth';
import { getUserInfo } from '../server/auth';

const style = css`
  background: red;
`;

export default function Index() {
  const [nickname, setNickname] = useState('');

  return (
    <div css={style}>
      <form action="/api/sign-in">
        <input name="nickname" value={nickname} onChange={(evt) => setNickname(evt.target.value)} />

        <button>
          <FormattedMessage id="landing.sign-in" />
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({ req, res }) => {
  const user = await getUserInfo({ req, res });
  return {
    props: { user },
    redirect: !user ? undefined : { destination: '/home', permanent: false },
  };
};
