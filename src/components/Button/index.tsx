import { rem } from 'polished';
import React from 'react';

import { sizes } from '../../modules/styles';
import { Testable, useTestId } from '../../modules/test-id';

import { button, Variant, variantPrimary, variantSecondary } from './styles';

type Props = Testable & {
  variant: Variant;
  size?: Extract<keyof typeof sizes, 'mega' | 'kilo'>;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export const Button = ({
  variant,
  size = 'mega',
  children,
  onClick,
  href,
  className,
  ...props
}: Props) => {
  const test = useTestId(props);
  const Component = href ? 'a' : 'button';
  return (
    <Component
      {...test}
      css={[
        button,
        variant === 'primary' && variantPrimary,
        variant === 'secondary' && variantSecondary,
        { blockSize: rem(sizes[size]) },
      ]}
      onClick={onClick}
      href={href}
      className={className}
      role="button"
    >
      {children}
    </Component>
  );
};
