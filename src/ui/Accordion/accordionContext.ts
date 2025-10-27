import { createContext, useContext } from 'react';

type AccordionContextType = {
  multiple?: boolean;
  value?: string | string[];
  setValue: (value: string) => void;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordion must be used inside AccordionContext.');
  }

  return context;
}
