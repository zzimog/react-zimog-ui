import { createContext, useContext } from 'react';

type TabsListContextType = {
  setActive(node: HTMLElement): void;
};

export const TabsListContext = createContext<TabsListContextType | undefined>(
  undefined
);

export function useTabsListContext() {
  const context = useContext(TabsListContext);

  if (!context) {
    throw new Error('useTabsListContext must be used inside TabsListContext');
  }

  return context;
}
