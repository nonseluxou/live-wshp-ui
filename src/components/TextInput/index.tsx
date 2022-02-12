import { rem } from 'polished';
import { InputHTMLAttributes, useCallback } from 'react';

import { sizes } from '../../modules/styles';
import { Testable, useTestId } from '../../modules/test-id';

import { input } from './styles';

type Props = Testable & {
  name?: string;
  size?: Extract<keyof typeof sizes, 'mega' | 'kilo'>;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
};

export const TextInput = ({
  name,
  size = 'mega',
  value,
  onChange: onChangeParam,
  isDisabled,
  className,
  autoComplete,
  isInvalid,
  isReadOnly,
  isRequired,
  placeholder,
  ...props
}: Props) => {
  const test = useTestId(props);
  const onChange = useCallback<NonNullable<InputHTMLAttributes<HTMLInputElement>['onChange']>>(
    (evt) => onChangeParam(evt.target.value),
    [onChangeParam],
  );

  return (
    <input
      {...test}
      className={className}
      css={[input, { blockSize: rem(sizes[size]) }]}
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={onChange}
      readOnly={!!isReadOnly}
      aria-readonly={!!isReadOnly}
      disabled={!!isDisabled}
      aria-disabled={!!isDisabled}
      required={!!isRequired}
      aria-required={!!isRequired}
      aria-invalid={!!isInvalid}
    />
  );
};
