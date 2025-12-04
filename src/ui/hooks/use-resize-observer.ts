import { useLayoutEffect } from 'react';

export function useResizeObserver<T extends HTMLElement>(
  element: T | null,
  callback: () => void
) {
  useLayoutEffect(() => {
    let raf = 0;
    if (element) {
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(callback);
      });

      observer.observe(element);
      return () => {
        cancelAnimationFrame(raf);
        observer.unobserve(element);
      };
    }
  }, [element, callback]);
}
