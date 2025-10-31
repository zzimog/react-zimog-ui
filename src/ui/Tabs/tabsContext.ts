import { createContext, useContext } from 'react';

type TabsContextType = {
  baseId: string;
  value?: string;
  onValueChange(value: string): void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs must be used inside TabsContext');
  }

  return context;
}
