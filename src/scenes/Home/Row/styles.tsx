import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../../modules/styles';
import { EXTRA_PADDING_FIRST_ITEM } from '../constants';

export const wrapper = css`
  background: var(--cjs-color-bg-accent);
  padding-inline: ${rem(sizes.hecto)};
  padding-block: ${rem(sizes.deci)};
  border-radius: ${rem(sizes.base)};
`;

export const firstItem = css`
  padding-block-start: ${rem(EXTRA_PADDING_FIRST_ITEM)};
`;

export const header = css`
  font-style: normal;
  font-size: ${rem(sizes.deci)};
  color: var(--cjs-color-text-masked);
  font-weight: 600;
  margin-block-end: ${rem(sizes.centi)};
  display: inline;
`;

export const author = css`
  ${header};
  font-size: ${rem(sizes.base)};
  color: var(--cjs-color-text-normal);
`;

export const date = css`
  ${header};
`;
