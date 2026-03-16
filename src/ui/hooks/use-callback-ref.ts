import { useLayoutEffect, useRef } from 'react';

type Callback = (...args: any[]) => any;

export function useCallbackRef<T extends Callback>(callback?: T): T {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useRef(((...args) => callbackRef.current?.(...args)) as T).current;
}
