import { createContext } from 'react';

type DisclosureItemContextValue = {
  value: string;
};

export const DisclosureItemContext = createContext<
  DisclosureItemContextValue | undefined
>(undefined);
