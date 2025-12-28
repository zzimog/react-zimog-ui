import { type RefObject } from 'react';
import { createScopedContext } from '@ui/utils';

type HighlightContextValue = {
  type: 'none' | 'click' | 'focus' | 'hover';
  leaveMode: 'none' | 'parent' | 'items';
  rootRef: RefObject<HTMLElement | null>;
  currentRef: RefObject<HTMLElement | null>;
  onCurrentChange(element: HTMLElement | null): void;
};

const [HighlightContext, useHighlightContext] = createScopedContext<
  HighlightContextValue | undefined
>('Highlight', undefined);

export { HighlightContext, useHighlightContext };
