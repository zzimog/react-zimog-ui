import { createScopedContext } from '@ui/utils';

type InputGroupContextValue = {
  inputElement?: HTMLInputElement | null;
  onInputElementChange?(element: HTMLInputElement | null): void;
};

const [InputGroupContext, useInputGroup] =
  createScopedContext<InputGroupContextValue>('Input', {});

export { InputGroupContext, useInputGroup };
