import { type ComponentPropsWithRef, useRef } from 'react';
import { cn } from '../utils';
import { textboxClasses } from './inputClasses';
import { InputGroupContext } from './inputGroupContext';

type InputGroupProps = ComponentPropsWithRef<'div'>;

export const InputGroup = (inProps: InputGroupProps) => {
  const { className, children, ...props } = inProps;

  const context = {
    inputRef: useRef<HTMLInputElement>(null),
  };

  return (
    <div className={cn(textboxClasses.group.root, className)} {...props}>
      <InputGroupContext value={context}>{children}</InputGroupContext>
    </div>
  );
};

InputGroup.displayName = 'InputGroup';
