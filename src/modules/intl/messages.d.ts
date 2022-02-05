import type en from './en.json';

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof en;
    }
  }
}
