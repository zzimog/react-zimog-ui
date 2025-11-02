import { useCallback } from 'react';
import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';

type HoveringProps = PolyProps<'div'>;

export const Hovering = (inProps: HoveringProps) => {
  const { ref, className, ...props } = inProps;

  const mergedRefs = useMergedRefs(
    ref,
    useCallback((node: HTMLDivElement) => {
      function handleMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;
        const { top, left, width, height } = node.getBoundingClientRect();
        const maxSize = Math.max(width, height);
        const size = maxSize * 3;

        node.style.setProperty('--hover-size', `${size}px`);
        node.style.setProperty('--x', `${clientX - left}px`);
        node.style.setProperty('--y', `${clientY - top}px`);
      }

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.addEventListener('mousemove', handleMouseMove);
    }, [])
  );

  return (
    <Poly.div
      ref={mergedRefs}
      className={cn('absolute', 'inset-0', 'hover-effect', className)}
      {...props}
    />
  );
};
