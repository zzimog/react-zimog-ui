import { createContext, useContext } from 'react';

type AccordionContextValue = {
  baseId: string;
  value: string;
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
};

export const AccordionContext = createContext<
  AccordionContextValue | undefined
>(undefined);

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordionContext must be used within AccordionContext');
  }

  return context;
}
