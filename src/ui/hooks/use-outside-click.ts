import { type RefObject, useEffect } from 'react';

export function useOutsideClick(
  refs: RefObject<HTMLElement | null>[],
  callback: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      for (const ref of refs) {
        if (ref.current?.contains(target)) {
          return;
        }
      }

      callback(event);
    }

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [callback]);
}
