import { createRef, useEffect } from 'react';

export type OutsideClickHookCallback = (evt?: MouseEvent) => void;

function useOutsideClick<T extends HTMLElement>(
  callback: OutsideClickHookCallback,
  listen: boolean = true
) {
  const ref = createRef<T>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function handler(evt: MouseEvent) {
      const target = evt.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        callback(evt);
      }
    }

    if (listen) {
      document.addEventListener('click', handler);
    }

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [ref, callback, listen]);

  return ref;
}

export default useOutsideClick;
