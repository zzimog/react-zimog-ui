import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useLayoutEffect,
  useRef,
} from 'react';
import { usePresence, useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './highlightClasses';

export type HighlightProps = {
  as?: ElementType;
  visible?: boolean;
  rect?: DOMRect;
  persistent?: boolean;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Highlight = (inProps: HighlightProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    visible = true,
    rect,
    className,
    style,
    persistent = false,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);

  const { ref: refPresence, present } = usePresence(persistent || visible);
  const mergedRefs = useMergedRefs(refProp, ref, refPresence);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node && !persistent) {
      const raf = requestAnimationFrame(() => {
        node.style.transitionDuration = visible
          ? style?.transitionDuration || ''
          : '0s';
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [visible]);

  return (
    <Tag
      ref={mergedRefs}
      data-state={visible ? 'visible' : 'hidden'}
      className={cn(classes({ persistent }), className)}
      hidden={!present}
      style={{
        width: rect ? `${rect.width}px` : undefined,
        height: rect ? `${rect.height}px` : undefined,
        transform: rect ? `translate(${rect.x}px, ${rect.y}px)` : undefined,
        ...style,
      }}
      {...props}
    />
  );
};
