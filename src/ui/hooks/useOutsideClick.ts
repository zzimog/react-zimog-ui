import { type RefObject, useEffect } from 'react';

export function useOutsideClick(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback: (evt?: MouseEvent) => void,
  listen: boolean = true
) {
  useEffect(() => {
    if (!listen) {
      return;
    }

    const refsArray = Array.isArray(refs) ? refs : [refs];

    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      for (const ref of refsArray) {
        if (ref.current && ref.current.contains(target)) {
          return;
        }
      }

      callback(event);
    }

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [refs, callback, listen]);
}
