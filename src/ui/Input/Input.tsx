import { type ComponentPropsWithRef, useContext } from 'react';
import { useMergedRefs } from '../hooks/use-merged-refs';
import { cn } from '../utils';
import { InputAddon } from './InputAddon';
import classes from './inputClasses';
import { InputGroup } from './InputGroup';
import { InputGroupContext } from './inputGroupContext';

type InputProps = ComponentPropsWithRef<'input'>;
export const Input = (inProps: InputProps) => {
  const { ref, type, className, ...props } = inProps;

  const { inputRef } = useContext(InputGroupContext) || {};

  const mergedRefs = useMergedRefs(ref, inputRef);

  return (
    <input
      ref={mergedRefs}
      type={type}
      className={cn(classes.input, className)}
      {...props}
    />
  );
};

Input.displayName = 'Input';
Input.Group = InputGroup;
Input.Addon = InputAddon;
