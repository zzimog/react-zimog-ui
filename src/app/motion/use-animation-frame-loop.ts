import { useRef, useEffect } from 'react';

export function useAnimationFrameLoop(callback: FrameRequestCallback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let rafId = requestAnimationFrame(function loop(...args) {
      callbackRef.current?.(...args);
      rafId = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);
}
