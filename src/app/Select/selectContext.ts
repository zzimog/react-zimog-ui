import { createContext, useContext } from 'react';

type SelectContextValue = {
  value: string;
  setSelected(value: string, label: string): void;
};

export const SelectContext = createContext<SelectContextValue | undefined>(
  undefined
);

export function useSelectContext() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within SelectContext');
  }

  return context;
}
