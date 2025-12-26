import { useCallback, useRef, useState } from 'react';

/**
 * Using useState directly for mounted state would cause an extra render on
 * both enter and exit animation, we can avoid this with a "forced" state for
 * rendering and ref to keep the current state value
 *
 * Expected renders:
 * - initial mount: 1 (mounted)
 * - enter animation: 1 (mount)
 * - exit animation: 2 (animating + unmount)
 */

export function useMountedState(present: boolean) {
  const [, force] = useState(0);
  const mountedRef = useRef(present);
  const mounted = present || mountedRef.current;

  const setMounted = useCallback((mounted: boolean) => {
    mountedRef.current = mounted;
    if (!mounted) {
      force((p) => p + 1);
    }
  }, []);

  return [mounted, setMounted] as const;
}
