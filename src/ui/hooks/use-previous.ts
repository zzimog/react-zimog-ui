import { useMemo, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const prevRef = useRef<T>(value);

  return useMemo(() => {
    const prev = prevRef.current;

    if (value !== prev) {
      prevRef.current = value;
    }

    return prev;
  }, [value]);
}
