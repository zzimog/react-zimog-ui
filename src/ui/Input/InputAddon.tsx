import { type ComponentPropsWithRef, useCallback, useContext } from 'react';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './inputClasses';
import { InputGroupContext } from './inputGroupContext';

type InputAddonProps = ComponentPropsWithRef<'div'>;

export const InputAddon = (inProps: InputAddonProps) => {
  const { ref, className, ...props } = inProps;

  const context = useContext(InputGroupContext);

  if (!context) {
    throw new Error('InputAddon must be used within InputGroupContext');
  }

  const mergedRef = useMergedRefs(
    ref,
    useCallback((node: HTMLDivElement) => {
      function handleClick() {
        const { inputRef } = context || {};
        const input = inputRef?.current;
        if (input) {
          input.focus();
        }
      }

      node.addEventListener('click', handleClick);
      return () => node.removeEventListener('click', handleClick);
    }, [])
  );

  return (
    <div ref={mergedRef} className={cn(classes.addon, className)} {...props} />
  );
};

InputAddon.displayName = 'InputAddon';
