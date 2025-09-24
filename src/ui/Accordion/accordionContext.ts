import { createContext } from 'react';

type AccordionContextType = {
  value?: string | number;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export default AccordionContext;
