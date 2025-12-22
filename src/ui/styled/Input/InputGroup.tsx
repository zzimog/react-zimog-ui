import { useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { InputGroupContext } from './context';
import classes from './classes';

type InputGroupProps = NativeProps<'div'>;

export const InputGroup = (inProps: InputGroupProps) => {
  const { className, children, ...props } = inProps;

  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  return (
    <Native.div className={cn(classes.group, className)} {...props}>
      <InputGroupContext
        inputElement={inputElement}
        onInputElementChange={setInputElement}
      >
        {children}
      </InputGroupContext>
    </Native.div>
  );
};

InputGroup.displayName = 'InputGroup';
