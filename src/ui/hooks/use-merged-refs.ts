import { useCallback, type Ref } from 'react';

function setRef<V>(ref: Ref<V> | undefined, value: V) {
  if (typeof ref === 'function') {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useMergedRefs<V>(...refs: (Ref<V> | undefined)[]) {
  return useCallback((value: V | null) => {
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
