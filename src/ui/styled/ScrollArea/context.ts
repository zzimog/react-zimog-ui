import { createScopedContext } from '@ui/utils';

type ScrollAreaContextValue = {
  useCorner: boolean;
  viewport: HTMLElement | null;
  content: HTMLElement | null;
  onViewportChange(element: HTMLElement | null): void;
  onContentChange(element: HTMLElement | null): void;
};

const [ScrollAreaContext, useScrollAreaContext] = createScopedContext<
  ScrollAreaContextValue | undefined
>('ScrollArea', undefined);

export { ScrollAreaContext, useScrollAreaContext };
