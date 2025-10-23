import { createContext, type RefObject } from 'react';
import type { HighlightType } from './Highlight';

type HighlightContextType = {
  type: HighlightType;
  persistent: boolean;
  rootRef: RefObject<HTMLElement | null>;
  currentRef: RefObject<HTMLElement | null>;
};

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);
