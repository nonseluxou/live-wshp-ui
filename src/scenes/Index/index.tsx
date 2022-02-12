import Image from 'next/image';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import { button, container, field, form, GlobalStyles, logoContainer, wrapper } from './styles';

export const Index = () => {
  const [nickname, setNickname] = useState('');

  return (
    <>
      <GlobalStyles />

      <div css={container}>
        <div css={wrapper}>
          <div css={logoContainer}>
            <Image src="/logo.svg" width={200} height={200} alt="" />
          </div>

          <form action="/api/sign-in" css={form}>
            <TextInput name="nickname" value={nickname} onChange={setNickname} css={field} />

            <Button variant="primary" css={button}>
              <FormattedMessage id="landing.sign-in" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
