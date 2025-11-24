import { type RefObject, useEffect } from 'react';

type Ref = RefObject<HTMLElement | null>;

export function useOnClickOutside(
  ref: Ref | Ref[],
  callback: (event: MouseEvent) => void
) {
  const refs = Array.isArray(ref) ? ref : [ref];

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
