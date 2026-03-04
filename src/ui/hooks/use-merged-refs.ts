import { useCallback, type Ref } from 'react';

function setRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useMergedRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return useCallback((value: T | null) => {
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, value);
      const hasCleanup = typeof cleanup === 'function';

      return hasCleanup ? cleanup : () => setRef(ref, null);
    });

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, refs);
}
