import { createContext, useContext, type RefObject } from 'react';

type HTMLElementRef = RefObject<HTMLElement | null>;

type ScrollAreaContextValue = {
  rootRef: HTMLElementRef;
  viewportRef: HTMLElementRef;
};

export const ScrollAreaContext = createContext<
  ScrollAreaContextValue | undefined
>(undefined);

export function useScrollAreaContext() {
  const context = useContext(ScrollAreaContext);

  if (!context) {
    throw new Error(
      'useScrollAreaContext must be used within ScrollAreaContext'
    );
  }

  return context;
}
