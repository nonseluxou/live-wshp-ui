import { darkTheme } from './dark';
import { lightTheme } from './light';

export const autoTheme = `
  ${lightTheme};

  @media (prefers-color-scheme: dark) {
    ${darkTheme};
  }
`;
