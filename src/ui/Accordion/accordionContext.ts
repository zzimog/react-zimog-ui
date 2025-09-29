import { createContext } from 'react';

type AccordionContextType = {
  index: number;
  value?: string | string[];
  setValue: (value: string, open: boolean) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export default AccordionContext;
