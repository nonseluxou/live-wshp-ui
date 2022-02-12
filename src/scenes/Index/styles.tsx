import { css, Global } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

export const GlobalStyles = () => (
  <Global
    styles={css`
      html {
        background-image: url('/landing-bg.svg');
      }
    `}
  />
);

export const container = css`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const wrapper = css`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: ${rem(sizes.kilo)};
  padding: ${rem(sizes.kilo)};
  background: var(--cjs-color-bg-accent);
  border-radius: ${rem(sizes.deca)};
  max-inline-size: ${rem(480)};
  box-shadow: var(--cjs-color-card-shadow);
`;

export const logoContainer = css`
  margin-block-end: ${rem(sizes.kilo)};
`;

export const form = css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: 'nickname button';
  grid-gap: ${rem(sizes.deci)};
  inline-size: 100%;
`;

export const field = css`
  grid-area: nickname;
`;

export const button = css`
  grid-area: button;
`;
