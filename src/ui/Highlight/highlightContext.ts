import { type RefObject, createContext } from 'react';
import type { HighlightType, HighlightLeaveMode } from './Highlight';

type HighlightContextType = {
  type: HighlightType;
  leaveMode: HighlightLeaveMode;
  persistent: boolean;
  rootRef: RefObject<HTMLElement | null>;
  currentRef: RefObject<HTMLElement | null>;
};

export const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);
