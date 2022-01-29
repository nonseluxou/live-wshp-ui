import { css, Global } from '@emotion/react';

import { autoTheme } from './autoTheme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://rsms.me/inter/inter.css');

      :root {
        ${autoTheme};
      }

      html {
        background: var(--cjs-color-bg-base);
        color: var(--cjs-color-text-normal);
        caret-color: var(--cjs-color-text-caret);
        box-sizing: border-box;
        font-family: 'Inter', -apple-system, '.SFNSText-Regular', 'San Francisco',
          BlinkMacSystemFont, '.PingFang-SC-Regular', 'Microsoft YaHei', 'Segoe UI',
          'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      @supports (font-variation-settings: normal) {
        html {
          font-family: 'Inter var', -apple-system, '.SFNSText-Regular', 'San Francisco',
            BlinkMacSystemFont, '.PingFang-SC-Regular', 'Microsoft YaHei', 'Segoe UI',
            'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      }

      body {
        margin: 0;
        padding: 0;
        min-block-size: 100vh;
      }

      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        line-height: 1.15;
        font-family: inherit;
        box-sizing: inherit;
        color: inherit;
      }

      .sp-svg {
        display: inline-flex;
        block-size: 1em;
        inline-size: auto;
        fill: currentColor;
      }
    `}
  />
);
