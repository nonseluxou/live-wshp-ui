import { css } from '@emotion/react';
import { rem } from 'polished';

export const focus = css`
  outline: none;

  :focus {
    box-shadow: 0 0 0 ${rem(2)} var(--cjs-color-focus-accent),
      0 0 0 ${rem(6)} var(--cjs-color-focus-masked);
  }
`;
