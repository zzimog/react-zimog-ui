import { type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { InputAddon } from './InputAddon';
import { InputGroup } from './InputGroup';
import { useInputGroup } from './context';
import classes from './classes';

const DISPLAY_NAME = 'Input';

export const Input = (inProps: ComponentPropsWithRef<'input'>) => {
  const { ref, type, className, ...props } = inProps;

  const { onInputElementChange } = useInputGroup(DISPLAY_NAME);

  const mergedRefs = useMergedRefs(ref, (node: HTMLInputElement) =>
    onInputElementChange?.(node)
  );

  const isRadio = type === 'radio';
  const isCheckable = type === 'checkbox' || isRadio;

  return (
    <input
      ref={mergedRefs}
      type={type}
      className={cn(
        classes.input({
          check: isCheckable,
          radio: isRadio,
        }),
        className
      )}
      {...props}
    />
  );
};

Input.displayName = DISPLAY_NAME;
Input.Group = InputGroup;
Input.Addon = InputAddon;
