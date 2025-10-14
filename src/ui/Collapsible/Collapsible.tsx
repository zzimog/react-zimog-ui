/**
 * Based on Radix UI collapsible component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { usePresence, useMergedRefs } from '../hooks';
import classes from './collapsibleClasses';
import { cn } from '../utils';

export type CollapsibleProps = {
  as?: ElementType;
  open?: boolean;
  dir?: 'vertical' | 'horizontal';
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    open = false,
    dir = 'vertical',
    className,
    style,
    children,
    ...props
  } = inProps;

  const { ref: presenceRef, present } = usePresence(open);
  const [isPresent, setIsPresent] = useState(present);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, presenceRef, ref);

  const preventAnimationRef = useRef(present);
  const prevStylesRef = useRef<Record<string, string>>(null);

  const widthRef = useRef(0);
  const width = widthRef.current;
  const heightRef = useRef(0);
  const height = heightRef.current;

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

      setIsPresent(present);
    }
  }, [open, present]);

  const shouldRender = open || isPresent;

  return (
    <Tag
      ref={mergedRefs}
      data-state={open ? 'open' : 'closed'}
      className={cn(classes({ dir }), className)}
      hidden={!shouldRender}
      {...props}
      style={{
        ['--width']: width ? `${width}px` : undefined,
        ['--height']: height ? `${height}px` : undefined,
        ...style,
        animationDuration: '5s',
      }}
    >
      {shouldRender && children}
    </Tag>
  );
};
