import { useEffect, type DependencyList } from 'react';

type FrameCallback = (timestamp: number) => void;

const callbacks = new Set<FrameCallback>();
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
  callback: FrameCallback,
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
