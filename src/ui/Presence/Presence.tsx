import {
  type ElementType,
  type HTMLAttributes,
  type Ref,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { cn } from '../utils';

export type PresenceProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  open?: boolean;
  forceMount?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, 'style'>;

export const Presence = (inProps: PresenceProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    open = false,
    forceMount,
    className,
    children,
    ...props
  } = inProps;

  const [visible, setVisible] = useState(open);

  const ref = useRef<HTMLDivElement>(null);
  const mergedRefs = mergeRefs([ref, refProp]);

  const preventAnimation = useRef(open);

  const shouldRender = forceMount || open || visible;

  const handleAnimationEnd = useCallback(() => {
    const node = ref.current;
    if (!node) return;

    node.removeAttribute('style');

    if (!open) {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => (preventAnimation.current = false));
    return () => cancelAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.animationName = 'none';

    if (!preventAnimation.current) {
      const { width, height } = node.getBoundingClientRect();

      node.style.setProperty('--width', `${width}px`);
      node.style.setProperty('--height', `${height}px`);
      node.style.removeProperty('animation-name');
    }

    const animationName = getComputedStyle(node).animationName;
    const hasAnimation = animationName !== 'none';

    if (!hasAnimation && !open) {
      handleAnimationEnd();
    }

    if (open) {
      setVisible(true);
    }
  }, [open, handleAnimationEnd]);

  return (
    <Tag
      {...props}
      ref={mergedRefs}
      data-state={open ? 'open' : 'closed'}
      className={cn(className, 'overflow-hidden')}
      hidden={!shouldRender}
      onAnimationEnd={handleAnimationEnd}
    >
      {shouldRender && children}
    </Tag>
  );
};
