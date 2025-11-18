import { createContext, useContext } from 'react';
import type { FormData } from './Form';

type FormContextValue = {
  defaultData: FormData;
  onValueChange(name: string, value: string | number | boolean): void;
};

export const FormContext = createContext<FormContextValue | undefined>(
  undefined
);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form component must be used within Form element.');
  }

  return context;
}
