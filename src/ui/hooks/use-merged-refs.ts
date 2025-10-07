import { type Ref, useMemo } from 'react';

function setRef<V>(ref: Ref<V> | undefined, value: V) {
  if (typeof ref === 'function') {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

function mergeRefs<V>(...refs: (Ref<V> | undefined)[]) {
  return (value: V) => {
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, value);
      const hasCleanup = typeof cleanup === 'function';
      return hasCleanup ? cleanup : () => setRef(ref, null);
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  };
}

function useMergedRefs<V>(...refs: (Ref<V> | undefined)[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refs), refs);
}

export default useMergedRefs;
