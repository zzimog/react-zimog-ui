import { createContext, useContext, type RefObject } from 'react';

export type HighlightContextType = {
  type: HighlightType | (string & {});
  root: RefObject<HTMLElement | null>;
  current: RefObject<HTMLElement | null>;
  setCurrent: (node: HTMLElement) => void;
};

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);

export function useHighlightContext() {
  const context = useContext(HighlightContext);

  if (!context) {
    throw new Error('useHighlightContext must be used within HighlightContext');
  }

  return context;
}
