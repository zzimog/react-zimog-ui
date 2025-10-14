/**
 * Based on Radix UI collapsible component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { usePresence, useMergedRefs } from '../hooks';
import classes from './collapsibleClasses';

export type CollapsibleProps = {
  as?: ElementType;
  open?: boolean;
  dir?: 'vertical' | 'horizontal';
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> &
  RefAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    open = false,
    dir = 'vertical',
    children,
  } = inProps;

  const { ref: presenceRef, present } = usePresence(open);
  const [visible, setVisible] = useState(open);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, presenceRef, ref);

  const preventAnimationRef = useRef(present);

  const widthRef = useRef(0);
  const width = widthRef.current;
  const heightRef = useRef(0);
  const height = heightRef.current;

  const shouldRender = open || visible;

  useEffect(() => {
    const raf = requestAnimationFrame(
      () => (preventAnimationRef.current = false)
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node && !preventAnimationRef.current) {
      const previousStyles = {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };

      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      const { width, height } = node.getBoundingClientRect();
      widthRef.current = width;
      heightRef.current = height;

      node.style.transitionDuration = previousStyles.transitionDuration;
      node.style.animationName = previousStyles.animationName;

      setVisible(present);
    }
  }, [open, present]);

  return (
    <Tag
      ref={mergedRefs}
      data-state={open ? 'open' : 'closed'}
      className={classes({ dir })}
      style={{
        ['--width']: width ? `${width}px` : undefined,
        ['--height']: height ? `${height}px` : undefined,
        ...(preventAnimationRef.current && {
          transitionDuration: '0s',
          animationName: 'none',
        }),
      }}
      hidden={!shouldRender}
    >
      {shouldRender && children}
    </Tag>
  );
};
