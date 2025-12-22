import { useEffect, type DependencyList } from 'react';

const callbacks = new Set<FrameRequestCallback>();
let rafId: number;

function loop(timestamp: number) {
  for (const callback of [...callbacks]) {
    if (callbacks.has(callback)) {
      callback(timestamp);
    }
  }

  if (callbacks.size > 0) {
    rafId = requestAnimationFrame(loop);
  }
}

export function useAnimationFrame(
  callback: FrameRequestCallback,
  deps?: DependencyList
) {
  useEffect(() => {
    callbacks.add(callback);

    if (callbacks.size === 1) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      callbacks.delete(callback);

      if (callbacks.size === 0) {
        cancelAnimationFrame(rafId);
      }
    };
  }, deps);
}
