import { css } from '@emotion/react';
import { rem, transitions } from 'polished';

import { focus, sizes } from '../../modules/styles';

export const input = css`
  background: var(--cjs-color-bg-base);
  border-radius: ${rem(sizes.base)};
  border: 2px solid var(--cjs-color-primary-normal);
  text-indent: ${rem(sizes.centi)};
  color: var(--cjs-color-text-normal);
  font-weight: 700;
  ${focus};
  ${transitions(['transform', 'background', 'color', 'border'], 'ease-in-out 150ms')};

  :focus {
    border-color: transparent;
    transform: scale(1.05);
  }

  ::placeholder {
    color: var(--cjs-color-text-normal);
    opacity: 0.75;
  }
`;
