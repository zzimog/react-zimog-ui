import { useRef } from 'react';

export function useHighlight() {
  const rootRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLElement>(null);

  function handleItemChange(element: HTMLElement | null) {
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
      }

      highlight.hidden = element === null;
    }
  }

  return [rootRef, highlightRef, handleItemChange] as const;
}
