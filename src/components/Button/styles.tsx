import { css } from '@emotion/react';
import { rem, transitions } from 'polished';

import { focus, sizes } from '../../modules/styles';

const VARIANTS = ['primary', 'secondary'] as const;
export type Variant = typeof VARIANTS[number];

export const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${rem(sizes.base)};
  padding-inline: ${rem(sizes.base)};
  font-size: ${rem(sizes.deci)};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  ${focus};
  ${transitions(['transform', 'background', 'color'], 'ease-in-out 150ms')};

  :hover,
  :focus {
    background: var(--cjs-color-primary-active);
    transform: scale(1.05);
  }

  :active {
    transform: scale(1.01);
  }
`;

export const variantPrimary = css`
  background: var(--cjs-color-primary-normal);
  color: var(--cjs-color-primary-text);
`;

export const variantSecondary = css`
  background: var(--cjs-color-bg-normal);
  color: var(--cjs-color-text-normal);
  border: 2px solid var(--cjs-color-primary-normal);

  :hover,
  :focus {
    color: var(--cjs-color-primary-text);
    border-color: var(--cjs-color-primary-active);
  }
`;
