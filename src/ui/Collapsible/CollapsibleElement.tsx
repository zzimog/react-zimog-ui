import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useMergedRefs } from '../hooks';

export type CollapsibleElementProps = {
  as?: ElementType;
  present: boolean;
  open?: boolean;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const CollapsibleElement = (inProps: CollapsibleElementProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    present,
    open = false,
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
  });

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
      hidden={!present}
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
