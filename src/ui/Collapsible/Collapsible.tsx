import {
  type ElementType,
  type HTMLAttributes,
  type Ref,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { cn } from '../utils';

export type CollapsibleProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  open?: boolean;
  animate?: boolean;
  onChange?: (open: boolean) => void;
} & HTMLAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    open = false,
    animate = true,
    onChange,
    className,
    children,
    ...props
  } = inProps;

  const [visible, setVisible] = useState(open);

  const ref = useRef<HTMLDivElement>(null);
  const mergedRefs = mergeRefs([ref, refProp]);

  const preventAnimation = useRef(open);

  const shouldRender = open || visible;

  function handleAnimationEnd() {
    const node = ref.current;
    if (!node) return;

    node!.style.removeProperty('--height');

    if (!open) {
      setVisible(false);
      onChange?.(false);
    }
  }

  useEffect(() => {
    const raf = requestAnimationFrame(() => (preventAnimation.current = false));
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!animate) {
      setVisible(open);
      onChange?.(open);
      return;
    }

    node.style.animationName = 'none';

    if (!preventAnimation.current) {
      const { height } = node.getBoundingClientRect();
      node.style.setProperty('--height', `${height}px`);
      node.style.removeProperty('animation-name');
    }

    if (open) {
      setVisible(true);
      onChange?.(true);
    }
  }, [open, animate, onChange]);

  const animationClass = open ? 'animate-height-grow' : 'animate-height-shrink';

  return (
    <Tag
      ref={mergedRefs}
      onAnimationEnd={handleAnimationEnd}
      hidden={!shouldRender}
      className={cn(
        'w-full',
        'overflow-hidden',
        animate && animationClass,
        className
      )}
      {...props}
    >
      {shouldRender && children}
    </Tag>
  );
};
