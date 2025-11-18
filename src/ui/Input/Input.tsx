import { useContext, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '../hooks/use-merged-refs';
import { cn } from '../utils';
import { InputAddon } from './InputAddon';
import classes from './inputClasses';
import { InputGroup } from './InputGroup';
import { InputGroupContext } from './inputGroupContext';

export const Input = (inProps: ComponentPropsWithRef<'input'>) => {
  const { ref, type, className, ...props } = inProps;

  const { inputRef } = useContext(InputGroupContext) || {};

  const mergedRefs = useMergedRefs(ref, inputRef);

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

Input.displayName = 'Input';
Input.Group = InputGroup;
Input.Addon = InputAddon;
