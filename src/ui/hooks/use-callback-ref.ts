import { useLayoutEffect, useMemo, useRef } from 'react';

type Callback = (...args: never[]) => unknown;

export function useCallbackRef<T extends Callback>(callback?: T): T {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
