import { useEffect } from 'react';

export function useOnClickOutside(
  elements: (HTMLElement | null)[],
  callback: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      for (const element of elements) {
        if (element && element.contains(target)) {
          return;
        }
      }

      callback(event);
    }

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [callback, ...elements]);
}
