import { type RefObject, createContext } from 'react';

type InputGroupContextValue = {
  inputRef: RefObject<HTMLInputElement | null>;
};

export const InputGroupContext = createContext<
  InputGroupContextValue | undefined
>(undefined);
