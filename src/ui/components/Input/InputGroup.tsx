import { useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'InputGroup';

type InputGroupContextValue = {
  inputElement: HTMLInputElement | null;
  onInputElementChange(element: HTMLInputElement | null): void;
};

const [InputGroupContext, useInputGroupContext] =
  createScopedContext<InputGroupContextValue>('Input', {
    inputElement: null,
    onInputElementChange: () => {},
  });

/*---------------------------------------------------------------------------*/

type InputGroupProps = NativeProps<'div'>;

export const InputGroup = (inProps: InputGroupProps) => {
  const { className, ...props } = inProps;

  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  return (
    <InputGroupContext
      inputElement={inputElement}
      onInputElementChange={setInputElement}
    >
      <Native.div
        role="group"
        data-readonly={inputElement?.readOnly ? '' : undefined}
        data-disabled={inputElement?.disabled ? '' : undefined}
        data-invalid={inputElement?.ariaInvalid ? '' : undefined}
        {...props}
        className={cn(classes.group, className)}
      />
    </InputGroupContext>
  );
};

InputGroup.displayName = DISPLAY_NAME;
InputGroup.useContext = useInputGroupContext;
