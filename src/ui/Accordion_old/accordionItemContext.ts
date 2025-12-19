import { createContext, useContext } from 'react';

type AccordionItemContextValue = {
  triggerId: string;
  contentId: string;
  disabled: boolean;
  open: boolean;
  onOpenChange(open: boolean): void;
};

export const AccordionItemContext = createContext<
  AccordionItemContextValue | undefined
>(undefined);

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'useAccordionItemContext must be used within AccordionItemContext'
    );
  }

  return context;
}

AccordionItemContext.displayName = 'AccordionItemContext';
