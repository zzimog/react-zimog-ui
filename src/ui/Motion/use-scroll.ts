import { useRef, useCallback } from 'react';

function useConstant<T>(init: T) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = init;
  }

  return ref.current;
}

export type MotionScrollValue = {
  value: number;
  percent: number;
};

export function useScroll<T extends HTMLElement>() {
  const scrollX = useConstant<MotionScrollValue>({
    value: 0,
    percent: 0,
  });

  const scrollY = useConstant<MotionScrollValue>({
    value: 0,
    percent: 0,
  });

  const ref = useCallback((node: T) => {
    function handleCallback(node: HTMLElement) {
      const { clientWidth, scrollLeft, scrollWidth } = node;
      const percentX = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      scrollX.value = scrollLeft;
      scrollX.percent = scrollLeft ? percentX : 0;

      const { clientHeight, scrollTop, scrollHeight } = node;
      const percentY = (scrollTop / (scrollHeight - clientHeight)) * 100;
      scrollY.value = scrollTop;
      scrollY.percent = scrollTop ? percentY : 0;
    }

    function handleScroll({ target }: Event) {
      if (node === target) {
        handleCallback(node);
      }
    }

    handleCallback(node);
    node.addEventListener('scroll', handleScroll);
    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    ref,
    scrollX,
    scrollY,
  };
}
