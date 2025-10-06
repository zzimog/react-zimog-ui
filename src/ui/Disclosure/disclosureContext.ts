import { createContext } from 'react';

type DisclosureContextType = {
  baseId: string;
  value: string | string[];
  setValue(value: string | string[]): void;
};

const DisclosureContext = createContext<DisclosureContextType | undefined>(
  undefined
);

export default DisclosureContext;
