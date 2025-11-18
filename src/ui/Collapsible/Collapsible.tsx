/**
 * Based on Radix UI collapsible component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { usePresence, useMergedRefs } from '../hooks';
import classes from './collapsibleClasses';
import { cn } from '../utils';
import { type PolyProps, Poly } from '../polymorphic';

export type CollapsibleProps = PolyProps<'div'> & {
  open?: boolean;
  dir?: 'vertical' | 'horizontal';
};

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    ref: refProp,
    open = false,
    dir = 'vertical',
    className,
    style,
    children,
    ...props
  } = inProps;

  const [visible, setVisible] = useState(open);

  const ref = useRef<HTMLElement>(null);
  const preventAnimationRef = useRef(open);
  const prevStylesRef = useRef<Record<string, string>>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const { ref: presenceRef, present } = usePresence(open);
  const mergedRefs = useMergedRefs(refProp, ref, presenceRef);

  const width = widthRef.current;
  const height = heightRef.current;
  const shouldRender = open || visible;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      prevStylesRef.current = prevStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationDuration: node.style.animationDuration,
      };

      node.style.transitionDuration = '0s';
      node.style.animationDuration = '0s';

      const { width, height } = node.getBoundingClientRect();
      widthRef.current = width;
      heightRef.current = height;

      if (!preventAnimationRef.current) {
        const { transitionDuration, animationDuration } = prevStylesRef.current;
        node.style.transitionDuration = transitionDuration;
        node.style.animationDuration = animationDuration;
      }

      setVisible(present);
    }
  }, [open, present]);

  return (
    <Poly.div
      ref={mergedRefs}
      data-open={open}
      className={cn(classes({ dir }), className)}
      hidden={!shouldRender}
      style={{
        ['--width' as any]: width ? `${width}px` : undefined,
        ['--height' as any]: height ? `${height}px` : undefined,
        ...style,
      }}
      {...props}
    >
      {shouldRender && children}
    </Poly.div>
  );
};
