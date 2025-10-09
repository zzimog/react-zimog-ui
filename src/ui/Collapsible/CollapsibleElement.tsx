import {
  type HTMLAttributes,
  type RefAttributes,
  type ElementType,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './collapsibleClasses';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

export type CollapsibleElementProps = {
  as?: ElementType;
  open?: boolean;
  dir?: 'vertical' | 'horizontal';
  present: boolean;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const CollapsibleElement = (inProps: CollapsibleElementProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    present,
    open = false,
    dir = 'vertical',
    className,
    style,
    children,
    ...props
  } = inProps;

  const [isPresent, setIsPresent] = useState(present);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const widthRef = useRef<number>(0);
  const width = widthRef.current;
  const heightRef = useRef<number>(0);
  const height = heightRef.current;

  const isOpen = open || isPresent;

  const preventRef = useRef(isOpen);
  const prevStyleRef = useRef<Record<string, string>>(undefined);

  useEffect(() => {
    const raf = requestAnimationFrame(() => (preventRef.current = false));
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;

    if (node) {
      prevStyleRef.current = prevStyleRef.current || {
        animationName: node.style.animationName,
      };

      node.style.animationName = 'none';

      const { width, height } = node.getBoundingClientRect();
      widthRef.current = width;
      heightRef.current = height;

      if (!preventRef.current) {
        node.style.animationName = prevStyleRef.current.animationName;
      }

      setIsPresent(present);
    }
  }, [open, present]);

  return (
    <Tag
      ref={mergedRefs}
      data-state={open ? 'open' : 'closed'}
      hidden={!isOpen}
      className={cn(className, classes({ dir }))}
      style={{
        ['--width']: width ? `${width}px` : undefined,
        ['--height']: height ? `${height}px` : undefined,
        ...style,
      }}
      {...props}
    >
      {isOpen && children}
    </Tag>
  );
};
