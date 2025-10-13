import { type Ref, useCallback, useLayoutEffect, useRef } from 'react';
import { usePresence, useMergedRefs } from '../hooks';
import { cn } from '../utils';
import classes from './highlightClasses';

export type HighlightProps = {
  ref?: Ref<HTMLElement>;
  visible?: boolean;
  rect?: DOMRect;
  className?: string;
  persistent?: boolean;
};

export const Highlight = (inProps: HighlightProps) => {
  const {
    ref: refProp,
    visible = true,
    rect,
    className,
    persistent = false,
  } = inProps;

  const { ref: refPresence, isPresent } = usePresence(visible);

  const preventTransitionRef = useRef(visible);

  const ref = useCallback((node: HTMLElement) => {
    const { animationName = 'none' } = getComputedStyle(node);
    if (animationName !== 'none') {
      node.style.setProperty('transition-duration', '0s');
    }

    function handleAnimationStart() {
      const preventTransition = preventTransitionRef.current;
      if (preventTransition) {
        node.style.setProperty('transition-duration', '0s');
      } else {
        node.style.removeProperty('transition-duration');
      }
    }

    node.addEventListener('animationstart', handleAnimationStart);
    return () => {
      node.removeEventListener('animationstart', handleAnimationStart);
    };
  }, []);

  const mergedRefs = useMergedRefs(refProp, refPresence, ref);

  useLayoutEffect(() => {
    preventTransitionRef.current = !visible;
  }, [visible]);

  return (
    <div
      ref={mergedRefs}
      data-visible={visible}
      className={cn(classes({ persistent }), className)}
      style={{
        width: rect ? `${rect.width}px` : undefined,
        height: rect ? `${rect.height}px` : undefined,
        transform: rect ? `translate(${rect.x}px, ${rect.y}px)` : undefined,
      }}
      hidden={!isPresent}
    />
  );
};
