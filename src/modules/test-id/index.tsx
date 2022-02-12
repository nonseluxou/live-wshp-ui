export type Testable = {
  'data-testid'?: string;
};

export const useTestId = (props: Testable) => {
  return { 'data-testid': props['data-testid'] };
};
