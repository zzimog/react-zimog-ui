import { useEffect, useRef } from 'react';

export type OutsideClickHookCallback = (evt?: MouseEvent) => void;

function useOutsideClick<T extends HTMLElement>(
  callback: OutsideClickHookCallback,
  listen: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!listen || !ref.current) {
      return;
    }

    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        callback(event);
      }
    }

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [callback, listen]);

  return ref;
}

export default useOutsideClick;
