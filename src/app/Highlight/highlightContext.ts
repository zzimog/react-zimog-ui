import { createScopedContext } from '@ui';
import type { RefObject } from 'react';

type HighlightContextValue = {
  rootRef: RefObject<HTMLElement | null>;
  rect: DOMRect | null;
  onRectChange(rect: DOMRect): void;
};

const [HighlightContext, useHighlightContext] = createScopedContext<
  HighlightContextValue | undefined
>('Highlight', undefined);

export { HighlightContext, useHighlightContext };
