// Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
import {
  type ElementType,
  type HTMLAttributes,
  type Ref,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { cn } from '../utils';
import { mergeRefs } from 'react-merge-refs';

export type CollapsibleProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  open?: boolean;
  animate?: boolean;
} & HTMLAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    ref: refProp,
    as,
    open = false,
    animate = true,
    className,
    style,
    children,
    ...props
  } = inProps;

  const Tag = as || 'div';

  const [visible, setVisible] = useState(open);

  const ref = useRef<HTMLDivElement>(null);
  const mergedRefs = mergeRefs([ref, refProp]);

  const widthRef = useRef(0);
  const width = widthRef.current;
  const heightRef = useRef(0);
  const height = heightRef.current;

  const preventAnimationRef = useRef(open);

  const present = open || visible;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      preventAnimationRef.current = false;
    });

    return () => cancelAnimationFrame(raf);
  });

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    node.style.transitionDuration = '0s';
    node.style.animationName = 'none';

    const { width, height } = node.getBoundingClientRect();
    widthRef.current = width;
    heightRef.current = height;

    if (!preventAnimationRef.current) {
      node.style.removeProperty('transition-duration');
      node.style.removeProperty('animation-name');
    }

    setVisible(open);
  }, [open, present]);

  return (
    <Tag
      ref={mergedRefs}
      className={cn(
        present ? 'animate-height-grow' : 'animate-height-shrink',
        animate && 'transition-[height]',
        'overflow-hidden',
        className
      )}
      style={{
        ['--width']: width ? `${width}px` : undefined,
        ['--height']: height ? `${height}px` : undefined,
        ...style,
      }}
      {...props}
    >
      {present && children}
    </Tag>
  );
};
