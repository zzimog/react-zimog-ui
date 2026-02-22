import type { ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { InputAddon } from './InputAddon';
import { InputGroup } from './InputGroup';
import classes from './classes';

const DISPLAY_NAME = 'Input';

type InputProps = ComponentPropsWithRef<'input'>;

export const Input = (inProps: InputProps) => {
  const { ref: refProp, type, className, ...props } = inProps;

  const { onInputElementChange } = InputGroup.useContext(DISPLAY_NAME);
  const mergedRef = useMergedRefs(refProp, onInputElementChange);

  const isRadio = type === 'radio';
  const isCheckable = type === 'checkbox' || isRadio;

  return (
    <input
      ref={mergedRef}
      type={type}
      {...props}
      className={cn(
        classes.input({
          checkable: isCheckable,
          radio: isRadio,
        }),
        className
      )}
    />
  );
};

Input.displayName = DISPLAY_NAME;
Input.Group = InputGroup;
Input.Addon = InputAddon;
