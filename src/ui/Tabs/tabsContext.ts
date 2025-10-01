import { createContext, useContext } from 'react';

type TabsContextType = {
  baseId: string;
  index: number;
  value?: number;
  setValue(value: number): void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs must be used inside TabsContext');
  }

  return context;
}
