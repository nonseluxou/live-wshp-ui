import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

import { EXTRA_PADDING_FIRST_ITEM } from './constants';

export const container = css`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-columns: minmax(${rem(70)}, ${rem(150)}) 1fr ${rem(150)};
  grid-template-rows: ${rem(70)} 1fr;
  grid-template-areas:
    'logo submit options'
    '. timeline .';
`;

export const logo = css`
  grid-area: logo;
  position: relative;
  margin: ${rem(sizes.centi)};
`;

export const publish = css`
  grid-area: submit;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${rem(sizes.centi)};
  align-self: center;
  z-index: 1;
`;

export const timeline = css`
  grid-area: timeline;
  margin-block-start: -${rem(EXTRA_PADDING_FIRST_ITEM)};
`;

export const options = css`
  grid-area: options;
  align-self: center;
  justify-self: center;
`;
