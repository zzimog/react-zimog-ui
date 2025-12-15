import { type RefObject } from 'react';
import { createScopedContext } from '../utils';

type HighlightContextValue = {
  type: 'click' | 'focus' | 'hover';
  leaveMode: 'parent' | 'items';
  persistent: boolean;
  rootRef: RefObject<HTMLElement | null>;
  currentRef: RefObject<HTMLElement | null>;
  onCurrentChange(element: HTMLElement | null): void;
};

const [HighlightContext, useHighlightContext] = createScopedContext<
  HighlightContextValue | undefined
>('Highlight', undefined);

export { HighlightContext, useHighlightContext };
