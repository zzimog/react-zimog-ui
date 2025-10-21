import { createContext } from 'react';
import type { HighlightType } from './Highlight';

type HighlightContextType = {
  type: HighlightType;
  setNode: (node: HTMLElement) => void;
};

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);
