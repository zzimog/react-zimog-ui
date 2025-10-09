import { createContext, useContext } from 'react';

type TreeContextType = {
  state: Map<string, boolean>;
};

export const TreeContext = createContext<TreeContextType | undefined>(
  undefined
);

export function useTreeContext() {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error('useTreeContext must be used inside TreeContext.');
  }

  return context;
}
