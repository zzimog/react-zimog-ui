import { useCallback, useRef } from 'react';

export type HighlightCallback = (element: Element | null) => void;

export function useHighlight<
  R extends HTMLElement = HTMLDivElement,
  H extends HTMLElement = HTMLDivElement,
>() {
  const rootRef = useRef<R>(null);
  const highlightRef = useRef<H>(null);

  const handleItemChange: HighlightCallback = useCallback((element) => {
    const root = rootRef.current;
    const highlight = highlightRef.current;
    if (root && highlight) {
      if (element) {
        const rootRect = root.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const x = elementRect.x - rootRect.x;
        const y = elementRect.y - rootRect.y;

        highlight.style.setProperty('--x', `${x}px`);
        highlight.style.setProperty('--y', `${y}px`);
        highlight.style.setProperty('--width', `${elementRect.width}px`);
        highlight.style.setProperty('--height', `${elementRect.height}px`);
        highlight.hidden = false;
      }

      highlight.style.opacity = element === null ? '0' : '1';
    }
  }, []);

  return [rootRef, highlightRef, handleItemChange] as const;
}
