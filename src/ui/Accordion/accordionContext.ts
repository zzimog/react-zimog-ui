import { createContext } from 'react';

type AccordionContextType = {
  value?: string | string[];
  setValue: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export default AccordionContext;
